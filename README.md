# SOLARA — Interactive Solar System

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

## Included experiences

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
