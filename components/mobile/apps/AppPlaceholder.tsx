'use client';
import React from 'react';
import type { MobileAppKind } from '../appRegistry';

const COPY: Record<MobileAppKind, { title: string; line1: string; line2?: string }> = {
  phone:      { title: 'Shagga Phone', line1: 'No service.',           line2: 'this is a comedy site, you absolute melt' },
  mail:       { title: 'Mail',         line1: 'Inbox empty.',          line2: 'check back when ross buckley sends a card' },
  safari:     { title: 'Shafari',      line1: 'Cannot connect.',       line2: 'go outside instead' },
  shaggafy:   { title: 'Shagga-fy',    line1: 'Now playing: nothing.', line2: 'tap to find a song · or just hum it yourself' },
  text:       { title: 'Messages',     line1: 'No new messages.',      line2: 'phil hasn\u2019t replied yet' },
  calendar:   { title: 'Calendar',     line1: 'Nothing on today.',     line2: 'best day of the week' },
  photos:     { title: 'Photos',       line1: 'No photos yet.',        line2: 'go take some legend' },
  camera:     { title: 'Camera',       line1: 'Camera unavailable.',   line2: 'pretend, you\u2019re creative' },
  shaggatube: { title: 'ShaggaTube',   line1: 'Loading recommendations\u2026', line2: 'all of them are ross buckley' },
  stocks:     { title: 'Stocks',       line1: 'STIK \u00b7 \u00a3420.69',     line2: '\u2191 +42.0% today \u00b7 going to the moon' },
  maps:       { title: 'Maps',         line1: 'Centring Liverpool\u2026', line2: 'always centring Liverpool' },
  weather:    { title: 'Weather',      line1: 'Liverpool \u00b7 14\u00b0',    line2: 'overcast \u00b7 light drizzle \u00b7 typical' },
  clock:      { title: 'Clock',        line1: '',                      line2: '' },
  calculator: { title: 'Calculator',   line1: '',                      line2: '' },
  notes:      { title: 'Notes',        line1: 'No notes.',             line2: 'tap + to add one' },
  settings:   { title: 'Settings',     line1: '',                      line2: '' },
  reviews:    { title: 'Reviews',      line1: '',                      line2: '' },
  shwitter:   { title: 'Shwitter',     line1: 'Loading shweets\u2026', line2: 'mostly arguments about the bins' },
  shaggagram: { title: 'Shagga-gram',  line1: 'Loading feed\u2026',    line2: 'someone posted their dinner. again.' },
  shaggabook: { title: 'ShaggaBook',   line1: 'Loading wall\u2026',    line2: 'auntie linda just shared a chain post' },
  portfolio:  { title: 'Portfolio',    line1: 'Sir Monke',             line2: 'open the laptop version for the full thing' },
};

export const AppPlaceholder: React.FC<{ kind: MobileAppKind }> = ({ kind }) => {
  const copy = COPY[kind] ?? { title: kind, line1: 'Coming soon.', line2: '' };
  return (
    <div className="mob-placeholder">
      <div className="mob-placeholder-body">
        <p className="mob-placeholder-line1">{copy.line1}</p>
        {copy.line2 && <p className="mob-placeholder-line2">{copy.line2}</p>}
      </div>
    </div>
  );
};
