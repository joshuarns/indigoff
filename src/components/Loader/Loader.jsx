import './Loader.css';

function Loader({ text = 'Loading…' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__mark" aria-hidden="true">
        <svg viewBox="0 0 44 44" fill="none" className="loader__ring">
          <circle className="loader__track" cx="22" cy="22" r="18" strokeWidth="2.5" />
          <circle
            className="loader__arc"
            cx="22"
            cy="22"
            r="18"
            strokeWidth="2.5"
            strokeDasharray="30 200"
            strokeLinecap="round"
          />
        </svg>
        <span className="loader__dot" />
      </span>
      {text && <span className="loader__text">{text}</span>}
    </div>
  );
}

export default Loader;
