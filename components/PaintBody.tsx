'use client';

import React, { useEffect, useRef, useState } from 'react';

const COLORS = [
  '#000000', '#7f7f7f', '#880015', '#ed1c24', '#ff7f27', '#fff200',
  '#22b14c', '#00a2e8', '#3f48cc', '#a349a4', '#ffaec9', '#ffc90e',
  '#ffffff', '#c3c3c3', '#b97a57', '#99d9ea', '#7092be', '#000080',
];

type Tool = 'pencil' | 'eraser';

export default function PaintBody() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState('#000');
  const [tool, setTool] = useState<Tool>('pencil');
  const [size, setSize] = useState(3);
  const drawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="paint-block">
        <div className="paint-toolbox">
          <button className={`paint-tool${tool === 'pencil' ? ' active' : ''}`}
            onClick={() => setTool('pencil')} onMouseDown={(e) => e.stopPropagation()} title="Pencil">✏</button>
          <button className={`paint-tool${tool === 'eraser' ? ' active' : ''}`}
            onClick={() => setTool('eraser')} onMouseDown={(e) => e.stopPropagation()} title="Eraser">▢</button>
          <button className="paint-tool" onClick={clear}
            onMouseDown={(e) => e.stopPropagation()} title="Clear">✕</button>
          <div className="paint-sizes">
            {[1, 3, 6, 12].map((s) => (
              <button key={s} className={`paint-size${size === s ? ' active' : ''}`}
                onClick={() => setSize(s)} onMouseDown={(e) => e.stopPropagation()}>
                <span style={{ display:'block', width: s + 2, height: s + 2, background: '#000', borderRadius: '50%' }} />
              </button>
            ))}
          </div>
        </div>
        <canvas ref={canvasRef} width={420} height={300} className="paint-canvas"
          onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
          onTouchStart={start} onTouchMove={move} onTouchEnd={end} />
        <div className="paint-palette">
          {COLORS.map((c) => (
            <button key={c} className={`paint-swatch${color === c ? ' active' : ''}`}
              style={{ background: c }} onClick={() => { setColor(c); setTool('pencil'); }}
              onMouseDown={(e) => e.stopPropagation()} />
          ))}
        </div>
      </div>
    </div>
  );
}
