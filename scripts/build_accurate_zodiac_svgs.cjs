const fs = require('fs');
const path = require('path');

const signs = {
  aries: {
    name: "ARIES",
    sanskrit: "MESHA · ARIES",
    glyph: "♈",
    color1: "#ff5e00",
    color2: "#ffb703",
    color3: "#d00000",
    bg1: "#1e0802",
    bg2: "#0c0201",
    svgContent: `
      <!-- Aries Fiery Nebula Background -->
      <radialGradient id="ar_neb" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stop-color="#ff6b00" stop-opacity="0.5"/>
        <stop offset="35%" stop-color="#d00000" stop-opacity="0.35"/>
        <stop offset="70%" stop-color="#6a040f" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#030101" stop-opacity="0"/>
      </radialGradient>
      <circle cx="100" cy="100" r="95" fill="url(#ar_neb)"/>

      <!-- Stars Background -->
      <g fill="#fff" opacity="0.8">
        <circle cx="30" cy="35" r="1"/><circle cx="170" cy="45" r="1.3"/><circle cx="160" cy="140" r="0.9"/>
        <circle cx="40" cy="150" r="1.2"/><circle cx="95" cy="20" r="1.4"/><circle cx="130" cy="25" r="0.8"/>
        <circle cx="70" cy="175" r="1"/><circle cx="145" cy="170" r="1.1"/><circle cx="25" cy="95" r="0.8"/>
      </g>

      <!-- Constellation Filaments (Hamal & Sheratan) -->
      <path d="M45,75 L80,55 L130,62 L165,85" stroke="rgba(255,183,3,0.45)" stroke-width="1" fill="none" stroke-dasharray="2,2"/>
      <circle cx="80" cy="55" r="2.5" fill="#fff" filter="url(#glow)"/>
      <circle cx="130" cy="62" r="3" fill="#ffb703" filter="url(#glow)"/>

      <!-- Cosmic Ram Art -->
      <g filter="url(#glow)">
        <!-- Horn Left Spiral -->
        <path d="M96,72 C78,40 32,38 30,78 C28,110 65,122 80,102 C88,90 86,78 76,74 C66,70 52,78 55,90 C58,100 70,102 76,92" fill="none" stroke="url(#gold_grad)" stroke-width="5.5" stroke-linecap="round"/>
        <path d="M96,72 C80,45 42,42 40,76 C38,102 68,112 80,96" fill="none" stroke="#ff5e00" stroke-width="2.5" stroke-linecap="round"/>

        <!-- Horn Right Spiral -->
        <path d="M104,72 C122,40 168,38 170,78 C172,110 135,122 120,102 C112,90 114,78 124,74 C134,70 148,78 145,90 C142,100 130,102 124,92" fill="none" stroke="url(#gold_grad)" stroke-width="5.5" stroke-linecap="round"/>
        <path d="M104,72 C120,45 158,42 160,76 C162,102 132,112 120,96" fill="none" stroke="#ff5e00" stroke-width="2.5" stroke-linecap="round"/>

        <!-- Ram Face & Forehead Crown -->
        <path d="M92,72 L108,72 L105,108 C105,124 100,138 100,140 C100,138 95,124 95,108 Z" fill="#ff5e00" opacity="0.85"/>
        <path d="M94,76 L106,76 L103,105 C103,118 100,130 100,132 C100,130 97,118 97,105 Z" fill="url(#gold_grad)"/>
        
        <!-- Glowing Eyes -->
        <circle cx="91" cy="94" r="2.2" fill="#fff" filter="url(#glow)"/>
        <circle cx="109" cy="94" r="2.2" fill="#fff" filter="url(#glow)"/>
        
        <!-- Muzzle / Nose Bridge -->
        <ellipse cx="100" cy="132" rx="6" ry="4" fill="#1e0802" stroke="url(#gold_grad)" stroke-width="1.2"/>
        <line x1="97" y1="132" x2="103" y2="132" stroke="#ffb703" stroke-width="1"/>

        <!-- Forehead Diamond Star -->
        <polygon points="100,74 103,84 108,86 103,88 100,98 97,88 92,86 97,84" fill="#fff" filter="url(#glow)"/>
      </g>
    `
  },
  taurus: {
    name: "TAURUS",
    sanskrit: "VRISHABHA · TAURUS",
    glyph: "♉",
    color1: "#10b981",
    color2: "#34d399",
    color3: "#047857",
    bg1: "#021a12",
    bg2: "#010a07",
    svgContent: `
      <!-- Taurus Emerald Nebula -->
      <radialGradient id="ta_neb" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#10b981" stop-opacity="0.5"/>
        <stop offset="40%" stop-color="#065f46" stop-opacity="0.35"/>
        <stop offset="75%" stop-color="#022c22" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#010a07" stop-opacity="0"/>
      </radialGradient>
      <circle cx="100" cy="100" r="95" fill="url(#ta_neb)"/>

      <!-- Stars & Pleiades Cluster -->
      <g fill="#fff" opacity="0.85">
        <circle cx="62" cy="50" r="1.3"/><circle cx="66" cy="48" r="1"/><circle cx="70" cy="52" r="1.2"/>
        <circle cx="64" cy="55" r="0.9"/><circle cx="69" cy="57" r="1.4"/><circle cx="74" cy="54" r="1.1"/>
        <circle cx="165" cy="40" r="1"/><circle cx="35" cy="145" r="1.2"/><circle cx="160" cy="150" r="1.4"/>
      </g>

      <!-- Aldebaran Red Giant Diamond -->
      <g transform="translate(132, 72)" filter="url(#glow)">
        <polygon points="0,-7 2,-2 7,0 2,2 0,7 -2,2 -7,0 -2,-2" fill="#fff"/>
        <circle cx="0" cy="0" r="2.5" fill="#f59e0b"/>
      </g>

      <!-- Celestial Cosmic Bull -->
      <g filter="url(#glow)">
        <!-- Sweeping Emerald Horns -->
        <path d="M42,50 C48,84 76,96 98,96 C120,96 148,84 154,50 C142,58 128,68 98,68 C68,68 54,58 42,50 Z" fill="url(#gold_grad)"/>
        <path d="M46,54 C54,80 78,90 98,90 C118,90 142,80 150,54" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round"/>

        <!-- Bull Head & Forehead Crest -->
        <ellipse cx="98" cy="116" rx="28" ry="26" fill="#032b1f" stroke="url(#gold_grad)" stroke-width="2"/>
        <circle cx="98" cy="116" r="16" fill="#01140e" stroke="#10b981" stroke-width="1.5"/>

        <!-- Glowing Eyes -->
        <ellipse cx="84" cy="112" rx="3.5" ry="2" fill="#fff" filter="url(#glow)"/>
        <ellipse cx="112" cy="112" rx="3.5" ry="2" fill="#fff" filter="url(#glow)"/>

        <!-- Snout Ring -->
        <ellipse cx="98" cy="132" rx="8" ry="5" fill="#021a12" stroke="url(#gold_grad)" stroke-width="1.2"/>
        <path d="M93,134 C93,142 103,142 103,134" fill="none" stroke="url(#gold_grad)" stroke-width="2"/>

        <!-- Star of Taurus -->
        <polygon points="98,104 101,111 108,114 101,117 98,124 95,117 88,114 95,111" fill="url(#gold_grad)"/>
      </g>
    `
  },
  gemini: {
    name: "GEMINI",
    sanskrit: "MITHUNA · GEMINI",
    glyph: "♊",
    color1: "#38bdf8",
    color2: "#818cf8",
    color3: "#a855f7",
    bg1: "#060d26",
    bg2: "#02040e",
    svgContent: `
      <!-- Gemini Electric Nebula -->
      <radialGradient id="ge_neb" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.5"/>
        <stop offset="45%" stop-color="#6366f1" stop-opacity="0.35"/>
        <stop offset="80%" stop-color="#2e1065" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#02040e" stop-opacity="0"/>
      </radialGradient>
      <circle cx="100" cy="100" r="95" fill="url(#ge_neb)"/>

      <!-- Twin Star Castor & Pollux Diamonds -->
      <g transform="translate(76, 50)" filter="url(#glow)">
        <polygon points="0,-7 2,-2 7,0 2,2 0,7 -2,2 -7,0 -2,-2" fill="#fff"/>
        <circle cx="0" cy="0" r="2.5" fill="#38bdf8"/>
      </g>
      <g transform="translate(124, 50)" filter="url(#glow)">
        <polygon points="0,-7 2,-2 7,0 2,2 0,7 -2,2 -7,0 -2,-2" fill="#fff"/>
        <circle cx="0" cy="0" r="2.5" fill="#f59e0b"/>
      </g>

      <!-- Celestial Twins Art -->
      <g filter="url(#glow)">
        <!-- Twin Silhouette Left -->
        <path d="M76,60 C68,60 62,68 62,78 C62,88 68,96 74,98 L70,140 L84,140 L80,98 C86,96 90,88 90,78 C90,68 84,60 76,60 Z" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
        <circle cx="76" cy="74" r="7" fill="#38bdf8" opacity="0.8"/>

        <!-- Twin Silhouette Right -->
        <path d="M124,60 C116,60 110,68 110,78 C110,88 116,96 122,98 L118,140 L132,140 L128,98 C134,96 138,88 138,78 C138,68 132,60 124,60 Z" fill="none" stroke="#818cf8" stroke-width="2.5"/>
        <circle cx="124" cy="74" r="7" fill="#818cf8" opacity="0.8"/>

        <!-- Golden Harmony Orbits & Connecting Arcs -->
        <path d="M54,58 C80,68 120,68 146,58" stroke="url(#gold_grad)" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <path d="M54,142 C80,132 120,132 146,142" stroke="url(#gold_grad)" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <circle cx="100" cy="100" r="18" fill="none" stroke="url(#gold_grad)" stroke-width="1.5" stroke-dasharray="3,3"/>
        <circle cx="100" cy="100" r="5" fill="#fff" filter="url(#glow)"/>
      </g>
    `
  },
  cancer: {
    name: "CANCER",
    sanskrit: "KARKA · CANCER",
    glyph: "♋",
    color1: "#38bdf8",
    color2: "#0284c7",
    color3: "#60a5fa",
    bg1: "#031525",
    bg2: "#01070e",
    svgContent: `
      <!-- Cancer Lunar Oceanic Nebula -->
      <radialGradient id="ca_neb" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.5"/>
        <stop offset="40%" stop-color="#0369a1" stop-opacity="0.35"/>
        <stop offset="80%" stop-color="#0c2340" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#01070e" stop-opacity="0"/>
      </radialGradient>
      <circle cx="100" cy="100" r="95" fill="url(#ca_neb)"/>

      <!-- Cosmic Crab Artwork -->
      <g filter="url(#glow)">
        <!-- Carapace Body -->
        <ellipse cx="100" cy="104" rx="26" ry="20" fill="#04263e" stroke="url(#gold_grad)" stroke-width="2.5"/>
        <ellipse cx="100" cy="104" rx="18" ry="13" fill="#011524" stroke="#38bdf8" stroke-width="1.5"/>

        <!-- Pincers Left -->
        <path d="M76,96 C62,80 48,72 42,56 C38,72 52,86 66,94" fill="url(#gold_grad)" stroke="#38bdf8" stroke-width="1.5"/>
        <path d="M42,56 C50,54 58,62 64,74" fill="none" stroke="url(#gold_grad)" stroke-width="3" stroke-linecap="round"/>

        <!-- Pincers Right -->
        <path d="M124,96 C138,80 152,72 158,56 C162,72 148,86 134,94" fill="url(#gold_grad)" stroke="#38bdf8" stroke-width="1.5"/>
        <path d="M158,56 C150,54 142,62 136,74" fill="none" stroke="url(#gold_grad)" stroke-width="3" stroke-linecap="round"/>

        <!-- Walking Legs -->
        <path d="M78,110 Q58,118 48,134 M78,116 Q60,128 54,144 M80,122 Q66,138 64,152" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
        <path d="M122,110 Q142,118 152,134 M122,116 Q140,128 146,144 M120,122 Q134,138 136,152" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>

        <!-- Central Full Moon Pearl -->
        <circle cx="100" cy="104" r="6" fill="#fff" filter="url(#glow)"/>
      </g>
    `
  },
  leo: {
    name: "LEO",
    sanskrit: "SIMHA · LEO",
    glyph: "♌",
    color1: "#f59e0b",
    color2: "#f97316",
    color3: "#ef4444",
    bg1: "#240e02",
    bg2: "#0a0300",
    svgContent: `
      <!-- Leo Solar Fire Nebula -->
      <radialGradient id="le_neb" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.55"/>
        <stop offset="40%" stop-color="#dc2626" stop-opacity="0.38"/>
        <stop offset="80%" stop-color="#7c2d12" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#0a0300" stop-opacity="0"/>
      </radialGradient>
      <circle cx="100" cy="100" r="95" fill="url(#le_neb)"/>

      <!-- Regulus Star (Heart of the Lion) -->
      <g transform="translate(68, 96)" filter="url(#glow)">
        <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill="#fff"/>
        <circle cx="0" cy="0" r="2.8" fill="#f59e0b"/>
      </g>

      <!-- Majestic Cosmic Lion Profile & Mane -->
      <g filter="url(#glow)">
        <!-- Billowing Fiery Mane -->
        <path d="M68,110 C52,110 46,94 56,80 C68,64 84,54 104,54 C132,54 146,76 138,98 C130,120 112,134 122,148 C128,158 142,154 150,142 C152,138 158,142 154,150 C142,166 118,168 106,152 C94,136 110,116 116,98 C120,84 112,68 94,68 C80,68 70,78 66,90 C76,90 80,96 80,104 C80,112 74,114 68,110 Z" fill="#f97316" stroke="url(#gold_grad)" stroke-width="2"/>

        <!-- Flowing Flame Strands -->
        <path d="M104,56 C124,64 136,82 128,104 C122,120 110,132 116,146" fill="none" stroke="url(#gold_grad)" stroke-width="3" stroke-linecap="round"/>
        <path d="M84,66 C102,74 118,88 114,112" fill="none" stroke="#fef08a" stroke-width="2" stroke-linecap="round"/>

        <!-- Lion Eye & Brow -->
        <ellipse cx="68" cy="94" rx="3.5" ry="2" fill="#fff" filter="url(#glow)"/>
        <polygon points="100,74 104,84 112,86 104,88 100,98 96,88 88,86 96,84" fill="url(#gold_grad)"/>
      </g>
    `
  },
  virgo: {
    name: "VIRGO",
    sanskrit: "KANYA · VIRGO",
    glyph: "♍",
    color1: "#2dd4bf",
    color2: "#38bdf8",
    color3: "#f59e0b",
    bg1: "#06181d",
    bg2: "#010709",
    svgContent: `
      <!-- Virgo Starlight Nebula -->
      <radialGradient id="vi_neb" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#2dd4bf" stop-opacity="0.5"/>
        <stop offset="40%" stop-color="#0284c7" stop-opacity="0.35"/>
        <stop offset="80%" stop-color="#134e4a" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#010709" stop-opacity="0"/>
      </radialGradient>
      <circle cx="100" cy="100" r="95" fill="url(#vi_neb)"/>

      <!-- Spica Diamond Star (Alpha Virginis) -->
      <g transform="translate(68, 86)" filter="url(#glow)">
        <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill="#fff"/>
        <circle cx="0" cy="0" r="2.8" fill="#2dd4bf"/>
      </g>

      <!-- Celestial Maiden Profile & Golden Sheaf of Wheat -->
      <g filter="url(#glow)">
        <!-- Maiden Profile & Flowing Starlight Hair -->
        <path d="M102,56 C90,56 80,66 80,78 C80,88 88,96 96,98 L96,110 C84,116 70,126 68,144 L134,144 C132,126 118,116 106,110 L106,98 C114,96 122,88 122,78 C122,66 114,56 102,56 Z" fill="#042a34" stroke="url(#gold_grad)" stroke-width="2"/>
        <path d="M102,54 C116,54 130,66 134,84 C138,102 128,114 136,132" fill="none" stroke="#2dd4bf" stroke-width="3" stroke-linecap="round"/>

        <!-- Glowing Wheat Sheaf Branch -->
        <g transform="translate(64, 88) rotate(-22)">
          <path d="M10,48 Q12,22 15,0" stroke="url(#gold_grad)" stroke-width="2.5" fill="none"/>
          <ellipse cx="10" cy="12" rx="4" ry="7" fill="url(#gold_grad)" transform="rotate(-30 10 12)"/>
          <ellipse cx="18" cy="14" rx="4" ry="7" fill="url(#gold_grad)" transform="rotate(30 18 14)"/>
          <ellipse cx="11" cy="24" rx="4" ry="7" fill="url(#gold_grad)" transform="rotate(-30 11 24)"/>
          <ellipse cx="19" cy="26" rx="4" ry="7" fill="url(#gold_grad)" transform="rotate(30 19 26)"/>
          <ellipse cx="15" cy="0" rx="3.5" ry="6" fill="#fff"/>
        </g>
      </g>
    `
  },
  libra: {
    name: "LIBRA",
    sanskrit: "TULA · LIBRA",
    glyph: "♎",
    color1: "#ec4899",
    color2: "#a855f7",
    color3: "#c084fc",
    bg1: "#1d081b",
    bg2: "#080107",
    svgContent: `
      <!-- Libra Violet Starlight Nebula -->
      <radialGradient id="li_neb" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#ec4899" stop-opacity="0.48"/>
        <stop offset="45%" stop-color="#8b5cf6" stop-opacity="0.35"/>
        <stop offset="80%" stop-color="#4c1d95" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#080107" stop-opacity="0"/>
      </radialGradient>
      <circle cx="100" cy="100" r="95" fill="url(#li_neb)"/>

      <!-- Celestial Scales of Equilibrium -->
      <g filter="url(#glow)">
        <!-- Base Platform -->
        <path d="M50,144 L150,144" stroke="url(#gold_grad)" stroke-width="5" stroke-linecap="round"/>
        
        <!-- Central Pillar & Fulcrum -->
        <line x1="100" y1="56" x2="100" y2="144" stroke="url(#gold_grad)" stroke-width="4" stroke-linecap="round"/>
        <circle cx="100" cy="54" r="7" fill="#fff" filter="url(#glow)"/>

        <!-- Balance Beam -->
        <path d="M50,86 L150,86" stroke="url(#gold_grad)" stroke-width="5" stroke-linecap="round"/>
        <circle cx="50" cy="86" r="4" fill="#ec4899"/>
        <circle cx="150" cy="86" r="4" fill="#ec4899"/>

        <!-- Scale Pan Left Strings & Pan -->
        <line x1="50" y1="86" x2="36" y2="114" stroke="#c084fc" stroke-width="1.5"/>
        <line x1="50" y1="86" x2="64" y2="114" stroke="#c084fc" stroke-width="1.5"/>
        <path d="M34,114 C34,124 66,124 66,114 Z" fill="#ec4899" opacity="0.8" stroke="url(#gold_grad)" stroke-width="1.5"/>

        <!-- Scale Pan Right Strings & Pan -->
        <line x1="150" y1="86" x2="136" y2="114" stroke="#c084fc" stroke-width="1.5"/>
        <line x1="150" y1="86" x2="164" y2="114" stroke="#c084fc" stroke-width="1.5"/>
        <path d="M134,114 C134,124 166,124 166,114 Z" fill="#ec4899" opacity="0.8" stroke="url(#gold_grad)" stroke-width="1.5"/>
      </g>
    `
  },
  scorpio: {
    name: "SCORPIO",
    sanskrit: "VRISCHIKA · SCORPIO",
    glyph: "♏",
    color1: "#f43f5e",
    color2: "#d946ef",
    color3: "#e11d48",
    bg1: "#1a0520",
    bg2: "#07010d",
    svgContent: `
      <!-- Scorpio Crimson & Amethyst Nebula -->
      <radialGradient id="sc_neb" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.5"/>
        <stop offset="40%" stop-color="#9333ea" stop-opacity="0.35"/>
        <stop offset="80%" stop-color="#4c0519" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#07010d" stop-opacity="0"/>
      </radialGradient>
      <circle cx="100" cy="100" r="95" fill="url(#sc_neb)"/>

      <!-- Antares Diamond Heart Star -->
      <g transform="translate(94, 100)" filter="url(#glow)">
        <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill="#ffedd5"/>
        <circle cx="0" cy="0" r="2.8" fill="#f43f5e"/>
      </g>

      <!-- Cosmic Scorpion Artwork -->
      <g filter="url(#glow)">
        <!-- Curved Arching Tail -->
        <path d="M96,118 C112,122 138,124 146,108 C152,94 142,78 132,74 C122,70 120,78 126,84 C132,90 138,98 130,106 C124,114 108,112 96,108" fill="none" stroke="url(#gold_grad)" stroke-width="4.5" stroke-linecap="round"/>
        <circle cx="126" cy="84" r="5" fill="#f43f5e"/>
        <path d="M126,80 Q130,68 118,64 Q123,72 124,80 Z" fill="url(#gold_grad)"/>
        <circle cx="118" cy="64" r="2" fill="#fff"/>

        <!-- Carapace Body -->
        <ellipse cx="90" cy="98" rx="14" ry="18" fill="#e11d48" stroke="url(#gold_grad)" stroke-width="2" transform="rotate(-15 90 98)"/>
        <ellipse cx="89" cy="96" rx="9" ry="12" fill="#1a0520" opacity="0.6" transform="rotate(-15 89 96)"/>

        <!-- Pincers Left -->
        <path d="M82,84 C74,74 58,72 50,64 C46,58 50,50 58,54" fill="none" stroke="url(#gold_grad)" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M50,64 C42,60 40,48 46,42 C48,46 54,52 56,56 Z" fill="#f43f5e" stroke="url(#gold_grad)" stroke-width="1.2"/>

        <!-- Pincers Right -->
        <path d="M94,80 C102,70 116,66 126,56 C130,52 126,44 118,46" fill="none" stroke="url(#gold_grad)" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M126,56 C134,52 136,40 130,34 C128,38 122,44 120,48 Z" fill="#f43f5e" stroke="url(#gold_grad)" stroke-width="1.2"/>
      </g>
    `
  },
  sagittarius: {
    name: "SAGITTARIUS",
    sanskrit: "DHANU · SAGITTARIUS",
    glyph: "♐",
    color1: "#f59e0b",
    color2: "#d97706",
    color3: "#b45309",
    bg1: "#1d1004",
    bg2: "#070301",
    svgContent: `
      <!-- Sagittarius Golden Fire Nebula -->
      <radialGradient id="sa_neb" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.5"/>
        <stop offset="40%" stop-color="#b45309" stop-opacity="0.35"/>
        <stop offset="80%" stop-color="#451a03" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#070301" stop-opacity="0"/>
      </radialGradient>
      <circle cx="100" cy="100" r="95" fill="url(#sa_neb)"/>

      <!-- Drawn Cosmic Bow & Glowing Arrow -->
      <g filter="url(#glow)">
        <!-- Golden Bow Arc -->
        <path d="M50,60 C90,80 120,110 140,150" fill="none" stroke="url(#gold_grad)" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M54,64 C90,82 118,110 136,146" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>

        <!-- Bow String -->
        <line x1="50" y1="60" x2="100" y2="100" stroke="#ffedd5" stroke-width="1.2"/>
        <line x1="100" y1="100" x2="140" y2="150" stroke="#ffedd5" stroke-width="1.2"/>

        <!-- Celestial Arrow -->
        <line x1="60" y1="140" x2="146" y2="54" stroke="url(#gold_grad)" stroke-width="5" stroke-linecap="round"/>
        <polygon points="146,46 156,70 130,80" fill="url(#gold_grad)"/>
        <polygon points="148,48 154,66 134,74" fill="#fff"/>

        <!-- Arrow Feathers (Fletching) -->
        <line x1="62" y1="138" x2="52" y2="134" stroke="url(#gold_grad)" stroke-width="2.5"/>
        <line x1="66" y1="142" x2="62" y2="152" stroke="url(#gold_grad)" stroke-width="2.5"/>

        <!-- Center Energy Knot -->
        <circle cx="100" cy="100" r="5" fill="#fff" filter="url(#glow)"/>
      </g>
    `
  },
  capricorn: {
    name: "CAPRICORN",
    sanskrit: "MAKARA · CAPRICORN",
    glyph: "♑",
    color1: "#3b82f6",
    color2: "#60a5fa",
    color3: "#1d4ed8",
    bg1: "#061328",
    bg2: "#01060f",
    svgContent: `
      <!-- Capricorn Deep Ocean Abyss Nebula -->
      <radialGradient id="cp_neb" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.5"/>
        <stop offset="40%" stop-color="#1e3a8a" stop-opacity="0.35"/>
        <stop offset="80%" stop-color="#0f172a" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#01060f" stop-opacity="0"/>
      </radialGradient>
      <circle cx="100" cy="100" r="95" fill="url(#cp_neb)"/>

      <!-- Celestial Sea-Goat Artwork -->
      <g filter="url(#glow)">
        <!-- Goat Horns & Head Arc -->
        <path d="M52,76 C52,58 68,52 78,68 L98,108 L118,70 C128,52 144,58 144,76 C144,96 126,114 116,132 C108,146 120,156 132,148 C140,142 140,130 130,128 C122,126 116,134 122,140" fill="none" stroke="url(#gold_grad)" stroke-width="5" stroke-linecap="round"/>
        <path d="M56,76 C56,62 68,58 76,70 L98,104 L120,72 C128,58 140,62 140,76" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round"/>

        <!-- Sea-Goat Eye & Crest -->
        <circle cx="78" cy="68" r="4.5" fill="#fff" filter="url(#glow)"/>
        <polygon points="98,96 102,104 108,106 102,108 98,116 94,108 88,106 94,104" fill="url(#gold_grad)"/>
      </g>
    `
  },
  aquarius: {
    name: "AQUARIUS",
    sanskrit: "KUMBHA · AQUARIUS",
    glyph: "♒",
    color1: "#06b6d4",
    color2: "#38bdf8",
    color3: "#0284c7",
    bg1: "#041b24",
    bg2: "#01070a",
    svgContent: `
      <!-- Aquarius Electric Stream Nebula -->
      <radialGradient id="aq_neb" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.5"/>
        <stop offset="40%" stop-color="#0284c7" stop-opacity="0.35"/>
        <stop offset="80%" stop-color="#083344" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#01070a" stop-opacity="0"/>
      </radialGradient>
      <circle cx="100" cy="100" r="95" fill="url(#aq_neb)"/>

      <!-- Water-Bearer Celestial Urn & Cascading Starlight Waves -->
      <g filter="url(#glow)">
        <!-- Cascading Wave Top -->
        <path d="M48,78 L64,66 L80,78 L96,66 L112,78 L128,66 L144,78 L154,70" fill="none" stroke="url(#gold_grad)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M48,78 L64,66 L80,78 L96,66 L112,78 L128,66 L144,78 L154,70" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

        <!-- Cascading Wave Bottom -->
        <path d="M48,114 L64,102 L80,114 L96,102 L112,114 L128,102 L144,114 L154,106" fill="none" stroke="#06b6d4" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M48,114 L64,102 L80,114 L96,102 L112,114 L128,102 L144,114 L154,106" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

        <!-- Celestial Cosmic Urn -->
        <ellipse cx="100" cy="46" rx="14" ry="9" fill="#042735" stroke="url(#gold_grad)" stroke-width="2"/>
        <circle cx="100" cy="46" r="4" fill="#fff" filter="url(#glow)"/>
        <circle cx="100" cy="144" r="4.5" fill="url(#gold_grad)"/>
      </g>
    `
  },
  pisces: {
    name: "PISCES",
    sanskrit: "MEENA · PISCES",
    glyph: "♓",
    color1: "#38bdf8",
    color2: "#c084fc",
    color3: "#6366f1",
    bg1: "#0f0826",
    bg2: "#03010c",
    svgContent: `
      <!-- Pisces Cosmic Ocean Nebula -->
      <radialGradient id="pi_neb" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.5"/>
        <stop offset="40%" stop-color="#8b5cf6" stop-opacity="0.35"/>
        <stop offset="80%" stop-color="#31104b" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#03010c" stop-opacity="0"/>
      </radialGradient>
      <circle cx="100" cy="100" r="95" fill="url(#pi_neb)"/>

      <!-- Twin Cosmic Koi Swimming in Samsara Loop -->
      <g filter="url(#glow)">
        <!-- Fish Left Arc -->
        <path d="M68,54 C48,74 48,126 68,146" fill="none" stroke="url(#gold_grad)" stroke-width="6" stroke-linecap="round"/>
        <path d="M72,54 C54,74 54,126 72,146" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
        <polygon points="68,54 56,44 76,42" fill="url(#gold_grad)"/>
        <circle cx="66" cy="52" r="2" fill="#fff"/>

        <!-- Fish Right Arc -->
        <path d="M132,54 C152,74 152,126 132,146" fill="none" stroke="url(#gold_grad)" stroke-width="6" stroke-linecap="round"/>
        <path d="M128,54 C146,74 146,126 128,146" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round"/>
        <polygon points="132,146 122,158 142,156" fill="url(#gold_grad)"/>
        <circle cx="134" cy="148" r="2" fill="#fff"/>

        <!-- Connecting Cosmic Starlight Cord -->
        <line x1="50" y1="100" x2="150" y2="100" stroke="#e0e7ff" stroke-width="4" stroke-linecap="round"/>
        <circle cx="100" cy="100" r="6" fill="#fff" filter="url(#glow)"/>
      </g>
    `
  }
};

function generateSvg(signKey, data) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <radialGradient id="bg_grad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${data.bg1}"/>
      <stop offset="85%" stop-color="${data.bg2}"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
    <linearGradient id="gold_grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#fde047"/>
      <stop offset="60%" stop-color="#eab308"/>
      <stop offset="85%" stop-color="#ca8a04"/>
      <stop offset="100%" stop-color="#fff8db"/>
    </linearGradient>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feDropShadow dx="0" dy="0" stdDeviation="3.5" flood-color="${data.color1}" flood-opacity="0.75"/>
    </filter>
  </defs>

  <!-- Deep Cosmic Background -->
  <circle cx="100" cy="100" r="98" fill="url(#bg_grad)"/>

  <!-- Celestial Orbit & Astrological Rings -->
  <circle cx="100" cy="100" r="95" fill="none" stroke="url(#gold_grad)" stroke-width="2"/>
  <circle cx="100" cy="100" r="91" fill="none" stroke="url(#gold_grad)" stroke-width="0.75" stroke-dasharray="2,3" opacity="0.8"/>
  <circle cx="100" cy="100" r="86" fill="none" stroke="${data.color1}" stroke-width="0.6" stroke-dasharray="4,6" opacity="0.6"/>

  ${data.svgContent}

  <!-- Astrological Glyph Crest at Top -->
  <g transform="translate(100, 26)">
    <circle cx="0" cy="0" r="9" fill="${data.bg1}" stroke="url(#gold_grad)" stroke-width="1"/>
    <text x="0" y="4" text-anchor="middle" font-family="'Cinzel', serif" font-size="11" font-weight="700" fill="${data.color1}">${data.glyph}</text>
  </g>

  <!-- Name Label at Bottom -->
  <text x="100" y="186" text-anchor="middle" font-family="'Cinzel', 'Marcellus', serif" font-size="9" font-weight="700" fill="url(#gold_grad)" letter-spacing="2">${data.sanskrit}</text>
</svg>`;
}

const outDir = path.join(__dirname, '..', 'public', 'images', 'zodiac');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const embeddedMap = {};

for (const [key, data] of Object.entries(signs)) {
  const svg = generateSvg(key, data);
  const filePath = path.join(outDir, `${key}.svg`);
  fs.writeFileSync(filePath, svg, 'utf-8');
  embeddedMap[key] = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  console.log(`Generated: ${filePath}`);
}

// Update index.html embedded map
const indexPath = path.join(__dirname, '..', 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf-8');

const startMarker = "window.ZODIAC_EMBEDDED_SVGS = ";
const startIndex = indexHtml.indexOf(startMarker);
if (startIndex !== -1) {
  const jsonStart = startIndex + startMarker.length;
  // Find where the object ends (look for `;\n  const ZODIAC` or similar)
  const endMarker = ";\n  const ZODIAC =";
  const endIndex = indexHtml.indexOf(endMarker, jsonStart);
  if (endIndex !== -1) {
    const newJson = JSON.stringify(embeddedMap, null, 2);
    indexHtml = indexHtml.substring(0, jsonStart) + newJson + indexHtml.substring(endIndex);
    fs.writeFileSync(indexPath, indexHtml, 'utf-8');
    console.log("Successfully updated window.ZODIAC_EMBEDDED_SVGS in index.html!");
  } else {
    console.warn("Could not find endMarker in index.html");
  }
} else {
  console.warn("Could not find startMarker in index.html");
}
