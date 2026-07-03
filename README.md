# CSS Wrapped 2025

<div align="center">

**21 novelties. 21 days. 21 videos.**

Discover the 21 most important CSS novelties of 2025, explained in short, practical, straight-to-the-point videos.
Over 21 days 📅 we explore one new feature each day, with clear examples and real-world application in modern web development projects.

Perfect for frontend devs who want to stay up to date 🚀 and master the latest that CSS has to offer.

</div>

---

## About the project

`CSS Wrapped 2025` is a series of 21 mini-demos in plain HTML, CSS and JS, one for each CSS novelty.
Each day lives in its own folder (`day-01`, `day-02`, … `day-21`) with its own `index.html`, `style.css` and `script.js`, so each feature can be explored in isolation and easily reproduced.

```
_CSSWrapped2025/
├── index.html            # landing page with the interactive table of contents
├── css/style.css         # shared site styles
├── js/main.js            # shared site script
├── day-01/ … day-21/     # one folder per CSS novelty
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md
```

---

## Table of contents

<div align="center">

| 📅 Day | ✨ CSS Novelty | Status |
|:---:|---|:---:|
| 🗓️ **01** | [Invoker Commands](./day-01/index.html) | ✅ Available |
| 🗓️ **02** | [Dialog Light Dismiss (`<dialog closedby>`)](./day-02/index.html) | ✅ Available |
| 🗓️ **03** | [Customizable `<select>`](./day-03/index.html) | ✅ Available |
| 🗓️ **04** | [`::scroll-marker` / `::scroll-button()`](./day-04/index.html) | ✅ Available |
| 🗓️ **05** | [`scroll-target-group`](./day-05/index.html) | ✅ Available |
| 🗓️ **06** | [CSS Anchor Positioning](./day-06/index.html) | ⏳ Coming soon |
| 🗓️ **07** | [Popover API and `[popover]`](./day-07/index.html) | ⏳ Coming soon |
| 🗓️ **08** | [Wide-gamut colors: `oklch()` and `oklab()`](./day-08/index.html) | ⏳ Coming soon |
| 🗓️ **09** | [`color-mix()` for blending colors](./day-09/index.html) | ⏳ Coming soon |
| 🗓️ **10** | [`@property`: typed custom properties](./day-10/index.html) | ⏳ Coming soon |
| 🗓️ **11** | [View Transitions API](./day-11/index.html) | ⏳ Coming soon |
| 🗓️ **12** | [`text-wrap: balance` and `pretty`](./day-12/index.html) | ⏳ Coming soon |
| 🗓️ **13** | [Scroll-driven animations](./day-13/index.html) | ⏳ Coming soon |
| 🗓️ **14** | [CSS Grid Subgrid](./day-14/index.html) | ⏳ Coming soon |
| 🗓️ **15** | [Individual transforms (`translate`, `scale`, `rotate`)](./day-15/index.html) | ⏳ Coming soon |
| 🗓️ **16** | [Nested selectors with `&`](./day-16/index.html) | ⏳ Coming soon |
| 🗓️ **17** | [`field-sizing` and modern forms](./day-17/index.html) | ⏳ Coming soon |
| 🗓️ **18** | [CSS Grid Masonry](./day-18/index.html) | ⏳ Coming soon |
| 🗓️ **19** | [Trigonometric and exponential functions (`sin`, `cos`, `pow`)](./day-19/index.html) | ⏳ Coming soon |
| 🗓️ **20** | [`scroll-timeline` and progress bars](./day-20/index.html) | ⏳ Coming soon |
| 🗓️ **21** | [Container units (`cqw`, `cqh`, `cqi`)](./day-21/index.html) | ⏳ Coming soon |

</div>

> Rows are marked ✅ **Available** once that day's demo is built out; the rest are still ⏳ **Coming soon**.

---

## Run the demos locally

```bash
git clone https://github.com/CristianSifuentes/css-wrapped-2025.git
cd css-wrapped-2025
open index.html   # or serve it statically, e.g.: npx serve .
```

### Using live-server (recommended, with hot reload)

```bash
# Install live-server
npm install -g live-server

# Start live-server
live-server
```

Or, without a global install, via the npm scripts in this repo:

```bash
npm install
npm start
```

## Stack

- Semantic HTML5
- CSS3 (one demo per new 2025 feature)
- Vanilla JavaScript (no frameworks, no build step)

## Author

**Cristian Sifuentes** — [github.com/CristianSifuentes](https://github.com/CristianSifuentes)

---

<div align="center">

🌟 If you find this content useful, star the repo and follow along so you don't miss a single day.

</div>
