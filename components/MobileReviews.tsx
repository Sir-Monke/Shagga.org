'use client';
import React, { useState, useMemo } from 'react';
import { REVIEWS, CATEGORY_META, ratingTier, priceLabel, type Review, type Category } from './reviewsData';

/* ============================================================
   MOBILE REVIEWS — used by /reviews route on phones.
   Windows XP themed, full-screen window, internal body scroll.
   Single scroll container = the .mr-body element.
   ============================================================ */

type SortKey = 'recent' | 'highest' | 'lowest' | 'priceLow' | 'priceHigh';

export default function MobileReviews() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('recent');
  const [filter, setFilter] = useState<'all' | Category>('all');
  const [openId, setOpenId] = useState<number | null>(null);

  const activeCats = useMemo(() => {
    const set = new Set<Category>();
    REVIEWS.forEach((r) => set.add(r.category));
    return Array.from(set);
  }, []);

  const visible = useMemo(() => {
    let list = [...REVIEWS];

    if (filter !== 'all') {
      list = list.filter((r) => r.category === filter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((r) =>
        r.venue.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.body.toLowerCase().includes(q) ||
        (r.tags ?? []).some((t) => t.toLowerCase().includes(q)),
      );
    }

    switch (sort) {
      case 'highest':   list.sort((a, b) => b.rating - a.rating); break;
      case 'lowest':    list.sort((a, b) => a.rating - b.rating); break;
      case 'priceLow':  list.sort((a, b) => (a.priceLevel ?? 0) - (b.priceLevel ?? 0)); break;
      case 'priceHigh': list.sort((a, b) => (b.priceLevel ?? 0) - (a.priceLevel ?? 0)); break;
      default:          list.sort((a, b) => b.id - a.id); break;
    }

    return list;
  }, [search, sort, filter]);

  return (
    <div className="mr-page">
      <div className="mr-window">
        {/* Sticky chrome top — titlebar + menubar + toolbar */}
        <div className="mr-chrome-top">
          {/* Title bar */}
          <div className="mr-titlebar">
            <div className="mr-titlebar-left">
              <span className="mr-favicon" aria-hidden>★</span>
              <span className="mr-title-text">Shagga Reviews — Liverpool.exe</span>
            </div>
            <div className="mr-titlebar-buttons" aria-hidden>
              <button className="mr-tb-btn" tabIndex={-1}>_</button>
              <button className="mr-tb-btn" tabIndex={-1}>▢</button>
              <button className="mr-tb-btn mr-tb-close" tabIndex={-1}>×</button>
            </div>
          </div>

          {/* Menu bar */}
          <div className="mr-menubar">
            <span className="mr-menu-item"><u>F</u>ile</span>
            <span className="mr-menu-item"><u>E</u>dit</span>
            <span className="mr-menu-item"><u>V</u>iew</span>
            <span className="mr-menu-item"><u>H</u>elp</span>
          </div>

          {/* Toolbar — search, sort, pills */}
          <div className="mr-toolbar">
            <div className="mr-search-wrap">
              <span className="mr-search-icon" aria-hidden>🔍</span>
              <input
                type="search"
                placeholder="Search venues, areas, tags…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mr-search"
                aria-label="Search reviews"
              />
            </div>

            <select
              className="mr-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort reviews"
            >
              <option value="recent">Sort: Recent</option>
              <option value="highest">Sort: Highest rated</option>
              <option value="lowest">Sort: Lowest rated</option>
              <option value="priceLow">Sort: Price ↑</option>
              <option value="priceHigh">Sort: Price ↓</option>
            </select>

            <div className="mr-pills">
              <button
                className={`mr-pill ${filter === 'all' ? 'mr-pill-active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({REVIEWS.length})
              </button>
              {activeCats.map((c) => (
                <button
                  key={c}
                  className={`mr-pill ${filter === c ? 'mr-pill-active' : ''}`}
                  onClick={() => setFilter(c)}
                >
                  <span className="mr-pill-emoji" aria-hidden>{CATEGORY_META[c].emoji}</span>
                  {CATEGORY_META[c].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Body — flows naturally, no internal scroll */}
        <div className="mr-body" role="list">
          {visible.length === 0 && (
            <div className="mr-empty">
              <div className="mr-empty-emoji">🤷</div>
              <p>Nothing matches that.</p>
              <button className="mr-empty-btn" onClick={() => { setSearch(''); setFilter('all'); }}>
                Clear filters
              </button>
            </div>
          )}

          {visible.map((r) => (
            <ReviewCard
              key={r.id}
              review={r}
              open={openId === r.id}
              onToggle={() => setOpenId((curr) => (curr === r.id ? null : r.id))}
            />
          ))}

          {visible.length > 0 && (
            <p className="mr-foot-note">shagga.org/reviews · scanned a sticker? legend.</p>
          )}
        </div>

        {/* Status bar — at end of content, not sticky */}
        <div className="mr-statusbar">
          <span className="mr-status-cell">{visible.length} review{visible.length === 1 ? '' : 's'}</span>
          <span className="mr-status-cell mr-status-grow">{filter === 'all' ? 'All categories' : CATEGORY_META[filter].label}</span>
          <span className="mr-status-cell">shagga.org</span>
        </div>
      </div>
    </div>
  );
}

// ---------- Card ----------

function ReviewCard({ review, open, onToggle }: { review: Review; open: boolean; onToggle: () => void }) {
  const tier = ratingTier(review.rating);
  const meta = CATEGORY_META[review.category];

  return (
    <article className="mr-card" role="listitem">
      <button
        className="mr-card-head"
        onClick={onToggle}
        aria-expanded={open}
      >
        <div className="mr-card-head-left">
          <div className="mr-card-cat-row">
            <span className="mr-card-cat" aria-hidden>{meta.emoji}</span>
            <span className="mr-card-cat-label">{meta.label}</span>
            {review.priceLevel && (
              <>
                <span className="mr-dot">·</span>
                <span className="mr-price">{priceLabel(review.priceLevel)}</span>
              </>
            )}
          </div>
          <h2 className="mr-card-venue">{review.venue}</h2>
          <p className="mr-card-loc">{review.location}</p>
        </div>
        <div
          className="mr-rating"
          style={{ background: tier.color }}
          aria-label={`Rated ${review.rating} out of 10, ${tier.label}`}
        >
          <span className="mr-rating-num">{review.rating.toFixed(1)}</span>
        </div>
      </button>

      <div className="mr-card-tier" style={{ color: tier.color }}>
        {tier.label.toUpperCase()}
        {review.badge && <span className="mr-badge">{review.badge}</span>}
      </div>

      <p className="mr-card-title">{review.title}</p>

      {/* Mini pros/cons preview — shown on collapsed card for quick scan */}
      {((review.pros && review.pros.length > 0) || (review.cons && review.cons.length > 0)) && (
        <div className="mr-pc-preview">
          {review.pros && review.pros.length > 0 && (
            <span className="mr-pc-preview-good">
              <span aria-hidden>✅</span> {review.pros[0]}
              {review.pros.length > 1 && <span className="mr-pc-preview-more"> +{review.pros.length - 1}</span>}
            </span>
          )}
          {review.cons && review.cons.length > 0 && (
            <span className="mr-pc-preview-bad">
              <span aria-hidden>❌</span> {review.cons[0]}
              {review.cons.length > 1 && <span className="mr-pc-preview-more"> +{review.cons.length - 1}</span>}
            </span>
          )}
        </div>
      )}

      {open && (
        <div className="mr-card-body">
          <p className="mr-card-body-text">{review.body}</p>

          {review.theMove && (
            <div className="mr-move">
              <span className="mr-move-label">The move</span>
              <p className="mr-move-text">{review.theMove}</p>
            </div>
          )}

          {(review.pros && review.pros.length > 0) && (
            <div className="mr-pros-cons">
              <h3 className="mr-pc-title">Pros</h3>
              <ul className="mr-pc-list">
                {review.pros.map((p, i) => (<li key={i}>{p}</li>))}
              </ul>
            </div>
          )}

          {(review.cons && review.cons.length > 0) && (
            <div className="mr-pros-cons">
              <h3 className="mr-pc-title mr-pc-cons">Cons</h3>
              <ul className="mr-pc-list mr-pc-cons-list">
                {review.cons.map((c, i) => (<li key={i}>{c}</li>))}
              </ul>
            </div>
          )}

          {(review.tags && review.tags.length > 0) && (
            <div className="mr-tags">
              {review.tags.map((t) => (
                <span key={t} className="mr-tag">#{t}</span>
              ))}
            </div>
          )}

          <div className="mr-meta">
            <span>Visited {review.visited}</span>
            {review.wouldReturn !== undefined && (
              <>
                <span className="mr-dot">·</span>
                <span>{review.wouldReturn ? '✅ Would return' : '❌ Would not return'}</span>
              </>
            )}
          </div>

          <div className="mr-actions">
            {review.mapUrl && (
              <a className="mr-btn" href={review.mapUrl} target="_blank" rel="noopener noreferrer">
                <span aria-hidden>🗺️</span> Map
              </a>
            )}
            {review.website && (
              <a className="mr-btn" href={review.website} target="_blank" rel="noopener noreferrer">
                <span aria-hidden>🔗</span> Website
              </a>
            )}
          </div>
        </div>
      )}

      <button className="mr-card-toggle" onClick={onToggle} aria-hidden>
        {open ? 'Show less ↑' : 'Read more ↓'}
      </button>
    </article>
  );
}
