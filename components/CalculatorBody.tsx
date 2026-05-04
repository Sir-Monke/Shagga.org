'use client';

import React, { useState } from 'react';

type Op = '+' | '−' | '×' | '÷' | null;

export default function CalculatorBody() {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<Op>(null);
  const [justEvaluated, setJustEvaluated] = useState(false);

  function pressDigit(d: string) {
    if (justEvaluated) {
      setDisplay(d);
      setJustEvaluated(false);
      return;
    }
    setDisplay((cur) => (cur === '0' ? d : cur + d));
  }

  function pressDot() {
    if (justEvaluated) {
      setDisplay('0.');
      setJustEvaluated(false);
      return;
    }
    setDisplay((cur) => (cur.includes('.') ? cur : cur + '.'));
  }

  function pressOp(nextOp: Op) {
    const cur = parseFloat(display);
    if (prev === null) {
      setPrev(cur);
    } else if (op && !justEvaluated) {
      const result = compute(prev, cur, op);
      setPrev(result);
      setDisplay(formatNum(result));
    }
    setOp(nextOp);
    setJustEvaluated(true);
  }

  function pressEquals() {
    if (op === null || prev === null) return;
    const cur = parseFloat(display);
    const result = compute(prev, cur, op);
    setDisplay(formatNum(result));
    setPrev(null);
    setOp(null);
    setJustEvaluated(true);
  }

  function pressClear() {
    setDisplay('0');
    setPrev(null);
    setOp(null);
    setJustEvaluated(false);
  }

  function pressNegate() {
    setDisplay((cur) => (cur.startsWith('-') ? cur.slice(1) : cur === '0' ? cur : '-' + cur));
  }

  return (
    <div className="xp-content" style={{ padding: 0 }}>
      <div className="calc-block">
        <div className="calc-display">{display.length > 14 ? display.slice(0, 14) + '…' : display}</div>
        <div className="calc-grid">
          <button className="calc-btn calc-fn" onClick={pressClear}>C</button>
          <button className="calc-btn calc-fn" onClick={pressNegate}>±</button>
          <button className="calc-btn calc-fn" onClick={() => setDisplay((d) => d.length > 1 ? d.slice(0, -1) : '0')}>⌫</button>
          <button className="calc-btn calc-op" onClick={() => pressOp('÷')}>÷</button>

          <button className="calc-btn" onClick={() => pressDigit('7')}>7</button>
          <button className="calc-btn" onClick={() => pressDigit('8')}>8</button>
          <button className="calc-btn" onClick={() => pressDigit('9')}>9</button>
          <button className="calc-btn calc-op" onClick={() => pressOp('×')}>×</button>

          <button className="calc-btn" onClick={() => pressDigit('4')}>4</button>
          <button className="calc-btn" onClick={() => pressDigit('5')}>5</button>
          <button className="calc-btn" onClick={() => pressDigit('6')}>6</button>
          <button className="calc-btn calc-op" onClick={() => pressOp('−')}>−</button>

          <button className="calc-btn" onClick={() => pressDigit('1')}>1</button>
          <button className="calc-btn" onClick={() => pressDigit('2')}>2</button>
          <button className="calc-btn" onClick={() => pressDigit('3')}>3</button>
          <button className="calc-btn calc-op" onClick={() => pressOp('+')}>+</button>

          <button className="calc-btn" style={{ gridColumn: 'span 2' }} onClick={() => pressDigit('0')}>0</button>
          <button className="calc-btn" onClick={pressDot}>.</button>
          <button className="calc-btn calc-eq" onClick={pressEquals}>=</button>
        </div>
      </div>
    </div>
  );
}

function compute(a: number, b: number, op: Op): number {
  switch (op) {
    case '+': return a + b;
    case '−': return a - b;
    case '×': return a * b;
    case '÷': return b === 0 ? NaN : a / b;
    default: return b;
  }
}

function formatNum(n: number): string {
  if (Number.isNaN(n)) return 'no, mate';
  if (!Number.isFinite(n)) return '∞';
  return Number(n.toFixed(8)).toString();
}
