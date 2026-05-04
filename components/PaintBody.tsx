'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PencilToolIcon, EraserToolIcon } from './icons';

const COLORS = [
  '#000000', '#7f7f7f', '#880015', '#ed1c24', '#ff7f27', '#fff200',
  '#22b14c', '#00a2e8', '#3f48cc', '#a349a4', '#ffaec9', '#ffc90e',
  '#ffffff', '#c3c3c3', '#b97a57', '#99d9ea', '#7092be', '#000080',
];

type Tool = 'pencil' | 'eraser';

export default function PaintBody() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState('#000');
  const [tool, setTool] = useState<Tool>('pencil');
  const [size, setSize] = useState(3);
  const drawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  // Resize canvas backing buffer to match its DOM size, preserving the drawing.
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!canvas || !wrap || !ctx) return;
      const r = wrap.getBoundingClientRect();
      const w = Math.max(50, Math.floor(r.width));
      const h = Math.max(50, Math.floor(r.height));
      // Preserve current image
      const prev = document.createElement('canvas');
      prev.width = canvas.width;
      prev.height = canvas.height;
      prev.getContext('2d')?.drawImage(canvas, 0, 0);
      canvas.width = w;
      canvas.height = h;
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(prev, 0, 0);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  const getPoint = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const point = 'touches' in e ? e.touches[0] : (e as React.MouseEvent);
    if (!point) return null;
    return {
      x: ((point.clientX - rect.left) / rect.width) * canvas.width,
      y: ((point.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const start = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const p = getPoint(e);
    if (!p) return;
    drawing.current = true;
    lastPoint.current = p;
    drawTo(p);
  };

  const move = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing.current) return;
    e.preventDefault();
    const p = getPoint(e);
    if (!p) return;
    drawTo(p);
    lastPoint.current = p;
  };

  const end = () => { drawing.current = false; lastPoint.current = null; };

  const drawTo = (p: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.strokeStyle = tool === 'eraser' ? '#fff' : color;
    ctx.lineWidth = tool === 'eraser' ? size * 4 : size;
    ctx.beginPath();
    if (lastPoint.current) ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    else ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'shagga-paint.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="paint-block">
        {/* Top toolbar — always visible */}
        <div className="paint-toolbox">
          <button
            className={`paint-tool${tool === 'pencil' ? ' active' : ''}`}
            onClick={() => setTool('pencil')}
            onMouseDown={(e) => e.stopPropagation()}
            title="Pencil"
            aria-label="Pencil"
          >
            <PencilToolIcon size={18} />
          </button>
          <button
            className={`paint-tool${tool === 'eraser' ? ' active' : ''}`}
            onClick={() => setTool('eraser')}
            onMouseDown={(e) => e.stopPropagation()}
            title="Eraser"
            aria-label="Eraser"
          >
            <EraserToolIcon size={18} />
          </button>
          <div className="paint-divider" />
          <div className="paint-sizes">
            {[1, 3, 6, 12].map((s) => (
              <button
                key={s}
                className={`paint-size${size === s ? ' active' : ''}`}
                onClick={() => setSize(s)}
                onMouseDown={(e) => e.stopPropagation()}
                title={`Brush size ${s}`}
              >
                <span style={{ display:'block', width: s + 2, height: s + 2, background: '#000', borderRadius: '50%' }} />
              </button>
            ))}
          </div>
          <div className="paint-divider" />
          <button className="paint-action" onClick={clear} onMouseDown={(e) => e.stopPropagation()}>Clear</button>
          <button className="paint-action" onClick={save} onMouseDown={(e) => e.stopPropagation()}>Save .png</button>
        </div>

        {/* Main area: canvas (fills) + palette sidebar (fixed width, always visible) */}
        <div className="paint-main">
          <div className="paint-canvas-wrap" ref={wrapRef}>
            <canvas
              ref={canvasRef}
              className="paint-canvas"
              onMouseDown={start}
              onMouseMove={move}
              onMouseUp={end}
              onMouseLeave={end}
              onTouchStart={start}
              onTouchMove={move}
              onTouchEnd={end}
            />
          </div>
          <div className="paint-palette">
            {COLORS.map((c) => (
              <button
                key={c}
                className={`paint-swatch${color === c ? ' active' : ''}`}
                style={{ background: c }}
                onClick={() => { setColor(c); setTool('pencil'); }}
                onMouseDown={(e) => e.stopPropagation()}
                title={c}
              />
            ))}
            <div className="paint-current">
              <div className="paint-current-label">Active</div>
              <div className="paint-current-swatch" style={{ background: color }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
