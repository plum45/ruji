import { useState } from 'react';

export function ReadMoreText({ text, isLight }: { text: string; isLight: boolean }) {
  const [expanded, setExpanded] = useState(false);

  // Consider text long if it exceeds 70 characters (approx 1.5 - 2 lines in Thai)
  const isLong = text.length > 70;

  if (!isLong) {
    return (
      <p
        className="font-body text-xs"
        style={{
          marginTop: '0.35rem',
          lineHeight: 1.6,
          color: isLight ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)',
        }}
      >
        {text}
      </p>
    );
  }

  return (
    <div style={{ marginTop: '0.35rem' }}>
      <div
        className="custom-scrollbar"
        style={{
          maxHeight: expanded ? '72px' : '36px',
          overflowY: expanded ? 'auto' : 'hidden',
          transition: 'max-height 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
          lineHeight: 1.6,
          fontSize: '0.75rem',
          color: isLight ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)',
          paddingRight: expanded ? '6px' : '0px',
        }}
      >
        {text}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Stop click from triggering parent card click events
          setExpanded(!expanded);
        }}
        className="font-body font-semibold hover:underline"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          marginTop: '4px',
          cursor: 'pointer',
          fontSize: '0.7rem',
          color: isLight ? '#0284c7' : '#38bdf8',
          letterSpacing: '0.02em',
        }}
      >
        {expanded ? 'ย่อข้อความ' : 'อ่านเพิ่มเติม'}
      </button>
    </div>
  );
}
