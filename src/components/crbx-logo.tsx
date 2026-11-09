interface CrbxLogoProps {
  className?: string;
  size?: number | string;
}

export function CrbxLogo({ className = "size-10", size }: CrbxLogoProps) {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="CRBX TikTok LIVE Logo"
    >
      <defs>
        {/* Metallic chrome gradient */}
        <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#E2E8F0" />
          <stop offset="45%" stopColor="#94A3B8" />
          <stop offset="55%" stopColor="#CBD5E1" />
          <stop offset="75%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#F8FAFC" />
        </linearGradient>

        {/* Dark disc gradient */}
        <radialGradient id="discGrad" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#1E2430" />
          <stop offset="65%" stopColor="#0B0E14" />
          <stop offset="100%" stopColor="#05070A" />
        </radialGradient>

        {/* Outer ring metallic gradient */}
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="30%" stopColor="#475569" />
          <stop offset="50%" stopColor="#E2E8F0" />
          <stop offset="70%" stopColor="#334155" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>

        {/* Neon blue rim glow */}
        <linearGradient id="neonRim" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FE2C55" stopOpacity="0.8" />
        </linearGradient>

        {/* Drop shadow filter */}
        <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.6" />
        </filter>

        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Main Circular Badge */}
      <g filter="url(#badgeShadow)">
        {/* Outer Chrome Bezel */}
        <circle cx="250" cy="250" r="235" fill="url(#ringGrad)" stroke="#1E293B" strokeWidth="4" />

        {/* Neon Light Strip */}
        <circle
          cx="250"
          cy="250"
          r="226"
          fill="none"
          stroke="url(#neonRim)"
          strokeWidth="3"
          opacity="0.9"
        />

        {/* Inner Black Circular Face */}
        <circle cx="250" cy="250" r="220" fill="url(#discGrad)" stroke="#0F172A" strokeWidth="3" />

        {/* Subtle Inner Accent Rim */}
        <circle
          cx="250"
          cy="250"
          r="216"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1"
          opacity="0.15"
        />
      </g>

      {/* TOP CROWN (Silver Chrome 3-point Crown) */}
      <g filter="url(#badgeShadow)">
        <path
          d="M 175 185 L 160 115 L 215 145 L 250 85 L 285 145 L 340 115 L 325 185 Z"
          fill="url(#chromeGrad)"
          stroke="#E2E8F0"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Crown 3D Facet Highlight */}
        <path d="M 250 85 L 215 145 L 250 185 L 285 145 Z" fill="#FFFFFF" opacity="0.25" />
        <path d="M 160 115 L 215 145 L 175 185 Z" fill="#475569" opacity="0.3" />
        <path d="M 340 115 L 285 145 L 325 185 Z" fill="#475569" opacity="0.3" />
        {/* Crown Base Band */}
        <path
          d="M 170 183 Q 250 195 330 183 L 327 195 Q 250 207 173 195 Z"
          fill="url(#chromeGrad)"
          stroke="#64748B"
          strokeWidth="1.5"
        />
      </g>

      {/* CENTER CRBX TEXT (Bold 3D Chrome) */}
      <g filter="url(#badgeShadow)">
        {/* CRBX 3D Extrusion Shadow */}
        <text
          x="250"
          y="314"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Montserrat', 'Inter', sans-serif"
          fontWeight="900"
          fontSize="116"
          letterSpacing="-3"
          fill="#0B0F17"
        >
          CRBX
        </text>

        {/* CRBX Main Chrome Text */}
        <text
          x="250"
          y="308"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Montserrat', 'Inter', sans-serif"
          fontWeight="900"
          fontSize="116"
          letterSpacing="-3"
          fill="url(#chromeGrad)"
          stroke="#FFFFFF"
          strokeWidth="2.5"
        >
          CRBX
        </text>

        {/* Chrome Highlights on letters */}
        <text
          x="250"
          y="307"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Montserrat', 'Inter', sans-serif"
          fontWeight="900"
          fontSize="116"
          letterSpacing="-3"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1"
          opacity="0.6"
        >
          CRBX
        </text>
      </g>

      {/* BOTTOM SECTION: TIKTOK ICON + LIVE BADGE */}
      <g transform="translate(160, 345)">
        {/* TikTok Note Icon */}
        <g transform="scale(0.85) translate(0, 0)">
          {/* Cyan layer */}
          <path
            d="M26 4 C28 9 32 13 38 14 L38 21 C33 21 28 19 25 16 L25 32 C25 40 18 46 10 46 C4 46 0 41 0 35 C0 28 6 22 13 22 C14 22 16 22 17 23 L17 30 C16 29 14 29 13 29 C9 29 7 32 7 35 C7 38 9 40 12 40 C16 40 18 37 18 33 L18 4 Z"
            fill="#00F2FE"
          />
          {/* Magenta / Pink layer */}
          <path
            d="M30 6 C32 11 36 15 42 16 L42 23 C37 23 32 21 29 18 L29 34 C29 42 22 48 14 48 C8 48 4 43 4 37 C4 30 10 24 17 24 C18 24 20 24 21 25 L21 32 C20 31 18 31 17 31 C13 31 11 34 11 37 C11 40 13 42 16 42 C20 42 22 39 22 35 L22 6 Z"
            fill="#FE2C55"
          />
          {/* White center */}
          <path
            d="M28 5 C30 10 34 14 40 15 L40 22 C35 22 30 20 27 17 L27 33 C27 41 20 47 12 47 C6 47 2 42 2 36 C2 29 8 23 15 23 C16 23 18 23 19 24 L19 31 C18 30 16 30 15 30 C11 30 9 33 9 36 C9 39 11 41 14 41 C18 41 20 38 20 34 L20 5 Z"
            fill="#FFFFFF"
          />
        </g>

        {/* LIVE Pill Badge */}
        <g transform="translate(56, 4)">
          {/* Pill Container */}
          <rect
            x="0"
            y="0"
            width="122"
            height="38"
            rx="19"
            fill="#090D14"
            stroke="url(#chromeGrad)"
            strokeWidth="2.5"
          />

          {/* Red Recording Dot */}
          <circle cx="22" cy="19" r="6.5" fill="#FE2C55" />
          <circle cx="22" cy="19" r="3" fill="#FFFFFF" opacity="0.6" />

          {/* LIVE Text */}
          <text
            x="70"
            y="26"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Montserrat', sans-serif"
            fontWeight="900"
            fontSize="21"
            letterSpacing="2.5"
            fill="#FFFFFF"
          >
            LIVE
          </text>
        </g>
      </g>
    </svg>
  );
}
