(function () {
  const planetVisuals = {
    Sun: { radius: 1.35, orbit: 0, color: 0xffb64d, speed: 0, spin: 0.04, emissive: 0xff7629 },
    Mercury: { radius: 0.16, orbit: 2.4, color: 0xaaa19b, speed: 0.92, spin: 0.12 },
    Venus: { radius: 0.27, orbit: 3.55, color: 0xdab17b, speed: 0.68, spin: -0.07 },
    Earth: { radius: 0.3, orbit: 4.8, color: 0x3e91dd, speed: 0.5, spin: 0.7 },
    Mars: { radius: 0.22, orbit: 6.1, color: 0xb95e42, speed: 0.39, spin: 0.65 },
    Jupiter: { radius: 0.8, orbit: 8.5, color: 0xd1a173, speed: 0.21, spin: 1.05 },
    Saturn: { radius: 0.67, orbit: 11.1, color: 0xd6c08e, speed: 0.15, spin: 0.95 },
    Uranus: { radius: 0.44, orbit: 13.65, color: 0x83c5cb, speed: 0.105, spin: -0.62 },
    Neptune: { radius: 0.43, orbit: 16.2, color: 0x4777d1, speed: 0.08, spin: 0.58 }
  };
  const atmosphereColors = {
    Venus: 0xf1a45d,
    Earth: 0x66bfff,
    Mars: 0xe8754d,
    Jupiter: 0xd4a87c,
    Saturn: 0xe1c48f,
    Uranus: 0x72d8df,
    Neptune: 0x568bff
  };

  function makeSurfaceTexture(THREE, name) {
    const canvas = document.createElement('canvas');
    canvas.width = 384;
    canvas.height = 192;
    const context = canvas.getContext('2d');
    const image = context.createImageData(canvas.width, canvas.height);
    const colors = {
      Mercury: [[67, 62, 60], [137, 124, 113], [190, 174, 156]],
      Venus: [[116, 67, 37], [190, 125, 64], [238, 195, 116]],
      Earth: [[9, 41, 91], [18, 102, 160], [46, 137, 84]],
      Mars: [[73, 33, 25], [157, 66, 39], [221, 121, 72]],
      Jupiter: [[127, 70, 47], [206, 154, 111], [239, 211, 170]],
      Saturn: [[133, 101, 65], [202, 174, 125], [236, 218, 174]],
      Uranus: [[50, 126, 145], [108, 189, 195], [180, 231, 228]],
      Neptune: [[22, 52, 126], [52, 105, 198], [119, 173, 235]]
    };
    const palette = colors[name];

    for (let y = 0; y < canvas.height; y++) {
      const latitude = (y / canvas.height - 0.5) * Math.PI;
      for (let x = 0; x < canvas.width; x++) {
        const longitude = (x / canvas.width) * Math.PI * 2;
        const index = (y * canvas.width + x) * 4;
        const variation =
          Math.sin(longitude * 5 + Math.sin(latitude * 7)) *
          Math.cos(latitude * 8 + Math.sin(longitude * 3)) * 0.24 +
          Math.sin(longitude * 13 + latitude * 11) * 0.1 +
          Math.cos(longitude * 2 - latitude * 17) * 0.08;
        let tone = Math.max(0, Math.min(1, 0.5 + variation));

        if (name === 'Jupiter' || name === 'Saturn') {
          const bands = Math.sin(latitude * (name === 'Jupiter' ? 39 : 31) + Math.sin(longitude * 2) * 1.7);
          tone = Math.max(0, Math.min(1, 0.5 + bands * 0.26 + variation * 0.25));
          if (name === 'Jupiter') {
            const stormX = Math.cos((longitude - 3.9) * 2.1);
            const stormY = Math.exp(-Math.pow((latitude + 0.18) * 13, 2));
            tone = Math.max(0, Math.min(1, tone + Math.max(0, stormX) * stormY * 0.17));
          }
        } else if (name === 'Earth') {
          const continents =
            Math.sin(longitude * 2.1 + Math.cos(latitude * 5)) *
            Math.cos(latitude * 3.2 + Math.sin(longitude * 1.7)) +
            Math.sin(longitude * 4.3 - latitude * 2.4) * 0.36;
          if (continents > 0.24) tone = 0.45 + Math.min(0.5, (continents - 0.24) * 0.48);
        }

        for (let channel = 0; channel < 3; channel++) {
          const low = palette[0][channel];
          const middle = palette[1][channel];
          const high = palette[2][channel];
          const value = tone < 0.5
            ? low + (middle - low) * tone * 2
            : middle + (high - middle) * (tone - 0.5) * 2;
          image.data[index + channel] = value;
        }
        image.data[index + 3] = 255;
      }
    }

    context.putImageData(image, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  function makeEarthCloudTexture(THREE) {
    const canvas = document.createElement('canvas');
    canvas.width = 384;
    canvas.height = 192;
    const context = canvas.getContext('2d');
    const image = context.createImageData(canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y++) {
      const latitude = (y / canvas.height - 0.5) * Math.PI;
      for (let x = 0; x < canvas.width; x++) {
        const longitude = (x / canvas.width) * Math.PI * 2;
        const cloud =
          Math.sin(longitude * 8 + Math.sin(latitude * 6)) *
          Math.cos(latitude * 13 - longitude * 2) +
          Math.sin(longitude * 19 + latitude * 8) * 0.35;
        const index = (y * canvas.width + x) * 4;
        image.data[index] = 233;
        image.data[index + 1] = 242;
        image.data[index + 2] = 255;
        image.data[index + 3] = Math.max(0, Math.min(105, (cloud - 0.48) * 150));
      }
    }

    context.putImageData(image, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  function makeAtmosphereMaterial(THREE, color) {
    return new THREE.ShaderMaterial({
      uniforms: { glowColor: { value: new THREE.Color(color) } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vViewPosition = -viewPosition.xyz;
          gl_Position = projectionMatrix * viewPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          float rim = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewPosition)), 0.0), 3.0);
          gl_FragColor = vec4(glowColor, rim * 0.24);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });
  }

  function makeSaturnRing(THREE, radius) {
    const geometry = new THREE.RingGeometry(radius * 1.28, radius * 2.35, 112, 28);
    const positions = geometry.attributes.position;
    const colors = new Float32Array(positions.count * 3);
    const inner = radius * 1.28;
    const range = radius * 2.35 - inner;
    const palette = [
      [0.39, 0.31, 0.22],
      [0.78, 0.68, 0.51],
      [0.88, 0.81, 0.67],
      [0.55, 0.46, 0.34],
      [0.94, 0.86, 0.71]
    ];

    for (let i = 0; i < positions.count; i++) {
      const radial = (Math.hypot(positions.getX(i), positions.getY(i)) - inner) / range;
      const lane = Math.floor(radial * 36 + Math.sin(radial * 135) * 0.8);
      const color = palette[Math.abs(lane) % palette.length];
      const gap = radial > 0.43 && radial < 0.49 ? 0.45 : 1;
      colors[i * 3] = color[0] * gap;
      colors[i * 3 + 1] = color[1] * gap;
      colors[i * 3 + 2] = color[2] * gap;
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }

  function createSolarSystem(options) {
    const { THREE } = window;
    const {
      stage,
      canvas,
      onHover,
      onSelect,
      onError
    } = options;

    if (!THREE || !stage || !canvas) {
      onError(new Error('Three.js could not be loaded. The CSS Solar System remains available.'));
      return null;
    }

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'low-power'
      });
    } catch (error) {
      onError(new Error(`WebGL is unavailable. The CSS Solar System remains available. ${error.message}`));
      return null;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120);
    const defaultCameraPosition = new THREE.Vector3(0, 20, 33);
    const defaultLookAt = new THREE.Vector3(0, 0, 0);
    camera.position.copy(defaultCameraPosition);
    camera.lookAt(defaultLookAt);
    camera.userData.lookAt = defaultLookAt.clone();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x050507, 0);
    if ('outputColorSpace' in renderer) renderer.outputColorSpace = THREE.SRGBColorSpace;

    scene.add(new THREE.HemisphereLight(0xb9d1ff, 0x16111c, 1.15));
    const sunlight = new THREE.PointLight(0xffd49a, 115, 75, 1.5);
    sunlight.position.set(0, 0, 0);
    scene.add(sunlight);

    const planets = new Map();
    const pickables = [];
    const sunGlows = [];
    const sunGeometry = new THREE.SphereGeometry(planetVisuals.Sun.radius, 36, 24);
    const sunMaterial = new THREE.MeshStandardMaterial({
      color: planetVisuals.Sun.color,
      emissive: planetVisuals.Sun.emissive,
      emissiveIntensity: 1.7,
      roughness: 0.72,
      metalness: 0
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.userData.planetName = 'Sun';
    pickables.push(sun);
    scene.add(sun);
    [
      { scale: 1.15, opacity: 0.1, color: 0xffa43c },
      { scale: 1.42, opacity: 0.035, color: 0xff7632 },
      { scale: 1.82, opacity: 0.014, color: 0xff6027 }
    ].forEach(({ scale, opacity, color }) => {
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(planetVisuals.Sun.radius * scale, 24, 16),
        material
      );
      scene.add(glow);
      sunGlows.push({ mesh: glow, material, baseOpacity: opacity });
    });

    Object.entries(planetVisuals).forEach(([name, visual]) => {
      if (name === 'Sun') return;

      const orbit = new THREE.Object3D();
      orbit.rotation.y = Math.random() * Math.PI * 2;
      scene.add(orbit);

      const geometry = new THREE.SphereGeometry(visual.radius, 28, 20);
      const texture = makeSurfaceTexture(THREE, name);
      const material = new THREE.MeshStandardMaterial({
        color: visual.color,
        map: texture,
        roughness: 0.88,
        metalness: 0.02,
        emissive: visual.color,
        emissiveIntensity: 0.025
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = visual.orbit;
      mesh.userData.planetName = name;
      orbit.add(mesh);
      pickables.push(mesh);
      const planet = { orbit, mesh, visual, material, clouds: null };
      if (name === 'Earth') {
        const cloudMaterial = new THREE.MeshStandardMaterial({
          map: makeEarthCloudTexture(THREE),
          transparent: true,
          opacity: 0.65,
          depthWrite: false,
          roughness: 1
        });
        const clouds = new THREE.Mesh(
          new THREE.SphereGeometry(visual.radius * 1.018, 24, 18),
          cloudMaterial
        );
        mesh.add(clouds);
        planet.clouds = clouds;
      }
      if (atmosphereColors[name]) {
        const atmosphere = new THREE.Mesh(
          new THREE.SphereGeometry(visual.radius * 1.1, 24, 18),
          makeAtmosphereMaterial(THREE, atmosphereColors[name])
        );
        mesh.add(atmosphere);
      }
      planets.set(name, planet);

      const orbitPath = new THREE.Mesh(
        new THREE.RingGeometry(visual.orbit - 0.006, visual.orbit + 0.006, 96),
        new THREE.MeshBasicMaterial({ color: 0xaab7d9, transparent: true, opacity: 0.15, side: THREE.DoubleSide })
      );
      orbitPath.rotation.x = -Math.PI / 2;
      scene.add(orbitPath);

      if (name === 'Saturn') {
        const rings = new THREE.Mesh(
          makeSaturnRing(THREE, visual.radius),
          new THREE.MeshStandardMaterial({
            vertexColors: true,
            roughness: 0.95,
            metalness: 0,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.9,
            depthWrite: false
          })
        );
        rings.rotation.x = -Math.PI / 2.35;
        mesh.add(rings);
      }
    });

    [
      { count: 540, depth: 100, size: 0.045, opacity: 0.52, color: 0xaabfff },
      { count: 260, depth: 82, size: 0.075, opacity: 0.62, color: 0xe0e8ff },
      { count: 90, depth: 68, size: 0.11, opacity: 0.76, color: 0xffe6c1 }
    ].forEach(({ count, depth, size, opacity, color }) => {
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] = (Math.random() - 0.5) * depth * 1.7;
        positions[i + 1] = (Math.random() - 0.5) * depth * 1.25;
        positions[i + 2] = (Math.random() - 0.5) * depth * 1.7;
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      scene.add(new THREE.Points(
        geometry,
        new THREE.PointsMaterial({
          color,
          size,
          sizeAttenuation: true,
          transparent: true,
          opacity,
          depthWrite: false
        })
      ));
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const clock = new THREE.Clock();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cameraTarget = new THREE.Vector3();
    const cameraPositionTarget = new THREE.Vector3();
    let selectedName = null;
    let hoveredName = null;
    let cameraMotion = null;
    let frameId = 0;
    let active = true;
    let disposed = false;

    function resize() {
      if (disposed) return;
      const width = Math.max(stage.clientWidth, 1);
      const height = Math.max(stage.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function updatePointer(event) {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(pickables, false)[0];
      const name = hit ? hit.object.userData.planetName : null;
      if (name === hoveredName) return name;

      if (hoveredName) getPlanetMaterial(hoveredName).emissiveIntensity = hoveredName === 'Sun' ? 1.45 : 0.025;
      hoveredName = name;
      if (name) {
        getPlanetMaterial(name).emissiveIntensity = name === 'Sun' ? 2.2 : 0.34;
        onHover(name);
        canvas.style.cursor = 'pointer';
      } else {
        onHover(null);
        canvas.style.cursor = '';
      }
      return name;
    }

    function getPlanetMaterial(name) {
      return name === 'Sun' ? sunMaterial : planets.get(name).material;
    }

    function focusPlanet(name, duration = 1.15) {
      const body = name === 'Sun' ? sun : planets.get(name)?.mesh;
      if (!body) return;

      body.getWorldPosition(cameraTarget);
      const approach = camera.position.clone().sub(cameraTarget);
      if (approach.lengthSq() < 0.01) approach.set(0, 0.6, 1);
      approach.normalize();
      const verticalFov = camera.fov * Math.PI / 180;
      const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
      const limitingFov = Math.min(verticalFov, horizontalFov);
      const radius = body.geometry.parameters.radius;
      const distance = name === 'Sun'
        ? 5.6
        : Math.max(radius * 6.6, radius + 1.25, radius / Math.tan(limitingFov * 0.22));
      cameraPositionTarget.copy(cameraTarget).addScaledVector(approach, distance);
      cameraMotion = {
        fromPosition: camera.position.clone(),
        fromTarget: camera.userData.lookAt ? camera.userData.lookAt.clone() : defaultLookAt.clone(),
        toPosition: cameraPositionTarget.clone(),
        toTarget: cameraTarget.clone(),
        elapsed: 0,
        duration: reducedMotion.matches ? 0 : duration
      };
    }

    function returnToSystem() {
      selectedName = null;
      cameraMotion = {
        fromPosition: camera.position.clone(),
        fromTarget: camera.userData.lookAt ? camera.userData.lookAt.clone() : defaultLookAt.clone(),
        toPosition: defaultCameraPosition.clone(),
        toTarget: defaultLookAt.clone(),
        elapsed: 0,
        duration: reducedMotion.matches ? 0 : 1.1
      };
    }

    function updateCamera(delta) {
      if (!cameraMotion) return;
      cameraMotion.elapsed += delta;
      const progress = cameraMotion.duration === 0 ? 1 : Math.min(cameraMotion.elapsed / cameraMotion.duration, 1);
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      camera.position.lerpVectors(cameraMotion.fromPosition, cameraMotion.toPosition, eased);
      const lookAt = new THREE.Vector3().lerpVectors(cameraMotion.fromTarget, cameraMotion.toTarget, eased);
      camera.lookAt(lookAt);
      camera.userData.lookAt = lookAt;
      if (progress === 1) cameraMotion = null;
    }

    function followSelectedPlanet() {
      if (!selectedName || cameraMotion) return;
      const body = selectedName === 'Sun' ? sun : planets.get(selectedName)?.mesh;
      if (!body) return;
      const previousTarget = camera.userData.lookAt || defaultLookAt;
      body.getWorldPosition(cameraTarget);
      const offset = camera.position.clone().sub(previousTarget);
      camera.position.copy(cameraTarget).add(offset);
      camera.lookAt(cameraTarget);
      camera.userData.lookAt = cameraTarget.clone();
    }

    function render() {
      if (!active || disposed) return;
      frameId = window.requestAnimationFrame(render);
      const delta = Math.min(clock.getDelta(), 0.05);
      updateCamera(delta);
      if (!reducedMotion.matches) {
        const pulse = Math.sin(performance.now() * 0.00065);
        sunMaterial.emissiveIntensity = 1.7 + pulse * 0.045;
        sunGlows.forEach(({ material, baseOpacity }) => {
          material.opacity = baseOpacity * (1 + pulse * 0.08);
        });
        planets.forEach(({ orbit, mesh, visual }) => {
          orbit.rotation.y += delta * visual.speed;
          mesh.rotation.y += delta * visual.spin;
        });
        planets.get('Earth').clouds.rotation.y += delta * 0.035;
        sun.rotation.y += delta * planetVisuals.Sun.spin;
      }
      followSelectedPlanet();
      renderer.render(scene, camera);
    }

    function onPointerMove(event) {
      if (event.pointerType === 'mouse') updatePointer(event);
    }

    function onPointerDown(event) {
      const name = updatePointer(event);
      if (!name) return;
      selectedName = name;
      onSelect(name);
      focusPlanet(name);
    }

    function onPointerLeave() {
      if (hoveredName) {
        getPlanetMaterial(hoveredName).emissiveIntensity = hoveredName === 'Sun' ? 1.45 : 0.025;
        hoveredName = null;
        onHover(null);
      }
      canvas.style.cursor = '';
    }

    function onVisibilityChange() {
      if (document.hidden) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      } else if (active && !frameId) {
        clock.getDelta();
        frameId = window.requestAnimationFrame(render);
      }
    }

    function onMotionPreferenceChange() {
      clock.getDelta();
      if (reducedMotion.matches) cameraMotion = null;
    }

    function setActive(value) {
      active = value;
      if (active && !document.hidden && !frameId) {
        clock.getDelta();
        frameId = window.requestAnimationFrame(render);
      } else if (!active && frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    }

    function dispose() {
      if (disposed) return;
      disposed = true;
      window.cancelAnimationFrame(frameId);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotion.removeEventListener('change', onMotionPreferenceChange);
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => {
            if (material.map) material.map.dispose();
            material.dispose();
          });
        }
      });
      renderer.dispose();
    }

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibilityChange);
    reducedMotion.addEventListener('change', onMotionPreferenceChange);
    resize();
    render();

    return {
      focusPlanet,
      returnToSystem,
      setActive,
      dispose,
      getSelectedPlanet: () => selectedName
    };
  }

  window.SOLARA_createSolarSystem = createSolarSystem;
})();
