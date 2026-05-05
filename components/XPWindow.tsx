'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface XPWindowProps {
  id: string;
  title: string;
  iconSvg?: React.ReactNode;
  initialX: number;
  initialY: number;
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  minimized: boolean;
  maximized: boolean;
  resizable?: boolean;
  zIndex: number;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
  animateIn?: boolean;
}

type ResizeDir = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export default function XPWindow({
  title,
  iconSvg,
  initialX,
  initialY,
  width,
  height,
  minWidth = 220,
  minHeight = 140,
  minimized,
  maximized,
  resizable = true,
  zIndex,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
  animateIn = true,
}: XPWindowProps) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ w: width, h: height });
  const [snapPreview, setSnapPreview] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const snapPreviewRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null);
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizing = useRef<ResizeDir | null>(null);
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0, px: 0, py: 0 });

  useEffect(() => {
    function clampOrWrap(x: number, y: number) {
      // Asteroids-style horizontal wrap: drag a window off one edge → reappears on the other.
      // Vertical: clamp (no wrap above the screen / behind taskbar).
      const screenW = window.innerWidth;
      const taskbarH = 30;
      const maxY = window.innerHeight - taskbarH - 30; // titlebar still visible
      let wrappedX = x;
      // Only wrap when the window has moved fully off-screen
      if (x + size.w < 0) wrappedX = screenW - 4;       // off the left → reappear from right
      else if (x > screenW) wrappedX = -size.w + 4;     // off the right → reappear from left
      return {
        x: wrappedX,
        y: Math.min(Math.max(0, y), maxY),
      };
    }

    function handleMove(e: MouseEvent | TouchEvent) {
      const point = 'touches' in e ? e.touches[0] : e;
      if (!point) return;

      if (dragging.current) {
        if (maximized) return;
        const next = clampOrWrap(
          point.clientX - dragOffset.current.x,
          point.clientY - dragOffset.current.y
        );
        setPos(next);

        // Snap zone detection (Windows-style: drag to edge → snap preview)
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const TASKBAR_H = 30;
        const EDGE = 10;
        let preview: { x: number; y: number; w: number; h: number } | null = null;
        if (point.clientY <= EDGE) {
          // Top edge → maximize preview
          preview = { x: 0, y: 0, w: screenW, h: screenH - TASKBAR_H };
        } else if (point.clientX <= EDGE) {
          // Left edge → left half
          preview = { x: 0, y: 0, w: Math.floor(screenW / 2), h: screenH - TASKBAR_H };
        } else if (point.clientX >= screenW - EDGE) {
          // Right edge → right half
          preview = { x: Math.ceil(screenW / 2), y: 0, w: Math.floor(screenW / 2), h: screenH - TASKBAR_H };
        }
        snapPreviewRef.current = preview;
        setSnapPreview(preview);

        if ('touches' in e) e.preventDefault();
      } else if (resizing.current) {
        if (maximized) return;
        const dir = resizing.current;
        const dx = point.clientX - resizeStart.current.x;
        const dy = point.clientY - resizeStart.current.y;
        let newW = resizeStart.current.w;
        let newH = resizeStart.current.h;
        let newX = resizeStart.current.px;
        let newY = resizeStart.current.py;

        if (dir.includes('e')) newW = Math.max(minWidth, resizeStart.current.w + dx);
        if (dir.includes('s')) newH = Math.max(minHeight, resizeStart.current.h + dy);
        if (dir.includes('w')) {
          const w = Math.max(minWidth, resizeStart.current.w - dx);
          newX = resizeStart.current.px + (resizeStart.current.w - w);
          newW = w;
        }
        if (dir.includes('n')) {
          const h = Math.max(minHeight, resizeStart.current.h - dy);
          newY = resizeStart.current.py + (resizeStart.current.h - h);
          newH = h;
        }
        setSize({ w: newW, h: newH });
        setPos({ x: newX, y: newY });
        if ('touches' in e) e.preventDefault();
      }
    }

    function handleUp() {
      // If we were dragging and have a snap preview, apply it
      if (dragging.current && snapPreviewRef.current) {
        const sp = snapPreviewRef.current;
        setPos({ x: sp.x, y: sp.y });
        setSize({ w: sp.w, h: sp.h });
      }
      snapPreviewRef.current = null;
      setSnapPreview(null);
      dragging.current = false;
      resizing.current = null;
    }

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [size.w, maximized, minWidth, minHeight]);

  function startDrag(e: React.MouseEvent | React.TouchEvent) {
    onFocus();
    if (maximized) return;
    const point = 'touches' in e ? e.touches[0] : e;
    if (!point) return;
    dragging.current = true;
    dragOffset.current = {
      x: point.clientX - pos.x,
      y: point.clientY - pos.y,
    };
  }

  function startResize(dir: ResizeDir, e: React.MouseEvent | React.TouchEvent) {
    e.stopPropagation();
    onFocus();
    if (maximized) return;
    const point = 'touches' in e ? e.touches[0] : e;
    if (!point) return;
    resizing.current = dir;
    resizeStart.current = {
      x: point.clientX,
      y: point.clientY,
      w: size.w,
      h: size.h,
      px: pos.x,
      py: pos.y,
    };
  }

  if (minimized) return null;

  const style: React.CSSProperties = maximized
    ? { left: 0, top: 0, width: '100%', height: 'calc(100% - 30px)', zIndex, borderRadius: 0 }
    : { left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex };

  return (
    <>
      {snapPreview && (
        <div
          className="xp-snap-preview"
          style={{
            left: snapPreview.x,
            top: snapPreview.y,
            width: snapPreview.w,
            height: snapPreview.h,
          }}
        />
      )}
      <div
      className={`xp-window${animateIn ? ' popping-in' : ''}${maximized ? ' maximized' : ''}`}
      style={style}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
    >
      <div
        className={`xp-titlebar${isActive ? '' : ' inactive'}`}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        onDoubleClick={onMaximize}
      >
        {iconSvg && <span className="xp-title-icon">{iconSvg}</span>}
        <span className="xp-title-text">{title}</span>
        <div className="xp-controls">
          <button
            className="xp-control-btn"
            aria-label="Minimize"
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <svg viewBox="0 0 10 10" width="10" height="10" fill="white">
              <rect x="1" y="7" width="8" height="2" />
            </svg>
          </button>
          <button
            className="xp-control-btn"
            aria-label="Maximize"
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            {maximized ? (
              <svg viewBox="0 0 10 10" width="10" height="10" stroke="white" strokeWidth="1.2" fill="none">
                <rect x="1" y="3" width="6" height="6" />
                <path d="M 3 3 L 3 1 L 9 1 L 9 7 L 7 7" />
              </svg>
            ) : (
              <svg viewBox="0 0 10 10" width="10" height="10" stroke="white" strokeWidth="1.4" fill="none">
                <rect x="1.5" y="2" width="7" height="6" />
                <line x1="1.5" y1="3.5" x2="8.5" y2="3.5" strokeWidth="1.6" />
              </svg>
            )}
          </button>
          <button
            className="xp-control-btn close"
            aria-label="Close"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <svg viewBox="0 0 10 10" width="10" height="10" stroke="white" strokeWidth="2" fill="none">
              <line x1="2" y1="2" x2="8" y2="8" />
              <line x1="8" y1="2" x2="2" y2="8" />
            </svg>
          </button>
        </div>
      </div>
      {children}

      {resizable && !maximized && (
        <>
          <div className="xp-resize xp-resize-n" onMouseDown={(e) => startResize('n', e)} onTouchStart={(e) => startResize('n', e)} />
          <div className="xp-resize xp-resize-s" onMouseDown={(e) => startResize('s', e)} onTouchStart={(e) => startResize('s', e)} />
          <div className="xp-resize xp-resize-e" onMouseDown={(e) => startResize('e', e)} onTouchStart={(e) => startResize('e', e)} />
          <div className="xp-resize xp-resize-w" onMouseDown={(e) => startResize('w', e)} onTouchStart={(e) => startResize('w', e)} />
          <div className="xp-resize xp-resize-ne" onMouseDown={(e) => startResize('ne', e)} onTouchStart={(e) => startResize('ne', e)} />
          <div className="xp-resize xp-resize-nw" onMouseDown={(e) => startResize('nw', e)} onTouchStart={(e) => startResize('nw', e)} />
          <div className="xp-resize xp-resize-se" onMouseDown={(e) => startResize('se', e)} onTouchStart={(e) => startResize('se', e)} />
          <div className="xp-resize xp-resize-sw" onMouseDown={(e) => startResize('sw', e)} onTouchStart={(e) => startResize('sw', e)} />
        </>
      )}
    </div>
    </>
  );
}
