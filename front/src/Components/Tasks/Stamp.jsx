import './stamp.css';
export default function Stamp({ color, text }) {
  const posX = text.length === 4 ? '35' : '25';
  return (
    <div className="center">
      <svg className="letter" width="250" height="160" viewBox="0 0 250 160">
        <circle
          cx="80"
          cy="80"
          r="65"
          stroke={color}
          stroke-width="2"
          fill="white"
        />
        <circle
          cx="80"
          cy="80"
          r="60"
          stroke={color}
          stroke-width="2"
          fill="white"
        />
        <text
          x={posX}
          y="50"
          transform="rotate(-25 175 50)"
          fill="none"
          stroke={color}
          stroke-width="2"
          style={{ fontSize: '30px' }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
