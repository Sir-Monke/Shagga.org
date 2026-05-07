'use client';
import React, { useState } from 'react';

interface Email {
  id: number;
  from: string;
  email: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  unread: boolean;
  /** if user composed it themselves */
  outbox?: boolean;
}

const SEED_EMAILS: Email[] = [
  { id: 1, from: 'Auntie Linda', email: 'linda.h@hotmail.co.uk', time: 'now', unread: true,
    subject: 'Fwd: Fwd: Fwd: AMAZING — please read',
    preview: '🌹🌹🌹 GOOD MORNING ANGELS 🌹🌹🌹 a lovely lady I worked with at the bin shop sent me this and now I am sending it to you my love…',
    body: '🌹🌹🌹 GOOD MORNING ANGELS 🌹🌹🌹\n\na lovely lady I worked with at the bin shop sent me this and now I am sending it to you my love.\n\nIF YOU FORWARD THIS TO 7 PEOPLE IN THE NEXT 4 MINUTES YOU WILL HAVE GOOD LUCK FOR LIFE\n\nSusan from Bootle didn\u2019t forward it and her cat caught fire (true story).\n\ngod bless ❤️❤️❤️\n\n\u2014\nSent from my IPHONE 4S' },
  { id: 2, from: 'Phil Drives', email: 'phil@philsdiesel.co.uk', time: '11:24', unread: true,
    subject: 'sausage roll situation',
    preview: 'lad. i have absolutely demolished the works fridge. they have a list. my name is on the list. i need backup.',
    body: 'lad.\n\ni have absolutely demolished the works fridge. they have a list. my name is on the list. i need backup. can you come down?\n\nbringing a flask. spare gloves in the boot.\n\nphil' },
  { id: 3, from: 'Sharon @ accounts', email: 'sharon.morris@shaggacorp.co.uk', time: '10:08', unread: true,
    subject: '[REPLY ALL] Re: Re: Re: lunch order — please stop',
    preview: 'Hi all, Just to be clear it is ONE order for the meeting room not 47 separate orders. Please can people stop replying all.',
    body: 'Hi all,\n\nJust to be clear it is ONE order for the meeting room not 47 separate orders. Please can people stop replying all with their preferences.\n\nAlso \u2014 Phil please remove yourself from this thread.\n\nKind regards,\nSharon\nAccounts Department\nShagga Corp\n\nThis email and its attachments are confidential and may be legally privileged. If you have received this email in error please notify the sender immediately and delete any copies. Thank you.' },
  { id: 4, from: 'Tech Helpline', email: 'noreply@techhelpline.co.uk', time: 'Yesterday', unread: false,
    subject: 'Have you tried turning it off and on again?',
    preview: 'Dear customer, Following our recent conversation, please confirm whether you have tried turning the device off and then on again.',
    body: 'Dear customer,\n\nFollowing our recent conversation, please could you confirm whether you have tried:\n\n1. Turning the device off\n2. Turning the device on\n\nIf the issue persists, please escalate to Tier 2 by replying \"yes\" to this email.\n\nKind regards,\nTech Helpline\nA division of Shagga Corp' },
  { id: 5, from: 'Margaret', email: 'margaret90@aol.com', time: 'Tuesday', unread: false,
    subject: 'has anyone seen my phone',
    preview: 'I have lost my phone again. Please call it. Please. love nan x',
    body: 'I have lost my phone again.\n\nPlease call it.\n\nPlease.\n\nlove nan x' },
  { id: 6, from: 'Ross Buckley', email: 'ross@buckleycards.shagga', time: 'Tuesday', unread: false,
    subject: 'card?',
    preview: 'mate. card. milkshake. yes? shagga shagga shagga',
    body: 'mate.\n\ncard.\n\nmilkshake.\n\nyes?\n\nshagga shagga shagga' },
  { id: 7, from: 'Middle Aisle Mike', email: 'mike@midaislewatch.co.uk', time: 'Monday', unread: false,
    subject: 'THIS WEEK IN THE MIDDLE AISLE',
    preview: 'kayak, chainsaw, 47 garden gnomes, one (1) astronaut suit. £14.99 each. who is buying these.',
    body: 'TODAY IN THE LIDL MIDDLE AISLE\n\n• kayak (£89)\n• chainsaw (£34)\n• 47 garden gnomes (£0.99 each)\n• one (1) astronaut suit (£14.99)\n• full size pinball machine (£249)\n• live owl (illegal — went anyway)\n\nWHO is buying these. send tips to mike@midaislewatch.co.uk\n\nMike' },
  { id: 8, from: 'shagga.org newsletter', email: 'newsletter@shagga.org', time: 'Sunday', unread: false,
    subject: 'top shagga energy: this week\u2019s digest',
    preview: 'top stories from shagga.org. new reviews dropped. ross buckley has been spotted in crosby. phil hit 188k miles.',
    body: 'top stories this week:\n\n1. new review: Liverpool Road Social — 9.2/10 HEAVY SCRAN\n2. new review: David Lloyd Speke — 5.5 (overpriced gym)\n3. ross buckley spotted handing out cards in crosby\n4. phil drives hits 188k miles in his cavalier\n5. auntie linda chain email going viral\n\nread it all on shagga.org\n\nreply to hello@shagga.org\n\n— shagga' },
  { id: 9, from: 'Sir Monke', email: 'hello@shagga.org', time: 'Saturday', unread: false,
    subject: 'welcome to the shagga.org mobile mail experience',
    preview: 'this is a fake mail app inside a fake iPhone OS 1 inside a real Next.js site. enjoy.',
    body: 'welcome to the shagga.org mobile mail experience.\n\nthis is a fake mail app inside a fake iPhone OS 1 inside a real Next.js 14 site.\n\nyou can:\n- read the canned emails\n- compose a "real" one (it goes to your local outbox, doesn\u2019t actually send)\n- search them all\n\nfor anything actually serious, hit hello@shagga.org\n\n— sir monke' },
];

type Folder = 'inbox' | 'outbox';

export const AppMail: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>(SEED_EMAILS);
  const [folder, setFolder] = useState<Folder>('inbox');
  const [openId, setOpenId] = useState<number | null>(null);
  const [composing, setComposing] = useState(false);
  const [search, setSearch] = useState('');

  // Compose draft
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const open = openId !== null ? emails.find((e) => e.id === openId) : null;

  if (composing) {
    const sendDraft = () => {
      if (!to.trim() && !subject.trim() && !body.trim()) { setComposing(false); return; }
      const sent: Email = {
        id: Date.now(),
        from: 'Me',
        email: to.trim() || '(no recipient)',
        subject: subject.trim() || '(no subject)',
        preview: body.slice(0, 80) || '(empty)',
        body: body || '(empty)',
        time: 'just now',
        unread: false,
        outbox: true,
      };
      setEmails((curr) => [sent, ...curr]);
      setTo(''); setSubject(''); setBody('');
      setComposing(false);
      setFolder('outbox');
    };
    return (
      <div className="mail-compose">
        <div className="mail-thread-toolbar">
          <button onClick={() => setComposing(false)} className="mail-back">Cancel</button>
          <button onClick={sendDraft} className="mail-send">Send</button>
        </div>
        <div className="mail-compose-fields">
          <label>
            <span>To:</span>
            <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="recipient@example.com" />
          </label>
          <label>
            <span>Subject:</span>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="…" />
          </label>
          <textarea
            className="mail-compose-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="write your email…"
            autoFocus
          />
        </div>
      </div>
    );
  }

  if (open) {
    return (
      <div className="mail-thread">
        <div className="mail-thread-toolbar">
          <button onClick={() => setOpenId(null)} className="mail-back">‹ {folder === 'inbox' ? 'Inbox' : 'Sent'}</button>
        </div>
        <div className="mail-thread-content">
          <h1 className="mail-subject">{open.subject}</h1>
          <div className="mail-meta">
            <div className="mail-avatar">{open.from.slice(0, 1)}</div>
            <div className="mail-meta-text">
              <div className="mail-from"><strong>{open.from}</strong></div>
              <div className="mail-email">{open.email}</div>
              <div className="mail-time">{open.time}</div>
            </div>
          </div>
          <div className="mail-body">{open.body}</div>
        </div>
      </div>
    );
  }

  const visible = emails
    .filter((e) => folder === 'inbox' ? !e.outbox : !!e.outbox)
    .filter((e) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return e.from.toLowerCase().includes(q) || e.subject.toLowerCase().includes(q) || e.preview.toLowerCase().includes(q);
    });

  return (
    <div className="mail-inbox">
      <div className="mail-folder-tabs">
        <button className={folder === 'inbox' ? 'mail-folder-tab mail-folder-tab-active' : 'mail-folder-tab'} onClick={() => setFolder('inbox')}>Inbox</button>
        <button className={folder === 'outbox' ? 'mail-folder-tab mail-folder-tab-active' : 'mail-folder-tab'} onClick={() => setFolder('outbox')}>Sent</button>
        <button className="mail-compose-btn" onClick={() => setComposing(true)}>✎ New</button>
      </div>
      <div className="mail-inbox-search">
        <input type="search" placeholder="Search Mail" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {visible.length === 0 && (
        <p className="mail-empty">{folder === 'inbox' ? 'No emails match.' : 'No emails sent yet. Tap ✎ New to compose one.'}</p>
      )}
      {visible.map((e) => (
        <button key={e.id} className="mail-row" onClick={() => setOpenId(e.id)}>
          {e.unread && <span className="mail-unread-dot" />}
          <div className="mail-row-content">
            <div className="mail-row-line1">
              <span className="mail-row-from">{e.from}</span>
              <span className="mail-row-time">{e.time} ›</span>
            </div>
            <div className="mail-row-subject">{e.subject}</div>
            <div className="mail-row-preview">{e.preview}</div>
          </div>
        </button>
      ))}
    </div>
  );
};
