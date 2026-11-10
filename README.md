# SOLARA — Interactive Solar System

A premium educational Solar System experience built with **HTML, CSS and vanilla JavaScript**.

## Included experiences

- Three.js Solar System with a CSS-orbit fallback, planet hover and selection, and camera focus
- Planet Explorer with overview, structure, atmosphere, and moon sections
- Missions and Discoveries archive with agency, destination, and category filters
- Planet Lab with visual comparison, scientific categories, difference highlighting, and a deterministic insight engine
- SOLARA Space Challenges: a difficulty-based knowledge quiz and an accessible planet-order puzzle
- Optional sound feedback, a reduced-motion-aware planetary rotation control, keyboard navigation, and responsive layouts

## Space Challenges

The Knowledge Quiz offers Explorer, Navigator, and Astronomer levels with structured, deterministic questions based on the shared planet data in `js/planet-data.js`. It provides one question at a time, progress and score feedback, explanations, results, and replay controls.

The Orbit Puzzle asks learners to order the eight planets outward from the Sun. Each planet has keyboard-accessible Move Up and Move Down controls, so no drag-and-drop interaction is required. Learners can check their order, review misplaced planets, retry, or restart.

Challenge best scores, answer accuracy, completed quizzes, and puzzle completions are saved locally in the browser. The challenges continue to work if browser storage is unavailable. Sound is off until enabled and uses the existing site-wide sound control.

The Solar System animation respects the operating system’s reduced-motion preference. Use the **Start rotation** control to explicitly enable orbit animation when reduced motion is active; the **Pause rotation** control is available whenever the animation is running.

## Run

Open `index.html` in a modern browser. Three.js is loaded from a CDN; when it or WebGL is unavailable, the CSS orbital model remains available. No build step or framework is required.

## Performance and resilience

The Three.js scene renders continuously only while rotation is enabled or a camera transition is in progress. Otherwise it renders on demand after interaction or resizing. Rendering pauses when the tab is hidden or another major page is active, and resumes when the Solar System returns. A `ResizeObserver` keeps the canvas sized to its stage, with a window-resize fallback; the pixel ratio is capped at 1.5 and reduced on narrow stages.

If WebGL cannot initialize or its context is lost, the accessible CSS Solar System remains available. Challenge progress uses guarded local storage and falls back to visit-only progress; sound remains optional and does not gate challenge interactions. Scene geometry, materials and textures are disposed when the renderer is explicitly disposed.

## Planet Lab data

## Scientific data and validation

`js/planet-data.js` is the canonical source for the eight planets, their display order, and the Planet Lab numeric metrics: equatorial diameter (`diameterKm`), equatorial gravity (`gravityMps2`), mean temperature (`meanTemperatureC`), average solar distance (`distanceMillionKm`), orbital period (`orbitalPeriodDays`), sidereal rotation period (`rotationPeriodHours`), and known moon count (`moonCount`). Planet Explorer and Planet Lab format those same values through shared helpers; factual quiz questions that compare measurements derive their options and answers from them. Curated questions remain for concepts and descriptions.

Comparison values are approximate and based on the [NASA NSSDCA Planetary Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/). Giant-planet gravity and mean temperature refer to the 1-bar level. Shared formatters keep units consistent across the Explorer, Lab, and quiz.

Jupiter and Saturn moon counts are marked as minimums, not exact totals. The Explorer labels them “At least … known moons,” and the comparison logic avoids drawing unsupported conclusions from lower bounds. Other moon counts are the known counts represented by this data snapshot; they may change as discoveries are confirmed.

`js/missions-data.js` stores mission and discovery records. Related discoveries reference missions by stable ID rather than display name. Lightweight validators check required planet fields and numeric metrics, quiz structure and answer indexes, and mission IDs, years, categories, targets, agency groups, and related-mission references. They log actionable errors on local files and localhost during development, but do not prevent the application from rendering.

Scientific content is intentionally a concise educational snapshot, not a live ephemeris or research database. Planet temperatures summarize values with differing measurement contexts; the 1-bar note applies to giant planets. Mean distances and periods are rounded, planetary structure descriptions include unresolved scientific models, and moon counts can become outdated. The relative-size artwork is illustrative rather than to scale; insight comparisons are deterministic, and atmospheres remain qualitative where standardized numeric measures are unavailable.
