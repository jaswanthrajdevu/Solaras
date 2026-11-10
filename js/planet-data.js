window.SOLARA_PLANETS = {
  Sun: {
    type: 'star',
    tagline: 'The star at the heart of everything.',
    description: 'A giant sphere of hot plasma whose gravity holds the Solar System together and whose energy powers life on Earth.',
    facts: { Diameter: '1.39 million km', Temperature: '≈ 5,500°C surface', Type: 'G-type star', Age: '≈ 4.6 billion years' },
    layers: [
      { name: 'Photosphere', description: 'The visible layer from which most of the Sun’s light escapes.', composition: 'Hydrogen and helium with trace elements', temperature: '≈ 5,500°C', state: 'Plasma', depth: 'Visible surface' },
      { name: 'Convective zone', description: 'Hot plasma rises and cooler plasma sinks, transporting energy toward the surface.', composition: 'Ionized hydrogen and helium', temperature: '≈ 2 million°C near its base; cooler toward the surface', state: 'Plasma', depth: '≈ 70–100% of the solar radius' },
      { name: 'Radiative zone', description: 'Energy travels outward primarily through the absorption and re-emission of photons.', composition: 'Ionized hydrogen and helium', temperature: '≈ 2–7 million°C', state: 'Plasma', depth: '≈ 25–70% of the solar radius' },
      { name: 'Core', description: 'The central region where nuclear fusion converts hydrogen into helium.', composition: 'Hydrogen and helium plasma', temperature: '≈ 15 million°C', state: 'Plasma', depth: 'Centre to ≈ 25% of the solar radius' }
    ],
    atmosphere: { summary: 'The Sun’s atmosphere extends outward from its visible surface through the chromosphere and corona.', composition: ['Hydrogen', 'Helium', 'Trace heavier elements'] },
    moons: { count: 'Not applicable', summary: 'Natural satellites orbit planets and dwarf planets; this view does not list objects orbiting the Sun.', notable: [] }
  },
  Mercury: {
    type: 'rocky',
    tagline: 'Small, swift and scarred.',
    description: 'The closest planet to the Sun is a rocky world with extreme temperatures and a huge iron-rich core.',
    comparison: { diameterKm: 4879, gravityMps2: 3.7, meanTemperatureC: 167, distanceMillionKm: 57.9, orbitalPeriodDays: 88.0, rotationPeriodHours: 1407.6, moonCount: 0 },
    layers: [
      { name: 'Crust', description: 'An ancient, heavily cratered rocky surface records a long history of impacts.', composition: 'Silicate rock', temperature: null, state: 'Solid', depth: 'Surface layer' },
      { name: 'Mantle', description: 'A relatively thin silicate mantle surrounds the large core.', composition: 'Silicate rock', temperature: null, state: 'Solid rock', depth: null },
      { name: 'Core', description: 'Mercury has an unusually large metallic core beneath its rocky exterior.', composition: 'Primarily iron-rich metal', temperature: null, state: 'Metallic interior; exact state varies by region', depth: null }
    ],
    atmosphere: { summary: 'Mercury has an extremely thin exosphere, not a substantial atmosphere.', composition: ['Oxygen', 'Sodium', 'Hydrogen', 'Helium', 'Potassium'] },
    moons: { summary: 'Mercury has no known natural moons.', notable: [] }
  },
  Venus: {
    type: 'rocky',
    tagline: 'A beautiful world with a brutal atmosphere.',
    description: 'Venus is wrapped in dense carbon-dioxide clouds and is the hottest planet because of an intense greenhouse effect.',
    comparison: { diameterKm: 12104, gravityMps2: 8.9, meanTemperatureC: 464, distanceMillionKm: 108.2, orbitalPeriodDays: 224.7, rotationPeriodHours: -5832.5, moonCount: 0 },
    layers: [
      { name: 'Crust', description: 'Volcanic plains and other landforms cover the rocky surface.', composition: 'Silicate rock', temperature: '≈ 465°C at the surface', state: 'Solid', depth: 'Surface layer' },
      { name: 'Mantle', description: 'A thick rocky mantle makes up most of the planet’s interior.', composition: 'Silicate rock', temperature: null, state: 'Solid rock that may deform over geologic time', depth: null },
      { name: 'Core', description: 'Venus is expected to have a metallic core, though its detailed state is not fully known.', composition: 'Likely iron and nickel', temperature: null, state: 'Not fully determined', depth: null }
    ],
    atmosphere: { summary: 'A dense carbon-dioxide atmosphere drives an intense greenhouse effect; clouds contain sulfuric acid.', composition: ['Carbon dioxide (≈ 96.5%)', 'Nitrogen (≈ 3.5%)', 'Sulfur dioxide and other trace gases'] },
    moons: { summary: 'Venus has no known natural moons.', notable: [] }
  },
  Earth: {
    type: 'rocky',
    tagline: 'Our living blue world.',
    description: 'Earth is the only known world with life, liquid surface oceans and an atmosphere that supports a remarkably diverse biosphere.',
    comparison: { diameterKm: 12756, gravityMps2: 9.8, meanTemperatureC: 15, distanceMillionKm: 149.6, orbitalPeriodDays: 365.2, rotationPeriodHours: 23.9, moonCount: 1 },
    layers: [
      { name: 'Crust', description: 'Earth’s thin, brittle outer shell forms the continents and ocean floors.', composition: 'Silicate rocks, including granitic continental crust and basaltic oceanic crust', temperature: 'From surface temperatures to around 1,000°C near its base', state: 'Solid and brittle', depth: 'Surface to ≈ 5–70 km' },
      { name: 'Mantle', description: 'Hot silicate rock circulates very slowly; this motion helps drive plate tectonics.', composition: 'Magnesium- and iron-rich silicate minerals', temperature: '≈ 500–4,000°C', state: 'Mostly solid; deforms and flows slowly over geologic time', depth: '≈ 35–2,900 km' },
      { name: 'Outer Core', description: 'Flowing metal in the outer core helps generate Earth’s magnetic field.', composition: 'Mostly liquid iron and nickel, with lighter elements', temperature: '≈ 4,000–5,500°C', state: 'Liquid', depth: '≈ 2,900–5,150 km' },
      { name: 'Inner Core', description: 'The central core remains solid because of the immense pressure, despite its high temperature.', composition: 'Mostly iron and nickel', temperature: '≈ 5,200–6,000°C', state: 'Solid', depth: '≈ 5,150–6,371 km' }
    ],
    atmosphere: { summary: 'Earth’s atmosphere is a layered envelope; its near-surface dry air is mostly nitrogen and oxygen.', composition: ['Nitrogen (≈ 78%)', 'Oxygen (≈ 21%)', 'Argon (≈ 0.93%)', 'Carbon dioxide and other trace gases'] },
    moons: { summary: 'Earth’s natural satellite is the Moon.', notable: ['Moon'] }
  },
  Mars: {
    type: 'rocky',
    tagline: 'The red frontier.',
    description: 'A cold desert world with giant volcanoes, deep canyons and powerful evidence that liquid water once shaped its surface.',
    comparison: { diameterKm: 6792, gravityMps2: 3.7, meanTemperatureC: -65, distanceMillionKm: 228.0, orbitalPeriodDays: 687.0, rotationPeriodHours: 24.6, moonCount: 2 },
    layers: [
      { name: 'Crust', description: 'Iron-rich volcanic rock gives much of Mars its characteristic red colour.', composition: 'Iron-rich silicate rock', temperature: '≈ −65°C average surface temperature', state: 'Solid', depth: 'Surface layer' },
      { name: 'Mantle', description: 'Rocky silicate material surrounds the core.', composition: 'Silicate rock', temperature: null, state: 'Mostly solid rock', depth: null },
      { name: 'Core', description: 'A dense central region likely contains iron, nickel and sulfur.', composition: 'Iron, nickel and sulfur', temperature: null, state: 'State varies within the core', depth: null }
    ],
    atmosphere: { summary: 'Mars has a thin atmosphere and a cold, dry surface environment.', composition: ['Carbon dioxide (≈ 95%)', 'Nitrogen (≈ 2.7%)', 'Argon (≈ 1.6%)', 'Oxygen and other trace gases'] },
    moons: { summary: 'Mars has two small natural moons.', notable: ['Phobos', 'Deimos'] }
  },
  Jupiter: {
    type: 'gas-giant',
    tagline: 'The giant that rules the planets.',
    description: 'Jupiter is the largest planet, a gas giant with dramatic storms and a powerful magnetic environment.',
    comparison: { diameterKm: 142984, gravityMps2: 23.1, meanTemperatureC: -110, distanceMillionKm: 778.5, orbitalPeriodDays: 4331, rotationPeriodHours: 9.9, moonCount: 95, moonCountIsMinimum: true },
    layers: [
      { name: 'Cloud layers', description: 'Cloud bands and storms form in the upper atmosphere; they are not a solid surface.', composition: 'Ammonia, ammonium hydrosulfide, water, hydrogen and helium', temperature: null, state: 'Gas and cloud particles', depth: 'Upper atmosphere' },
      { name: 'Molecular hydrogen', description: 'Most of Jupiter’s volume is a deep, hot fluid envelope of hydrogen and helium.', composition: 'Hydrogen and helium', temperature: null, state: 'Dense fluid', depth: 'Below the visible clouds' },
      { name: 'Metallic hydrogen', description: 'At immense pressure, hydrogen behaves as an electrically conducting fluid.', composition: 'Hydrogen with helium', temperature: null, state: 'Conducting fluid', depth: 'Deep interior' },
      { name: 'Core region', description: 'Jupiter may have a diffuse, diluted central region rather than a sharply bounded solid core.', composition: 'Heavier elements mixed with surrounding material', temperature: null, state: 'Dense and under extreme pressure', depth: 'Central region' }
    ],
    atmosphere: { summary: 'Jupiter’s atmosphere is dominated by hydrogen and helium, with visible cloud bands and long-lived storms.', composition: ['Hydrogen', 'Helium', 'Methane, ammonia and water vapour'] },
    moons: { summary: 'Jupiter has many known moons, including four large Galilean moons.', notable: ['Io', 'Europa', 'Ganymede', 'Callisto'] }
  },
  Saturn: {
    type: 'gas-giant',
    tagline: 'A world crowned with rings.',
    description: 'Saturn is a gas giant famous for its spectacular ring system, made largely of countless pieces of water ice and rock.',
    comparison: { diameterKm: 120536, gravityMps2: 9.0, meanTemperatureC: -140, distanceMillionKm: 1432, orbitalPeriodDays: 10747, rotationPeriodHours: 10.7, moonCount: 140, moonCountIsMinimum: true },
    layers: [
      { name: 'Cloud layers', description: 'Visible atmospheric bands sit above the deep fluid interior; Saturn has no solid surface to stand on.', composition: 'Ammonia, water, hydrogen and helium', temperature: null, state: 'Gas and cloud particles', depth: 'Upper atmosphere' },
      { name: 'Molecular hydrogen', description: 'Hydrogen and helium form the planet’s deep fluid envelope.', composition: 'Hydrogen and helium', temperature: null, state: 'Dense fluid', depth: 'Below the visible clouds' },
      { name: 'Metallic hydrogen', description: 'Hydrogen is compressed into an electrically conducting fluid at great depth.', composition: 'Hydrogen with helium', temperature: null, state: 'Conducting fluid', depth: 'Deep interior' },
      { name: 'Core region', description: 'A dense central region contains heavier elements beneath the hydrogen-rich envelope.', composition: 'Heavier elements, including rock and ice', temperature: null, state: 'Dense under extreme pressure', depth: 'Central region' }
    ],
    atmosphere: { summary: 'Saturn’s atmosphere is mostly hydrogen and helium, with cloud layers and seasonal storms.', composition: ['Hydrogen', 'Helium', 'Methane, ammonia and other trace compounds'] },
    moons: { summary: 'Saturn has an extensive moon system; Titan and Enceladus are among its best-known moons.', notable: ['Titan', 'Enceladus', 'Rhea', 'Iapetus'] }
  },
  Uranus: {
    type: 'ice-giant',
    tagline: 'An ice giant tilted on its side.',
    description: 'Uranus has an unusual sideways rotation and a deep interior rich in water, ammonia and methane under immense pressure.',
    comparison: { diameterKm: 51118, gravityMps2: 8.7, meanTemperatureC: -195, distanceMillionKm: 2867, orbitalPeriodDays: 30589, rotationPeriodHours: -17.2, moonCount: 27 },
    layers: [
      { name: 'Atmosphere', description: 'A hydrogen- and helium-rich atmosphere contains methane, which contributes to Uranus’s blue-green colour.', composition: 'Hydrogen, helium and methane', temperature: null, state: 'Gas', depth: 'Upper atmosphere' },
      { name: 'Ice-rich mantle', description: 'The mantle is a hot, dense mixture of materials astronomers call ices; it is not ordinary frozen ice.', composition: 'Water, ammonia and methane-rich materials', temperature: null, state: 'Hot, dense fluid under pressure', depth: 'Deep interior' },
      { name: 'Core', description: 'A compact central region is expected inside the planet.', composition: 'Rock-rich material', temperature: null, state: 'Dense under extreme pressure', depth: 'Central region' }
    ],
    atmosphere: { summary: 'Uranus has a cold, hydrogen- and helium-rich atmosphere; methane absorbs red light and contributes to its colour.', composition: ['Hydrogen', 'Helium', 'Methane'] },
    moons: { summary: 'Uranus has a system of known moons, including Titania, Oberon, Umbriel, Ariel and Miranda.', notable: ['Titania', 'Oberon', 'Umbriel', 'Ariel', 'Miranda'] }
  },
  Neptune: {
    type: 'ice-giant',
    tagline: 'Deep blue and wildly windy.',
    description: 'The most distant major planet is an ice giant with some of the fastest winds observed in the Solar System.',
    comparison: { diameterKm: 49528, gravityMps2: 11.0, meanTemperatureC: -200, distanceMillionKm: 4515, orbitalPeriodDays: 59800, rotationPeriodHours: 16.1, moonCount: 14 },
    layers: [
      { name: 'Atmosphere', description: 'A hydrogen- and helium-rich atmosphere contains methane and powerful weather systems.', composition: 'Hydrogen, helium and methane', temperature: null, state: 'Gas', depth: 'Upper atmosphere' },
      { name: 'Ice-rich mantle', description: 'The mantle is a hot, dense mixture of water, ammonia and methane-rich materials.', composition: 'Water, ammonia and methane-rich materials', temperature: null, state: 'Hot, dense fluid under pressure', depth: 'Deep interior' },
      { name: 'Core', description: 'A dense central region is expected inside Neptune.', composition: 'Rock-rich material', temperature: null, state: 'Dense under extreme pressure', depth: 'Central region' }
    ],
    atmosphere: { summary: 'Neptune’s atmosphere contains hydrogen, helium and methane, with dynamic clouds and powerful winds.', composition: ['Hydrogen', 'Helium', 'Methane'] },
    moons: { summary: 'Triton is Neptune’s largest known moon.', notable: ['Triton', 'Nereid', 'Proteus'] }
  }
};

(function () {
  const planetOrder = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
  const requiredMetrics = [
    'diameterKm',
    'gravityMps2',
    'meanTemperatureC',
    'distanceMillionKm',
    'orbitalPeriodDays',
    'rotationPeriodHours',
    'moonCount'
  ];
  const comparisonMetadata = {
    sourceName: 'NASA NSSDCA Planetary Fact Sheet',
    sourceUrl: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/',
    note: 'Approximate values. Diameter is equatorial; giant-planet gravity and mean temperature are measured at the 1-bar level. Rotation periods are sidereal; negative values denote retrograde rotation.'
  };
  const data = {
    planetOrder,
    comparisonMetadata,
    isDevelopment: window.location.protocol === 'file:'
      || window.location.hostname === 'localhost'
      || window.location.hostname === '127.0.0.1'
      || window.location.hostname.endsWith('.localhost')
  };

  function formatMetric(key, planet) {
    const comparison = typeof planet === 'number' ? null : planet?.comparison;
    const value = typeof planet === 'number' ? planet : comparison?.[key];
    if (!Number.isFinite(value)) return 'Not available in the current data.';

    switch (key) {
      case 'diameterKm':
        return `${Math.round(value).toLocaleString('en-US')} km`;
      case 'gravityMps2':
        return `${value.toFixed(1)} m/s²`;
      case 'meanTemperatureC':
        return `${value < 0 ? '−' : ''}${Math.abs(value).toLocaleString('en-US')} °C`;
      case 'distanceMillionKm':
        return value >= 1000
          ? `${(value / 1000).toFixed(2)} billion km`
          : `${value.toFixed(1)} million km`;
      case 'orbitalPeriodDays':
        return value >= 365.25
          ? `${(value / 365.25).toFixed(2)} Earth years`
          : `${value.toLocaleString('en-US', { maximumFractionDigits: 1 })} Earth days`;
      case 'rotationPeriodHours': {
        const period = Math.abs(value);
        const duration = period >= 24
          ? `${(period / 24).toFixed(1)} Earth days`
          : `${period.toFixed(1)} hours`;
        return `${duration}${value < 0 ? ' · retrograde' : ''}`;
      }
      case 'moonCount':
        return comparison?.moonCountIsMinimum
          ? `At least ${value} known moons`
          : `${value} known ${value === 1 ? 'moon' : 'moons'}`;
      default:
        return 'Not available in the current data.';
    }
  }

  function getPlanetFacts(planet) {
    return [
      ['Equatorial diameter', formatMetric('diameterKm', planet)],
      ['Equatorial gravity', formatMetric('gravityMps2', planet)],
      ['Mean temperature', formatMetric('meanTemperatureC', planet)],
      ['Average distance from the Sun', formatMetric('distanceMillionKm', planet)],
      ['Orbital period', formatMetric('orbitalPeriodDays', planet)],
      ['Sidereal rotation period', formatMetric('rotationPeriodHours', planet)],
      ['Known moons', formatMetric('moonCount', planet)]
    ];
  }

  function validatePlanetData(planets) {
    const errors = [];
    const names = Object.keys(planets || {});
    if (!planets || typeof planets !== 'object') {
      errors.push('planet data must be an object');
    } else {
      const expectedNames = ['Sun', ...planetOrder];
      expectedNames.forEach((name) => {
        if (!Object.prototype.hasOwnProperty.call(planets, name)) errors.push(`missing planet record: ${name}`);
      });
      names.filter((name) => !expectedNames.includes(name)).forEach((name) => {
        errors.push(`unexpected planet record: ${name}`);
      });
      names.forEach((name) => {
        const planet = planets[name];
        if (!planet || typeof planet !== 'object') {
          errors.push(`${name}: record must be an object`);
          return;
        }
        ['type', 'tagline', 'description'].forEach((field) => {
          if (typeof planet[field] !== 'string' || !planet[field].trim()) {
            errors.push(`${name}: required field "${field}" is missing`);
          }
        });
        if (name === 'Sun') return;
        if (!planet.comparison || typeof planet.comparison !== 'object') {
          errors.push(`${name}: canonical comparison values are missing`);
          return;
        }
        requiredMetrics.forEach((metric) => {
          const value = planet.comparison[metric];
          const valid = Number.isFinite(value)
            && (metric === 'meanTemperatureC'
              || (metric === 'moonCount' ? value >= 0 : metric === 'rotationPeriodHours' ? value !== 0 : value > 0))
            && (metric === 'moonCount' ? Number.isInteger(value) : true);
          if (!valid) errors.push(`${name}: "${metric}" must be a valid numeric value`);
        });
        if (planet.comparison.moonCountIsMinimum && planet.comparison.moonCount < 1) {
          errors.push(`${name}: a minimum moon count must be greater than zero`);
        }
      });
      if (new Set(names).size !== names.length) errors.push('planet names must be unique');
      if (planetOrder.length !== new Set(planetOrder).size || planetOrder.some((name) => !planets[name] || name === 'Sun')) {
        errors.push('planet order must contain unique names that exist in the planet data');
      }
    }
    if (errors.length && data.isDevelopment) {
      console.error('[SOLARA data] Planet validation failed:', errors);
    }
    return errors.length === 0;
  }

  data.formatMetric = formatMetric;
  data.getPlanetFacts = getPlanetFacts;
  data.validatePlanetData = validatePlanetData;
  window.SOLARA_DATA = data;
  validatePlanetData(window.SOLARA_PLANETS);
})();
