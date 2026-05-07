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
    theMove: 'Go for anything on their menu i guarantee it will be good.',
    badge: 'Heavy Scran',
    priceLevel: 2,
    mapUrl: 'https://maps.app.goo.gl/qK2Z8C2Ytf6r7kii7',
    tags: ['chicken', 'good value', 'crosby', 'heavy-scran'],
    wouldReturn: true,
  },

  {
    id: 2,
    venue: 'David Lloyd Speke',
    location: '6, The Aerodrome, Liverpool L24 8QD',
    category: 'gym',
    rating: 5.5,
    visited: 'May 2026',
    title: 'Decent gym, but honestly it\u2019s a bit mid',
    body: "Was told by a staff member to leave a review, hence my honest review: it\u2019s mid, this gym. They make you pay too much for what you get access to. I wouldn't recommend the spa; it\u2019s a waste of time and money. I can guarantee you will only use it once or twice then never again, and you're stuck with that £150+ subscription you forgot to cancel after a year or two.\n\nI only use it for the pool and gym, and that's all you need. Closes at 10:30pm most of the time, which is the peak time to go—an hour before closing you get everything to yourself. Same for the pool. Strongly suggest going only during the adult hours; the indoor pool is super hairy and dirty sometimes. Some proper weird cunts in the spa section—if you sit down in the sauna, the sauna chats are weird as. Tennis courts are good, both indoor and outdoor, though the outdoor ones are mainly used for footy.",
    pros: [
      'Night time swims are mega',
      'Gym has good equipment',
      'Outdoor pool is really good',
    ],
    cons: [
      'Memberships overpriced',
      'Very busy most of the time',
      'Lots of old people dilly dallying',
      'The spa is nice but its always packed',
    ],
    theMove: 'Go late at night, or during a week day around 1-2pm or 9pm ish (hour before closing).',
    badge: 'Overpriced Gym',
    priceLevel: 4,
    mapUrl: 'https://maps.app.goo.gl/ygocD27NYrf7ZtAD6',
    tags: ['Swimming Pool', 'David Lloyd', 'Speke', 'Gym', 'Spa'],
    wouldReturn: true,
  },

  {
    id: 3,
    venue: 'Rough Handmade',
    location: 'Britannia Pavilion, Royal Albert Dock, Liverpool L3 4AD',
    category: 'bakery',
    rating: 8.5,
    visited: 'May 2026',
    title: 'Elite pastries and the best sandwiches in the Dock',
    body: "Been going to this place for years and it never misses. All the pastries are absolutely amazing—you can tell the owner really knows what she\u2019s doing, and she\u2019s proper nice as well.\n\nThe pesto, tomato, and mozzarella sandwiches are easily the best about, and the hot chocolates are really good too. Everything is fresh and high quality. If you're down the Albert Dock, this is the only place you need for a bit of scran.",
    pros: [
      'Pastries are elite tier',
      'Owner is super nice',
      'Best pesto and mozzarella sandwiches',
      'Hot chocolate is quality',
      'Everything is freshly made',
    ],
    cons: [
      'Hard to find a seat most of the time',
      'Very suggary',
    ],
    theMove: 'Get the anything thing on their pastery table its going to be good.',
    badge: 'Elite Bakery',
    priceLevel: 1,
    mapUrl: 'https://maps.app.goo.gl/nmsunURphkR56aDK8',
    tags: ['Bakery', 'Albert Dock', 'Pastries', 'Sandwiches', 'Scran'],
    wouldReturn: true,
  },

  {
    id: 4,
    venue: 'The BIG Sandwich Club',
    location: '28 Commerce Way, Liverpool L8 7BA',
    category: 'restaurant',
    rating: 1.5,
    visited: 'May 2026',
    title: 'Proper disappointed, way too salty',
    body: "Had high hopes for this place but it really wasn't for me. I got the Philly cheesesteak and it was honestly just very salty—I couldn't even finish it as it made me feel a bit sick. The cheese was that plastic American type which wasn't great either.\n\nThe bread was actually decent, but the filling let it down completely. It felt like the products used weren't top quality. The menu looks like they have good stuff and the reviews are normally high, so maybe I just got a bad batch or ordered the wrong thing. More than happy to return and try something else if they reach out, but this visit was a struggle.",
    pros: [
      'Bread was actually decent',
      'Menu has a good variety',
    ],
    cons: [
      'Way too much salt in the meat',
      'Cheap plastic American cheese',
      'Felt sick after a few bites',
    ],
    theMove: 'Maybe avoid the Philly cheesesteak and try something else—the bread is the only saving grace.',
    badge: 'Salty Scran',
    priceLevel: 2,
    mapUrl: 'https://maps.app.goo.gl/ttgdVkWPBQUfLn4P6',
    tags: ['Sandwiches', 'Philly Cheesesteak', 'Liverpool'],
    wouldReturn: false,
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
