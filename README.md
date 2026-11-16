# SOLARA — Interactive Solar System

SOLARA is a static astronomy learning website built with HTML, CSS, vanilla JavaScript, and Three.js. It requires no build step, backend, database, or Node.js runtime in production.

## Technology and dependencies

- HTML, CSS, and browser-native JavaScript.
- Three.js 0.159.0, loaded on demand from jsDelivr for the interactive 3D Solar System.
- No package manager, framework, or build tool is required.
- If the CDN or WebGL is unavailable, SOLARA presents its CSS Solar System, explains the fallback, and allows the user to retry loading 3D.

## Project structure

```text
index.html               Single-page markup, metadata, and relative navigation
styles.css               Visual system, responsive layouts, and CSS fallback
app.js                   Navigation and application interactions
js/
  planet-data.js         Canonical planet facts and shared data validation
  missions-data.js       Mission and discovery records and validation
  solar-system.js        Three.js loader, renderer, and cleanup
  space-challenges.js    Quiz, orbit puzzle, and progress persistence
```

## Features

- Interactive 3D Solar System, CSS fallback, planet selection, and camera focus.
- Planet Explorer with interactive planetary layers, atmosphere, and moon information.
- Missions and Discoveries timeline with combined filters and event details.
- Planet Lab with five scientific comparison categories and deterministic insights.
- Difficulty-based Knowledge Quiz and keyboard-operated Orbit Puzzle.
- Optional sound, local progress storage, reduced-motion support, and responsive navigation.

## Run locally

Serve the project directory with any static file server and open its `index.html`. For example, with Python installed:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000/`. This command is a local preview option only; production hosting does not require Python or Node.js. Opening `index.html` directly may also work, but browser storage and WebGL behavior can vary for `file:` URLs.

## Static deployment

1. Upload the complete project, preserving the `js` directory and the relative paths shown above.
2. Configure the static host to serve `index.html` as the directory entry point.
3. Keep the site at its deployed directory path; assets and in-app navigation use relative script/style URLs and URL fragments, so a root-domain deployment is not required.
4. Enable HTTPS. WebGL and browser audio are subject to browser security and user-gesture policies; sound is opt-in.
5. No rewrite rules, server functions, environment variables, or build command are required.

The site has one HTML entry point. Sections and planet profiles are hash-addressable in-app routes, so refresh, direct links, and browser Back/Forward stay within that document.

## Scientific data

Planet Lab, the Explorer, and data-driven quiz questions reuse `js/planet-data.js`. Approximate numeric measurements are based on the [NASA NSSDCA Planetary Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/). Jupiter and Saturn moon counts are minimum known counts; the comparison avoids treating lower bounds as exact totals. Atmosphere comparisons are qualitative, and planet illustrations are educational, not scale models.

## Known limitations

The 3D experience requires access to jsDelivr and WebGL; the CSS Solar System remains available otherwise. Browser storage may be unavailable in private, restricted, or file-based contexts, in which case challenge progress lasts only for the current visit. Scientific values are a curated snapshot, not live ephemerides.
