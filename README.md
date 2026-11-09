<<<<<<< HEAD
# SOLARA — Interactive Solar System

A premium educational Solar System experience built with **only HTML, CSS and vanilla JavaScript**.

## Included experiences
- Three.js 3D Solar System with CSS-orbit fallback, hover/tap previews, and camera focus
- Procedural planet surfaces, a subtle layered starfield, solar corona, selective atmospheric rims, and textured Saturn rings
- Reusable planet explorer with Overview, Structure, Atmosphere, and Moons sections
- Structured planet, layer, atmosphere, and moon data in `js/planet-data.js`
- Hover/focus planet information and click-to-explore behavior
- Reduced-motion support and keyboard-accessible planet-strip selection
- Detailed planet profiles
- Interactive internal-layer explorer
- Chronological missions and discoveries archive with combined agency, destination and category filters
- Structured mission and discovery records in `js/missions-data.js` with keyboard-selectable timeline details
- Planet Lab with selectable planet pairs, category-based scientific comparisons, explicit text labels for value differences, relative-size illustrations, and deterministic insights scoped to the selected category
- Shared numeric comparison measurements in `js/planet-data.js`, attributed to the NASA NSSDCA Planetary Fact Sheet with equatorial-diameter and 1-bar giant-planet conventions noted in the interface
- Solar quiz and planet-order puzzle
- Responsive layout and mobile-friendly tap interactions
- Optional lightweight sound feedback
- Dark, premium UI inspired by the visual direction of the supplied reference ZIP

## Run
Open `index.html` in a modern browser. Three.js is loaded from a CDN; when it or WebGL is unavailable, the CSS orbital model remains available.

No build step and no framework are required.

## Planet Lab data

The Planet Lab reuses the shared planet records rather than duplicating facts. Its numeric comparison values are based on the [NASA NSSDCA Planetary Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/). Diameter comparisons use equatorial diameter; giant-planet gravity and mean temperature refer to the 1-bar level. Values are approximate and rounded for display. Jupiter and Saturn moon counts are explicitly treated as lower bounds, so the interface avoids asserting an ordering when the available counts cannot support one.

The relative-size artwork is an educational illustration, not a scale model. Comparison insights are generated locally from the structured values and only summarize the active category; atmosphere comparisons remain qualitative when standardized numeric measures are unavailable. No AI service or additional rendering library is used.
=======
# Solaras
an interactive web application to learn about our space
>>>>>>> origin/main
