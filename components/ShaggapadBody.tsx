'use client';

import React from 'react';

export default function ShaggapadBody({ text }: { text: string }) {
  return (
    <>
      <div className="shaggapad-menu">
        <span>File</span>
        <span>Edit</span>
        <span>Format</span>
        <span>View</span>
        <span>Help</span>
      </div>
      <div className="shaggapad">{text}</div>
    </>
  );
}
