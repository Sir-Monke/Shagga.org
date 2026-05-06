'use client';
import React, { useState, useMemo } from 'react';
import { REVIEWS, CATEGORY_META, ratingTier, priceLabel, type Review, type Category } from './reviewsData';

/* ============================================================
   MOBILE REVIEWS — used by /reviews route on phones.
   Clean native-feeling UI. No XP chrome, no popups.
   ============================================================ */

type SortKey = 'recent' | 'highest' | 'lowest' | 'priceLow' | 'priceHigh';

export default function MobileReviews() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('recent');
  const [filter, setFilter] = useState<'all' | Category>('all');
  const [openId, setOpenId] = useState<number | null>(null);

  // Active categories — only show filter pills for categories that have reviews
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
      {/* Header */}
      <header className="mr-header">
        <div className="mr-header-inner">
          <div className="mr-brand">
            <span className="mr-brand-mark">★</span>
            <div className="mr-brand-text">
              <span className="mr-brand-title">Shagga Reviews</span>
              <span className="mr-brand-sub">Liverpool · unsolicited opinions</span>
            </div>
          </div>
        </div>

        {/* Search */}
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

        {/* Sort */}
        <div className="mr-sort-wrap">
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
        </div>

        {/* Category pills */}
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
      </header>

      {/* List */}
      <main className="mr-list" role="list">
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

        <footer className="mr-footer">
          <p>shagga.org/reviews · scanned a sticker? legend.</p>
        </footer>
      </main>
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

