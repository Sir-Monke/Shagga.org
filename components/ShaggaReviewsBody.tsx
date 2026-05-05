'use client';

import React, { useMemo, useState } from 'react';
import {
  REVIEWS,
  CATEGORY_META,
  ratingTier,
  priceLabel,
  type Review,
  type Category,
} from './reviewsData';

type Sort = 'recent' | 'highest' | 'lowest' | 'priceLow' | 'priceHigh';
type CategoryFilter = 'all' | Category;

export default function ShaggaReviewsBody() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [sort, setSort] = useState<Sort>('recent');
  const [search, setSearch] = useState('');
  const [groupOpen, setGroupOpen] = useState<string | null>(null);

  const visibleReviews = useMemo(() => {
    let list = [...REVIEWS];
    if (filter !== 'all') list = list.filter((r) => r.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter((r) =>
        r.venue.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.body.toLowerCase().includes(q) ||
        (r.tags?.some((t) => t.toLowerCase().includes(q)) ?? false)
      );
    }
    if (sort === 'highest')   list.sort((a, b) => b.rating - a.rating);
    if (sort === 'lowest')    list.sort((a, b) => a.rating - b.rating);
    if (sort === 'recent')    list.sort((a, b) => b.id - a.id);
    if (sort === 'priceLow')  list.sort((a, b) => (a.priceLevel ?? 99) - (b.priceLevel ?? 99));
    if (sort === 'priceHigh') list.sort((a, b) => (b.priceLevel ?? 0) - (a.priceLevel ?? 0));
    return list;
  }, [filter, sort, search]);

  const stats = useMemo(() => {
    if (REVIEWS.length === 0) return { count: 0, avg: 0, best: null as Review | null, worst: null as Review | null };
    const total = REVIEWS.reduce((sum, r) => sum + r.rating, 0);
    const sorted = [...REVIEWS].sort((a, b) => b.rating - a.rating);
    return {
      count: REVIEWS.length,
      avg: total / REVIEWS.length,
      best: sorted[0],
      worst: sorted[sorted.length - 1],
    };
  }, []);

  // Build category groups for the filter sidebar — only show groups that have reviews
  const categoryGroups = useMemo(() => {
    const groups = new Map<string, { cat: Category; count: number }[]>();
    (Object.keys(CATEGORY_META) as Category[]).forEach((cat) => {
      const meta = CATEGORY_META[cat];
      const count = REVIEWS.filter((r) => r.category === cat).length;
      if (count === 0) return;
      const arr = groups.get(meta.group) ?? [];
      arr.push({ cat, count });
      groups.set(meta.group, arr);
    });
    return Array.from(groups.entries());
  }, []);

  const activeReview = activeId != null ? REVIEWS.find((r) => r.id === activeId) ?? null : null;

  if (activeReview) {
    return <ReviewDetail review={activeReview} onBack={() => setActiveId(null)} />;
  }

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="rev-block">
        {/* Header */}
        <div className="rev-header">
          <div className="rev-header-row">
            <div className="rev-logo">
              <span className="rev-logo-icon">⭐</span>
              <span>Shagga Reviews</span>
            </div>
            <div className="rev-header-by">by <strong>shagga</strong> · Liverpool</div>
          </div>
          <div className="rev-tagline">unsolicited opinions on places that exist</div>
        </div>

        {/* Stats bar */}
        {stats.count > 0 && (
          <div className="rev-stats">
            <div className="rev-stat">
              <div className="rev-stat-num">{stats.count}</div>
              <div className="rev-stat-label">reviews</div>
            </div>
            <div className="rev-stat">
              <div className="rev-stat-num" style={{ color: ratingTier(stats.avg).color }}>{stats.avg.toFixed(1)}</div>
              <div className="rev-stat-label">avg rating</div>
            </div>
            {stats.best && (
              <button className="rev-stat rev-stat-link" onClick={() => setActiveId(stats.best!.id)} onMouseDown={(e) => e.stopPropagation()}>
                <div className="rev-stat-num">🏆</div>
                <div className="rev-stat-label">{stats.best.venue}</div>
              </button>
            )}
            {stats.worst && (
              <button className="rev-stat rev-stat-link" onClick={() => setActiveId(stats.worst!.id)} onMouseDown={(e) => e.stopPropagation()}>
                <div className="rev-stat-num">💀</div>
                <div className="rev-stat-label">{stats.worst.venue}</div>
              </button>
            )}
          </div>
        )}

        {/* Filters */}
        <div className="rev-filters">
          <div className="rev-search-wrap">
            <span className="rev-search-icon">⌕</span>
            <input
              type="text"
              placeholder="Search venues, locations, tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className="rev-search"
            />
            {search && (
              <button
                className="rev-search-clear"
                onClick={() => setSearch('')}
                onMouseDown={(e) => e.stopPropagation()}
                aria-label="Clear"
              >✕</button>
            )}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            onMouseDown={(e) => e.stopPropagation()}
            className="rev-select"
          >
            <option value="recent">Newest first</option>
            <option value="highest">Highest rated</option>
            <option value="lowest">Lowest rated</option>
            <option value="priceLow">Price: low → high</option>
            <option value="priceHigh">Price: high → low</option>
          </select>
        </div>

        {/* Category filter — grouped */}
        <div className="rev-cats">
          <button
            className={`rev-cat${filter === 'all' ? ' active' : ''}`}
            onClick={() => setFilter('all')}
            onMouseDown={(e) => e.stopPropagation()}
          >All ({REVIEWS.length})</button>
          {categoryGroups.map(([groupName, cats]) => (
            <div key={groupName} className="rev-cat-group">
              <button
                className="rev-cat rev-cat-group-btn"
                onClick={() => setGroupOpen((g) => g === groupName ? null : groupName)}
                onMouseDown={(e) => e.stopPropagation()}
              >
                {groupName} ({cats.reduce((s, c) => s + c.count, 0)})
                <span className="rev-cat-arrow">{groupOpen === groupName ? '▲' : '▼'}</span>
              </button>
              {groupOpen === groupName && (
                <div className="rev-cat-submenu" onMouseDown={(e) => e.stopPropagation()}>
                  {cats.map(({ cat, count }) => {
                    const meta = CATEGORY_META[cat];
                    return (
                      <button
                        key={cat}
                        className={`rev-cat rev-cat-sub${filter === cat ? ' active' : ''}`}
                        onClick={() => { setFilter(cat); setGroupOpen(null); }}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        <span>{meta.emoji}</span> {meta.label} ({count})
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          {filter !== 'all' && (
            <button
              className="rev-cat-clear"
              onClick={() => setFilter('all')}
              onMouseDown={(e) => e.stopPropagation()}
              title="Clear category filter"
            >Filtering: {CATEGORY_META[filter].emoji} {CATEGORY_META[filter].label} ✕</button>
          )}
        </div>

        {/* Feed */}
        <div className="rev-feed">
          {visibleReviews.length === 0 ? (
            <div className="rev-empty">
              {REVIEWS.length === 0
                ? "No reviews yet. Add some in components/reviewsData.ts."
                : `No reviews match. Try clearing filters.`}
            </div>
          ) : (
            visibleReviews.map((r) => (
              <ReviewCard key={r.id} review={r} onClick={() => setActiveId(r.id)} />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="rev-footer">
          <span>found this via QR code? <a href="/" className="rev-footer-link">explore the rest of shagga.org →</a></span>
        </div>
      </div>
    </div>
  );
}

// ---------- Review Card ----------
function ReviewCard({ review, onClick }: { review: Review; onClick: () => void }) {
  const tier = ratingTier(review.rating);
  const cat = CATEGORY_META[review.category];
  const hasImage = review.images && review.images.length > 0;

  return (
    <button
      className={`rev-card${hasImage ? ' has-image' : ''}`}
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <div className="rev-card-rating" style={{ background: tier.color }}>
        <div className="rev-card-rating-num">{review.rating}</div>
        <div className="rev-card-rating-max">/10</div>
      </div>
      {hasImage && (
        <div className="rev-card-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={review.images![0]} alt={review.venue} loading="lazy" />
        </div>
      )}
      <div className="rev-card-body">
        <div className="rev-card-top">
          <div className="rev-card-venue">
            <span className="rev-card-cat" title={cat.label}>{cat.emoji}</span>
            <span className="rev-card-name">{review.venue}</span>
            {review.priceLevel && (
              <span className="rev-card-price" title={`Price level ${review.priceLevel}/4`}>{priceLabel(review.priceLevel)}</span>
            )}
            {review.badge && <span className="rev-card-badge">{review.badge}</span>}
            {review.wouldReturn === true && <span className="rev-card-return-yes" title="Would return">↻</span>}
            {review.wouldReturn === false && <span className="rev-card-return-no" title="Would not return">⊘</span>}
          </div>
          <div className="rev-card-tier" style={{ color: tier.color }}>{tier.label}</div>
        </div>
        <div className="rev-card-title">{review.title}</div>
        <div className="rev-card-meta">
          <span>📍 {review.location}</span>
          <span>·</span>
          <span>visited {review.visited}</span>
        </div>
        {review.tags && review.tags.length > 0 && (
          <div className="rev-card-tags">
            {review.tags.slice(0, 4).map((t) => (
              <span key={t} className="rev-card-tag">{t}</span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}

// ---------- Review Detail ----------
function ReviewDetail({ review, onBack }: { review: Review; onBack: () => void }) {
  const tier = ratingTier(review.rating);
  const cat = CATEGORY_META[review.category];
  const [imgIdx, setImgIdx] = useState(0);
  const images = review.images ?? [];

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="rev-block">
        <div className="rev-detail-header" style={{ background: tier.color }}>
          <button
            className="rev-back"
            onClick={onBack}
            onMouseDown={(e) => e.stopPropagation()}
          >← All reviews</button>
          <div className="rev-detail-rating">
            <div className="rev-detail-rating-num">{review.rating}</div>
            <div className="rev-detail-rating-max">/10 · {tier.label}</div>
          </div>
        </div>

        {/* Photo carousel */}
        {images.length > 0 && (
          <div className="rev-detail-photos">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[imgIdx]} alt={`${review.venue} ${imgIdx + 1}`} />
            {images.length > 1 && (
              <>
                <button
                  className="rev-photo-nav rev-photo-prev"
                  onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
                  onMouseDown={(e) => e.stopPropagation()}
                >‹</button>
                <button
                  className="rev-photo-nav rev-photo-next"
                  onClick={() => setImgIdx((i) => (i + 1) % images.length)}
                  onMouseDown={(e) => e.stopPropagation()}
                >›</button>
                <div className="rev-photo-counter">{imgIdx + 1} / {images.length}</div>
              </>
            )}
          </div>
        )}

        <div className="rev-detail-body">
          <div className="rev-detail-toprow">
            <div className="rev-detail-tags-row">
              <span className="rev-detail-cat">{cat.emoji} {cat.label.replace(/s$/, '')}</span>
              {review.priceLevel && (
                <span className="rev-detail-price">{priceLabel(review.priceLevel)}</span>
              )}
              {review.badge && <span className="rev-detail-badge">{review.badge}</span>}
              {review.wouldReturn === true && <span className="rev-detail-return yes">↻ Would return</span>}
              {review.wouldReturn === false && <span className="rev-detail-return no">⊘ Wouldn&apos;t return</span>}
            </div>
          </div>

          <h1 className="rev-detail-venue">{review.venue}</h1>

          <div className="rev-detail-meta">
            <div className="rev-detail-location">📍 {review.location}</div>
            <div className="rev-detail-visited">visited {review.visited}</div>
            {(review.mapUrl || review.website) && (
              <div className="rev-detail-links">
                {review.mapUrl && (
                  <a
                    href={review.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rev-link rev-link-map"
                    onMouseDown={(e) => e.stopPropagation()}
                  >🗺️ Open in Maps</a>
                )}
                {review.website && (
                  <a
                    href={review.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rev-link"
                    onMouseDown={(e) => e.stopPropagation()}
                  >🔗 Website</a>
                )}
              </div>
            )}
          </div>

          <h2 className="rev-detail-title">{review.title}</h2>

          <div className="rev-detail-text">
            {review.body.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {review.tags && review.tags.length > 0 && (
            <div className="rev-detail-tags">
              {review.tags.map((t) => (
                <span key={t} className="rev-detail-tag">#{t}</span>
              ))}
            </div>
          )}

          {(review.pros || review.cons) && (
            <div className="rev-detail-grid">
              {review.pros && review.pros.length > 0 && (
                <div className="rev-detail-list rev-pros">
                  <h3>👍 Pros</h3>
                  <ul>{review.pros.map((p, i) => <li key={i}>{p}</li>)}</ul>
                </div>
              )}
              {review.cons && review.cons.length > 0 && (
                <div className="rev-detail-list rev-cons">
                  <h3>👎 Cons</h3>
                  <ul>{review.cons.map((c, i) => <li key={i}>{c}</li>)}</ul>
                </div>
              )}
            </div>
          )}

          {review.theMove && (
            <div className="rev-detail-move">
              <div className="rev-detail-move-label">THE MOVE:</div>
              <div className="rev-detail-move-text">{review.theMove}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
