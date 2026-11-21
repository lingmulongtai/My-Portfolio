import React from 'react';

const BASE_PROPS = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
};

export function IconFrame(props) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconMenu(props) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

export function IconClose(props) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

export function IconArrowRight(props) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

export function IconArrowLeft(props) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="11 6 5 12 11 18" />
    </svg>
  );
}

export function IconArrowUp(props) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="6 11 12 5 18 11" />
    </svg>
  );
}

export function IconDownload(props) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M12 4v11" />
      <polyline points="7 11 12 16 17 11" />
      <path d="M5 19h14" />
    </svg>
  );
}

export function IconCheck(props) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <polyline points="5 12 10 17 19 7" />
    </svg>
  );
}

export function IconSliders(props) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <circle cx="9" cy="7" r="2" />
      <line x1="4" y1="17" x2="20" y2="17" />
      <circle cx="15" cy="17" r="2" />
    </svg>
  );
}

export function IconPencil(props) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

export function IconPlus(props) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function IconLayers(props) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <polygon points="12 3 3 8 12 13 21 8 12 3" />
      <polyline points="3 12 12 17 21 12" />
      <polyline points="3 16 12 21 21 16" />
    </svg>
  );
}

export function IconMapPin(props) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <path d="M12 21s-6-5.4-6-10a6 6 0 1 1 12 0c0 4.6-6 10-6 10Z" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  );
}

export function IconMail(props) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  );
}

export function IconClock(props) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  );
}

export function IconTrash(props) {
  return (
    <svg {...BASE_PROPS} {...props}>
      <polyline points="4 7 20 7" />
      <path d="M9 7V4h6v3" />
      <path d="M6 7l1 13h10l1-13" />
    </svg>
  );
}
