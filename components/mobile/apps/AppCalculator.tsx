'use client';
import React, { useState, useCallback } from 'react';

type Op = '+' | '-' | '×' | '÷' | null;

export const AppCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [stored, setStored] = useState<number | null>(null);
  const [pendingOp, setPendingOp] = useState<Op>(null);
  const [lastInputWasOp, setLastInputWasOp] = useState(false);

  const inputDigit = useCallback((d: string) => {
    if (lastInputWasOp || display === '0') {
      setDisplay(d);
      setLastInputWasOp(false);
    } else if (display.length < 12) {
      setDisplay(display + d);
    }
  }, [display, lastInputWasOp]);

  const inputDot = useCallback(() => {
    if (lastInputWasOp) {
      setDisplay('0.');
      setLastInputWasOp(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  }, [display, lastInputWasOp]);

  const compute = (a: number, b: number, op: Op): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b === 0 ? NaN : a / b;
      default:  return b;
    }
  };

  const formatNum = (n: number): string => {
    if (!Number.isFinite(n)) return 'Error';
    const s = String(n);
    return s.length > 12 ? n.toPrecision(8) : s;
  };

  const applyOp = useCallback((op: Op) => {
    const current = parseFloat(display);
    if (stored === null) {
      setStored(current);
    } else if (!lastInputWasOp && pendingOp) {
      const result = compute(stored, current, pendingOp);
      setStored(result);
      setDisplay(formatNum(result));
    }
    setPendingOp(op);
    setLastInputWasOp(true);
  }, [display, stored, pendingOp, lastInputWasOp]);

  const equals = useCallback(() => {
    if (stored !== null && pendingOp) {
      const current = parseFloat(display);
      const result = compute(stored, current, pendingOp);
      setDisplay(formatNum(result));
      setStored(null);
      setPendingOp(null);
      setLastInputWasOp(true);
    }
  }, [display, stored, pendingOp]);

  const clear = useCallback(() => {
    setDisplay('0');
    setStored(null);
    setPendingOp(null);
    setLastInputWasOp(false);
  }, []);

  const negate = useCallback(() => {
    if (display === '0') return;
    setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
  }, [display]);

  const percent = useCallback(() => {
    const n = parseFloat(display) / 100;
    setDisplay(formatNum(n));
  }, [display]);

  const Btn: React.FC<{
    label: string;
    onClick: () => void;
    type?: 'num' | 'op' | 'fn';
    wide?: boolean;
    active?: boolean;
  }> = ({ label, onClick, type = 'num', wide = false, active = false }) => (
    <button
      className={`calc-btn calc-btn-${type} ${wide ? 'calc-btn-wide' : ''} ${active ? 'calc-btn-active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );

  return (
    <div className="calc-app">
      <div className="calc-display">
        <span className="calc-display-num">{display}</span>
      </div>

      <div className="calc-grid">
        <Btn label={stored !== null || display !== '0' ? 'C' : 'AC'} onClick={clear} type="fn" />
        <Btn label="±" onClick={negate} type="fn" />
        <Btn label="%" onClick={percent} type="fn" />
        <Btn label="÷" onClick={() => applyOp('÷')} type="op" active={pendingOp === '÷' && lastInputWasOp} />

        <Btn label="7" onClick={() => inputDigit('7')} />
        <Btn label="8" onClick={() => inputDigit('8')} />
        <Btn label="9" onClick={() => inputDigit('9')} />
        <Btn label="×" onClick={() => applyOp('×')} type="op" active={pendingOp === '×' && lastInputWasOp} />

        <Btn label="4" onClick={() => inputDigit('4')} />
        <Btn label="5" onClick={() => inputDigit('5')} />
        <Btn label="6" onClick={() => inputDigit('6')} />
        <Btn label="−" onClick={() => applyOp('-')} type="op" active={pendingOp === '-' && lastInputWasOp} />

        <Btn label="1" onClick={() => inputDigit('1')} />
        <Btn label="2" onClick={() => inputDigit('2')} />
        <Btn label="3" onClick={() => inputDigit('3')} />
        <Btn label="+" onClick={() => applyOp('+')} type="op" active={pendingOp === '+' && lastInputWasOp} />

        <Btn label="0" onClick={() => inputDigit('0')} wide />
        <Btn label="." onClick={inputDot} />
        <Btn label="=" onClick={equals} type="op" />
      </div>
    </div>
  );
};
