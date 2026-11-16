# SOLARA — Interactive Solar System

<<<<<<< HEAD
SOLARA is a static astronomy learning website built with HTML, CSS, vanilla JavaScript, and Three.js. It requires no build step, backend, database, or Node.js runtime in production.
=======
SOLARA is a responsive astronomy learning experience built with HTML, CSS, vanilla JavaScript, and Three.js. It runs without a build step or application framework.

## Run the application

Open `index.html` in a modern browser. Three.js is loaded from jsDelivr; if the library or WebGL is unavailable, the interactive CSS Solar System remains available. The 3D view announces initialization, switches to the CSS model after a failure or timeout, and offers a retry control.

## Application architecture

- `index.html` defines the shared page structure and loads the classic scripts in dependency order.
- `styles.css` contains the visual system, responsive layouts, reduced-motion rules, and CSS Solar System fallback.
- `js/planet-data.js` is the canonical source for planet facts, planet order, numeric comparison values, shared formatters, and planet-data validation.
- `js/missions-data.js` contains mission and discovery records, stable related-mission IDs, and record validation.
- `js/solar-system.js` owns the Three.js scene, procedural canvas textures, camera focus, event-driven rendering, resize and visibility handling, reduced-motion behavior, and scene cleanup.
- `app.js` connects navigation, the Solar System, Planet Explorer, mission archive, Planet Lab, and shared sound controls.
- `js/space-challenges.js` provides the difficulty-based knowledge quiz, keyboard-operated orbit-order puzzle, progress display, question validation, and guarded local-storage persistence.
>>>>>>> 6e4c19a098716dbfc3b6ed685d09ec2d222ffd13

## Technology and dependencies

<<<<<<< HEAD
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
=======
- Solar System exploration with planet selection, hover previews, camera focus, an accessible CSS fallback, and a user-controlled rotation toggle.
- Planet Explorer with overview, interactive internal layers, atmosphere, and moon information.
- Mission and discovery timeline with combined agency, destination, and event-type filters and selected-event details.
- Planet Lab with selectable planet pairs, educational size illustrations, five scientific comparison categories, difference labels, and deterministic insights.
- Knowledge Quiz with Explorer, Navigator, and Astronomer difficulties; explanations, results, and replay.
- Orbit Puzzle with keyboard-accessible move controls, progress feedback, validation, and recovery actions.
- Optional sound feedback, persistent challenge progress where browser storage permits, and responsive navigation.

## Scientific data

Planet Lab, the Explorer, and data-driven quiz questions reuse the shared records in `js/planet-data.js`; planet facts are not maintained in a separate comparison dataset. Approximate numeric measurements are based on the [NASA NSSDCA Planetary Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/). The shared metadata documents equatorial diameter, 1-bar giant-planet measurements, and sidereal rotation conventions.

Jupiter and Saturn moon counts are minimum known counts, not exact totals; comparisons avoid claiming an ordering when both values are lower bounds. Atmosphere comparisons remain qualitative. Planet illustrations are educational visuals, not scale models. Data validators report malformed planet, mission, and quiz records to the development console.

## Resilience and accessibility

Challenge progress is stored under `solara.spaceChallenges.progress.v1`. If local storage is unavailable or invalid, challenges continue for the current visit and the interface explains that progress will not persist. Sound is opt-in and does not gate other interactions.

The Solar System renders continuously only while rotation or a camera transition is active; it otherwise renders on demand and pauses when hidden or inactive. Canvas pixel ratio is capped, and scene resources are disposed when the renderer is closed. Keyboard focus, live announcements, reduced-motion preferences, and mobile layouts are supported throughout.

## Known limitations

Three.js requires a network connection to load from the CDN. Scientific values and moon counts are an approximate, curated data snapshot rather than live ephemerides; their sources and measurement conventions are shown in the Planet Lab.
>>>>>>> 6e4c19a098716dbfc3b6ed685d09ec2d222ffd13
