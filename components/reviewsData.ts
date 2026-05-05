// =====================================================
//  EDIT THIS FILE TO ADD/REMOVE REVIEWS
//  After editing, just `git push` and the site updates.
// =====================================================

export type Category =
  // Food & drink
  | 'pub' | 'bar' | 'club' | 'restaurant' | 'cafe' | 'takeaway' | 'bakery' | 'breakfast' | 'dessert'
  // Shopping
  | 'shop' | 'supermarket' | 'market' | 'bookshop' | 'charityshop'
  // Out & about
  | 'park' | 'museum' | 'cinema' | 'theatre' | 'venue' | 'gym' | 'beach' | 'walk'
  // Services
  | 'barber' | 'dentist' | 'gp' | 'mechanic' | 'tattoo' | 'laundrette'
  // Travel
  | 'hotel' | 'airbnb' | 'station' | 'airport' | 'bus'
  // Misc
  | 'toilet' | 'bench' | 'random' | 'other';

export interface Review {
  id: number;
  /** The venue name as you'd say it out loud */
  venue: string;
  /** Address or rough area */
  location: string;
  /** Category — see Category type for the full list */
  category: Category;
  /** Out of 10 — go nuts. Can be 0, can be 11, can be 4.7. */
  rating: number;
  /** Date of the visit, free text. e.g. "last tuesday", "march 2024" */
  visited: string;
  /** Headline — punchy 1-line takeaway */
  title: string;
  /** The full review. Use \n\n for paragraph breaks. */
  body: string;

  // -------- Optional fields below --------

  /** Pros */
  pros?: string[];
  /** Cons */
  cons?: string[];
  /** The recommendation / "what to do" */
  theMove?: string;
  /** Tag/badge to show on the card e.g. "DESTROYED ME", "ACTUALLY GOOD" */
  badge?: string;
  /** Price level — 1 to 4. £, ££, £££, ££££ */
  priceLevel?: 1 | 2 | 3 | 4;
  /** Google Maps URL or any "view on a map" link */
  mapUrl?: string;
  /** Venue website */
  website?: string;
  /** Image URLs (relative or absolute). Drop in /public/reviews/ as e.g. greggs-1.jpg */
  images?: string[];
  /** Free-form tags shown as little pills */
  tags?: string[];
  /** Would you go back? */
  wouldReturn?: boolean;
}

export const REVIEWS: Review[] = [
  {
    id: 1,
    venue: 'Liverpool Road Social',
    location: '113 Liverpool Rd, Crosby, Liverpool L23 5TD',
    category: 'restaurant',
    rating: 9.2,
    visited: 'May 2026',
    title: 'Top heavy scran and proper good value',
    body: "This place is a hidden gem that doesn't normally get too busy, but the food is elite level. Everything we had was absolute heavy scran.\n\nThe chicken is proper good — top tier quality. Even the protein shakes are heavy. I usually don't bother with the veggie options, but honestly, any veggie dish here is actually worth ordering alongside the meat. Don't sleep on the hummus either; it's quality.",
    pros: [
      'Proper good chicken',
      'Massive value for money',
      'Never too busy',
      'Hummus is heavy scran',
    ],
    cons: [
      'Hard to find anything wrong with it tbh',
    ],
    theMove: 'Get the chicken and a protein shake, even the hummus is a must.',
    badge: 'HEAVY SCRAN',
    priceLevel: 2,
    mapUrl: 'https://maps.app.goo.gl/qK2Z8C2Ytf6r7kii7',
    tags: ['chicken', 'good value', 'crosby', 'heavy-scran'],
    wouldReturn: true,
  },
];

/** Categories with display labels — shown in the filter pills */
export const CATEGORY_META: Record<Category, { label: string; emoji: string; group: string }> = {
  pub:         { label: 'Pubs',          emoji: '🍺', group: 'Food & drink' },
  bar:         { label: 'Bars',          emoji: '🍸', group: 'Food & drink' },
  club:        { label: 'Clubs',         emoji: '🎵', group: 'Food & drink' },
  restaurant:  { label: 'Restaurants',   emoji: '🍴', group: 'Food & drink' },
  cafe:        { label: 'Cafés',         emoji: '☕', group: 'Food & drink' },
  takeaway:    { label: 'Takeaways',     emoji: '🥡', group: 'Food & drink' },
  bakery:      { label: 'Bakeries',      emoji: '🥐', group: 'Food & drink' },
  breakfast:   { label: 'Breakfast',     emoji: '🍳', group: 'Food & drink' },
  dessert:     { label: 'Dessert',       emoji: '🍰', group: 'Food & drink' },

  shop:        { label: 'Shops',         emoji: '🛍️', group: 'Shopping' },
  supermarket: { label: 'Supermarkets',  emoji: '🛒', group: 'Shopping' },
  market:      { label: 'Markets',       emoji: '🏪', group: 'Shopping' },
  bookshop:    { label: 'Bookshops',     emoji: '📚', group: 'Shopping' },
  charityshop: { label: 'Charity Shops', emoji: '♻️', group: 'Shopping' },

  park:        { label: 'Parks',         emoji: '🌳', group: 'Out & about' },
  museum:      { label: 'Museums',       emoji: '🏛️', group: 'Out & about' },
  cinema:      { label: 'Cinemas',       emoji: '🎬', group: 'Out & about' },
  theatre:     { label: 'Theatres',      emoji: '🎭', group: 'Out & about' },
  venue:       { label: 'Music Venues',  emoji: '🎤', group: 'Out & about' },
  gym:         { label: 'Gyms',          emoji: '🏋️', group: 'Out & about' },
  beach:       { label: 'Beaches',       emoji: '🏖️', group: 'Out & about' },
  walk:        { label: 'Walks',         emoji: '🚶', group: 'Out & about' },

  barber:      { label: 'Barbers',       emoji: '💈', group: 'Services' },
  dentist:     { label: 'Dentists',      emoji: '🦷', group: 'Services' },
  gp:          { label: 'GPs',           emoji: '🏥', group: 'Services' },
  mechanic:    { label: 'Mechanics',     emoji: '🔧', group: 'Services' },
  tattoo:      { label: 'Tattoo studios',emoji: '🖋️', group: 'Services' },
  laundrette:  { label: 'Laundrettes',   emoji: '🧺', group: 'Services' },

  hotel:       { label: 'Hotels',        emoji: '🏨', group: 'Travel' },
  airbnb:      { label: 'Airbnbs',       emoji: '🛏️', group: 'Travel' },
  station:     { label: 'Stations',      emoji: '🚉', group: 'Travel' },
  airport:     { label: 'Airports',      emoji: '✈️', group: 'Travel' },
  bus:         { label: 'Buses',         emoji: '🚌', group: 'Travel' },

  toilet:      { label: 'Toilets',       emoji: '🚽', group: 'Misc' },
  bench:       { label: 'Benches',       emoji: '🪑', group: 'Misc' },
  random:      { label: 'Random places', emoji: '❓', group: 'Misc' },
  other:       { label: 'Other',         emoji: '📍', group: 'Misc' },
};

/** What rating buckets mean — used to color and label */
export function ratingTier(r: number): { label: string; color: string } {
  if (r >= 9)  return { label: 'cooked it',      color: '#1ed760' };
  if (r >= 7)  return { label: 'genuinely good', color: '#4caf50' };
  if (r >= 5)  return { label: 'mid',            color: '#ffa726' };
  if (r >= 3)  return { label: 'rough',          color: '#ef6c00' };
  if (r >= 1)  return { label: 'sin',            color: '#d32f2f' };
  return         { label: 'do not go',           color: '#7b1fa2' };
}

/** £ symbol for price level */
export function priceLabel(level?: 1 | 2 | 3 | 4): string {
  if (!level) return '';
  return '£'.repeat(level);
}
