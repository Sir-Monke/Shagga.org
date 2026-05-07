'use client';
import React, { useState, useMemo } from 'react';
import { REVIEWS, CATEGORY_META, ratingTier, priceLabel, type Review, type Category } from '../../reviewsData';

type SortKey = 'recent' | 'highest' | 'lowest' | 'priceLow' | 'priceHigh';

export const AppReviews: React.FC = () => {
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
    if (filter !== 'all') list = list.filter((r) => r.category === filter);
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
    <div className="ios-reviews">
      <div className="ios-reviews-search">
        <input
          type="search"
          placeholder="Search venues, areas, tags…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search reviews"
        />
      </div>

      <div className="ios-reviews-pills">
        <button
          className={`ios-reviews-pill ${filter === 'all' ? 'ios-reviews-pill-active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({REVIEWS.length})
        </button>
        {activeCats.map((c) => (
          <button
            key={c}
            className={`ios-reviews-pill ${filter === c ? 'ios-reviews-pill-active' : ''}`}
            onClick={() => setFilter(c)}
          >
            {CATEGORY_META[c].emoji} {CATEGORY_META[c].label}
          </button>
        ))}
      </div>

      <div className="ios-reviews-sort-row">
        <select
          className="ios-reviews-sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          aria-label="Sort reviews"
        >
          <option value="recent">Recent</option>
          <option value="highest">Highest rated</option>
          <option value="lowest">Lowest rated</option>
          <option value="priceLow">Price ↑</option>
          <option value="priceHigh">Price ↓</option>
        </select>
        <span className="ios-reviews-count">{visible.length} {visible.length === 1 ? 'review' : 'reviews'}</span>
      </div>

      <div className="ios-reviews-list">
        {visible.length === 0 && (
          <div className="ios-reviews-empty">
            <p>Nothing matches that.</p>
            <button onClick={() => { setSearch(''); setFilter('all'); }}>Clear</button>
          </div>
        )}
        {visible.map((r) => (
          <ReviewCard
            key={r.id}
            review={r}
            open={openId === r.id}
            onToggle={() => setOpenId((c) => (c === r.id ? null : r.id))}
          />
        ))}
        <div className="ios-reviews-foot">
          <p>got a place worth reviewing? send tips to</p>
          <a href="mailto:hello@shagga.org">hello@shagga.org</a>
        </div>
      </div>
    </div>
  );
};

const ReviewCard: React.FC<{ review: Review; open: boolean; onToggle: () => void }> = ({ review, open, onToggle }) => {
  const tier = ratingTier(review.rating);
  const meta = CATEGORY_META[review.category];

  return (
    <article className="ios-rcard">
      <button className="ios-rcard-head" onClick={onToggle} aria-expanded={open}>
        <div className="ios-rcard-head-left">
          <div className="ios-rcard-cat">
            {meta.emoji} {meta.label}
            {review.priceLevel && <> · <span className="ios-rcard-price">{priceLabel(review.priceLevel)}</span></>}
          </div>
          <h2 className="ios-rcard-venue">{review.venue}</h2>
          <p className="ios-rcard-loc">{review.location}</p>
        </div>
        <div className="ios-rcard-rating" style={{ background: tier.color }}>
          {review.rating.toFixed(1)}
        </div>
      </button>
      <div className="ios-rcard-tier" style={{ color: tier.color }}>
        {tier.label.toUpperCase()}
        {review.badge && <span className="ios-rcard-badge">{review.badge}</span>}
      </div>
      <p className="ios-rcard-title">{review.title}</p>

      {((review.pros && review.pros.length > 0) || (review.cons && review.cons.length > 0)) && (
        <div className="ios-rcard-preview">
          {review.pros && review.pros.length > 0 && (
            <div className="ios-rcard-preview-good">✅ {review.pros[0]}{review.pros.length > 1 ? ` +${review.pros.length - 1}` : ''}</div>
          )}
          {review.cons && review.cons.length > 0 && (
            <div className="ios-rcard-preview-bad">❌ {review.cons[0]}{review.cons.length > 1 ? ` +${review.cons.length - 1}` : ''}</div>
          )}
        </div>
      )}

      {open && (
        <div className="ios-rcard-body">
          <p className="ios-rcard-text">{review.body}</p>
          {review.theMove && (
            <div className="ios-rcard-move">
              <span className="ios-rcard-move-label">The move</span>
              <p>{review.theMove}</p>
            </div>
          )}
          {review.pros && review.pros.length > 0 && (
            <div className="ios-rcard-listblock">
              <h3 className="ios-rcard-h">Pros</h3>
              <div className="ios-rcard-list">
                {review.pros.map((p, i) => (
                  <div key={i} className="ios-rcard-list-item ios-rcard-list-good">
                    <span className="ios-rcard-list-mark">✓</span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {review.cons && review.cons.length > 0 && (
            <div className="ios-rcard-listblock">
              <h3 className="ios-rcard-h ios-rcard-h-bad">Cons</h3>
              <div className="ios-rcard-list">
                {review.cons.map((c, i) => (
                  <div key={i} className="ios-rcard-list-item ios-rcard-list-bad">
                    <span className="ios-rcard-list-mark">✗</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {review.tags && review.tags.length > 0 && (
            <div className="ios-rcard-tags">
              {review.tags.map((t) => <span key={t}>#{t}</span>)}
            </div>
          )}
          <div className="ios-rcard-meta">
            <span>Visited {review.visited}</span>
            {review.wouldReturn !== undefined && (<><span>·</span><span>{review.wouldReturn ? '✅ Would return' : '❌ Would not return'}</span></>)}
          </div>
          <div className="ios-rcard-actions">
            {review.mapUrl && <a href={review.mapUrl} target="_blank" rel="noopener noreferrer">🗺️ Map</a>}
            {review.website && <a href={review.website} target="_blank" rel="noopener noreferrer">🔗 Website</a>}
          </div>
        </div>
      )}

      <button className="ios-rcard-toggle" onClick={onToggle} aria-hidden>
        {open ? 'Show less ↑' : 'Read more ↓'}
      </button>
    </article>
  );
};
