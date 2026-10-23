'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  className?: string;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ className = '' }) => {
  const pathname = usePathname();
  const isAdminOrPortal =
    pathname?.startsWith('/admin') || pathname?.startsWith('/portal-gateway');

  const mountRef = useRef<HTMLDivElement>(null);
  const [fps, setFps] = useState<number>(60);
  const [subsystem, setSubsystem] = useState<string>('01_SPATIAL_CORE_ONLINE');
  const [isOrbitActive, setIsOrbitActive] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isHudOpen, setIsHudOpen] = useState<boolean>(false);

  // References for imperative action handlers
  const triggerLaserScanRef = useRef<() => void>(() => {});
  const pulseCoreBurstRef = useRef<() => void>(() => {});

  const notify = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  useEffect(() => {
    if (isAdminOrPortal) return;
    const container = mountRef.current;
    if (!container) return;

    // --- 1. CORE THREE.JS SETUP ---
    const scene = new THREE.Scene();

    const getWidth = () => window.innerWidth;
    const getHeight = () => window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, getWidth() / getHeight(), 0.1, 100);
    camera.position.set(0, 0, 11.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(getWidth(), getHeight());
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.zIndex = '0';

    container.appendChild(renderer.domElement);

    // --- 2. LUXURY BASELINE FLOOR (Gold & Stone Grid Helper) ---
    const gridHelper = new THREE.GridHelper(26, 26, 0xd4af37, 0xe5e7eb);
    gridHelper.position.y = -3.4;
    const gridMat = gridHelper.material as THREE.LineBasicMaterial;
    gridMat.transparent = true;
    gridMat.opacity = 0.22;
    scene.add(gridHelper);

    // --- 3. WARM STUDIO LIGHTING RIG (Derived from 3D Metallic Sign Logo) ---
    const ambientLight = new THREE.AmbientLight(0xfffdf7, 2.2);
    scene.add(ambientLight);

    // Key Directional Light: Warm Marigold Gold (#E5B238)
    const keyLightGold = new THREE.DirectionalLight(0xe5b238, 3.6);
    keyLightGold.position.set(5, 6, 4);
    scene.add(keyLightGold);

    // Fill Light: Soft Slate (#E2E8F0)
    const fillLightCool = new THREE.DirectionalLight(0xe2e8f0, 1.4);
    fillLightCool.position.set(-5, -2, -3);
    scene.add(fillLightCool);

    // Internal Engine Core Light: Deep Golden Amber (#D4AF37)
    const coreInternalLight = new THREE.PointLight(0xd4af37, 3.0, 10);
    scene.add(coreInternalLight);

    // --- 4. THE 3D SPATIAL QUANTUM ENGINE (Procedural Construction) ---
    const engineMaster = new THREE.Group();
    scene.add(engineMaster);

    // 4.1 Inner Crystalline Lattice Core (Smoked Obsidian Quartz with Amber Emissive Glow)
    const coreGeo = new THREE.IcosahedronGeometry(1.0, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#121316'), // Charcoal/Obsidian
      emissive: new THREE.Color('#B8860B'), // Deep Amber Gold internal glow
      emissiveIntensity: 0.45,
      roughness: 0.12,
      metalness: 0.88,
      transmission: 0.65,
      thickness: 1.5,
      wireframe: false,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.95,
    });
    const innerCore = new THREE.Mesh(coreGeo, coreMat);
    engineMaster.add(innerCore);

    // 4.2 Structural Geometric Cage (Brushed Marigold Gold Wireframe)
    const cageGeo = new THREE.IcosahedronGeometry(1.08, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#D4AF37'),
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    engineMaster.add(cageMesh);

    // Dual Outer Halo Wireframe
    const outerHaloGeo = new THREE.IcosahedronGeometry(1.4, 0);
    const outerHaloMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#E5B238'),
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const outerHaloMesh = new THREE.Mesh(outerHaloGeo, outerHaloMat);
    engineMaster.add(outerHaloMesh);

    // 4.3 Gimbal Outer Ring 1 (Brushed Marigold Gold Torus)
    const ring1Geo = new THREE.TorusGeometry(1.65, 0.04, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D4AF37'),
      metalness: 0.95,
      roughness: 0.2,
      emissive: new THREE.Color('#523E08'),
      emissiveIntensity: 0.25,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    engineMaster.add(ring1);

    // Gimbal Outer Ring 2 (Architectural Matte Charcoal Torus rotated 55°)
    const ring2Geo = new THREE.TorusGeometry(2.05, 0.035, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1E2024'),
      metalness: 0.65,
      roughness: 0.35,
      emissive: new THREE.Color('#0A0C10'),
      emissiveIntensity: 0.2,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    engineMaster.add(ring2);

    // Gimbal Outer Ring 3 (Delicate Champagne Gold Wireframe Torus rotated -45°)
    const ring3Geo = new THREE.TorusGeometry(2.45, 0.025, 16, 80);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F3CF65'),
      metalness: 0.7,
      roughness: 0.4,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = -Math.PI / 4;
    engineMaster.add(ring3);

    // 4.4 Orbiting Satellites / Audience Nodes Group (12 Nodes)
    const satelliteGroup = new THREE.Group();
    engineMaster.add(satelliteGroup);

    const satelliteCount = 12;
    const satellites: {
      mesh: THREE.Mesh;
      angle: number;
      speed: number;
      rad: number;
    }[] = [];

    const goldSatMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E5B238'),
      metalness: 0.9,
      roughness: 0.15,
      emissive: new THREE.Color('#B8860B'),
      emissiveIntensity: 0.2,
    });

    const charcoalSatMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#121316'),
      metalness: 0.4,
      roughness: 0.5,
    });

    const satGeo = new THREE.SphereGeometry(0.08, 16, 16);

    for (let i = 0; i < satelliteCount; i++) {
      const isCharcoal = i % 4 === 3;
      const mat = isCharcoal ? charcoalSatMat : goldSatMat;
      const sat = new THREE.Mesh(satGeo, mat);
      const angle = (i / satelliteCount) * Math.PI * 2;
      const radius = 2.85;
      sat.position.set(
        Math.cos(angle) * radius,
        Math.sin(i) * 0.8,
        Math.sin(angle) * radius
      );
      satelliteGroup.add(sat);
      satellites.push({
        mesh: sat,
        angle: angle,
        speed: 0.015 + i * 0.002,
        rad: radius,
      });
    }

    // 4.5 Floating Data Particle Dust (70% Brushed Gold + 30% Champagne)
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const goldColor = new THREE.Color('#D4AF37');
    const champagneColor = new THREE.Color('#F5E6BE');

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 14;
      positions[i + 1] = (Math.random() - 0.5) * 14;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      const chosen = Math.random() > 0.3 ? goldColor : champagneColor;
      colors[i] = chosen.r;
      colors[i + 1] = chosen.g;
      colors[i + 2] = chosen.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.NormalBlending, // Avoid harsh additive glare on white canvas
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- 5. SCROLL KEYFRAME DEFINITIONS (7 Detailed Section Keyframes, Sized Bold & Heroic) ---
    const keyframes = [
      {
        progress: 0.0, // Section 1: Hero (Docked Right, Bold & Majestic)
        pos: { x: 3.3, y: 0.1, z: 0.2 },
        rot: { x: 0.2, y: -0.4, z: 0.1 },
        scale: 1.65,
        subsystem: '01_SPATIAL_CORE_ONLINE',
        wireframe: false,
        satSpread: 1.0,
        coreColor: '#D4AF37', // Marigold Gold
      },
      {
        progress: 0.2, // Section 2: Custom Web Dev (Docked Left, Exploded Architecture)
        pos: { x: -3.3, y: 0.0, z: 0.0 },
        rot: { x: 1.2, y: 1.57, z: -0.4 },
        scale: 1.55,
        subsystem: '02_CODE_MESH_PIPELINE',
        wireframe: true,
        satSpread: 1.25,
        coreColor: '#1E2024', // Matte Black Wireframe with Gold Cage
      },
      {
        progress: 0.38, // Section 3: Meta Growth (Docked Right, Wide Satellites)
        pos: { x: 3.3, y: 0.1, z: 0.0 },
        rot: { x: -0.4, y: 3.14, z: 0.6 },
        scale: 1.6,
        subsystem: '03_META_ORGANIC_NETWORK',
        wireframe: false,
        satSpread: 1.7,
        coreColor: '#B8860B', // Rich Amber Gold
      },
      {
        progress: 0.55, // Section 4: Store VA Ops (Docked Left, Precision Vault)
        pos: { x: -3.3, y: 0.0, z: 0.0 },
        rot: { x: 0.6, y: 4.71, z: -0.2 },
        scale: 1.55,
        subsystem: '04_ECOMMERCE_DATA_VAULT',
        wireframe: false,
        satSpread: 0.9,
        coreColor: '#121316', // Deep Obsidian Vault
      },
      {
        progress: 0.72, // Section 5: Founders & Leadership (Centered Background Horizon)
        pos: { x: 0.0, y: -0.9, z: -2.0 },
        rot: { x: 0.3, y: 5.5, z: 0.1 },
        scale: 1.35,
        subsystem: '05_LEADERSHIP_CORE',
        wireframe: false,
        satSpread: 0.8,
        coreColor: '#D4AF37', // Golden Core deep in floor horizon
      },
      {
        progress: 0.86, // Section 6: Plans & Pricing (Deep background horizon)
        pos: { x: 0.0, y: -0.9, z: -2.0 },
        rot: { x: 0.2, y: 6.0, z: 0.0 },
        scale: 1.35,
        subsystem: '06_TIER_ARCHITECTURE',
        wireframe: false,
        satSpread: 0.95,
        coreColor: '#1E2024',
      },
      {
        progress: 1.0, // Section 7: Quick Consultation / Enterprise Monolith
        pos: { x: 0.0, y: 0.0, z: -0.6 },
        rot: { x: 0.1, y: 6.28, z: 0.0 },
        scale: 1.7,
        subsystem: '07_ENTERPRISE_MONOLITH',
        wireframe: false,
        satSpread: 1.3,
        coreColor: '#D4AF37',
      },
    ];

    function lerp(start: number, end: number, factor: number) {
      return start + (end - start) * factor;
    }

    const currentTransform = {
      pos: { x: 3.3, y: 0.1, z: 0.2 },
      rot: { x: 0.2, y: -0.4, z: 0.1 },
      scale: 1.65,
      satSpread: 1.0,
    };

    const targetTransform = {
      pos: { x: 3.3, y: 0.1, z: 0.2 },
      rot: { x: 0.2, y: -0.4, z: 0.1 },
      scale: 1.65,
      satSpread: 1.0,
    };

    let rawScroll = 0;
    let smoothScroll = 0;
    let lastSubsystem = '';

    function updateScrollyTargets(p: number) {
      let start = keyframes[0];
      let end = keyframes[keyframes.length - 1];

      for (let i = 0; i < keyframes.length - 1; i++) {
        if (p >= keyframes[i].progress && p <= keyframes[i + 1].progress) {
          start = keyframes[i];
          end = keyframes[i + 1];
          break;
        }
      }

      const range = end.progress - start.progress;
      const localT = range === 0 ? 0 : (p - start.progress) / range;
      const easeT =
        localT < 0.5 ? 2 * localT * localT : -1 + (4 - 2 * localT) * localT;

      targetTransform.pos.x = lerp(start.pos.x, end.pos.x, easeT);
      targetTransform.pos.y = lerp(start.pos.y, end.pos.y, easeT);
      targetTransform.pos.z = lerp(start.pos.z, end.pos.z, easeT);

      targetTransform.rot.x = lerp(start.rot.x, end.rot.x, easeT);
      targetTransform.rot.y = lerp(start.rot.y, end.rot.y, easeT);
      targetTransform.rot.z = lerp(start.rot.z, end.rot.z, easeT);

      targetTransform.scale = lerp(start.scale, end.scale, easeT);
      targetTransform.satSpread = lerp(start.satSpread, end.satSpread, easeT);

      // Responsive mobile & tablet adaptation: make it bold, centered and glorious on mobile
      const isMobile = window.innerWidth < 1024;
      const isSmallMobile = window.innerWidth < 640;

      if (isMobile) {
        targetTransform.pos.x = 0;
        if (p < 0.15) {
          // Hero mobile dock: prominent, centered, perfectly framed
          targetTransform.pos.y = isSmallMobile ? 0.2 : 0.3;
          targetTransform.pos.z = -1.2;
          targetTransform.scale = isSmallMobile ? 1.05 : 1.25;
        } else if (p < 0.65) {
          // Pillars mobile: centered behind cards with rich ambient aura
          targetTransform.pos.y = isSmallMobile ? -0.3 : -0.2;
          targetTransform.pos.z = -1.5;
          targetTransform.scale = isSmallMobile ? 0.95 : 1.15;
        } else {
          // Deep sections mobile
          targetTransform.pos.y = -0.6;
          targetTransform.pos.z = -2.0;
          targetTransform.scale = isSmallMobile ? 0.9 : 1.1;
        }
      }

      if (start.subsystem !== lastSubsystem) {
        lastSubsystem = start.subsystem;
        setSubsystem(start.subsystem);
        coreMat.wireframe = start.wireframe;
        coreMat.color.set(start.coreColor);
      }
    }

    // --- 6. MOUSE PARALLAX & 360 ORBIT INSPECT ---
    const mouseParallax = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isOrbiting = false;
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    const userDrag = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseParallax.targetX = nx * 0.35;
      mouseParallax.targetY = ny * 0.35;

      if (isOrbiting && isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        userDrag.y += dx * 0.008;
        userDrag.x += dy * 0.008;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isOrbiting && isDragging && e.touches.length > 0) {
        const touch = e.touches[0];
        const dx = touch.clientX - prevMouse.x;
        const dy = touch.clientY - prevMouse.y;
        userDrag.y += dx * 0.008;
        userDrag.x += dy * 0.008;
        prevMouse = { x: touch.clientX, y: touch.clientY };
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      if (!isOrbiting) return;
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!isOrbiting || e.touches.length === 0) return;
      isDragging = true;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      rawScroll = Math.max(
        0,
        Math.min(1, (window.scrollY || window.pageYOffset) / (max || 1))
      );
      const progressBar = document.getElementById('scrollProgress');
      if (progressBar) {
        progressBar.style.width = `${rawScroll * 100}%`;
      }
    };

    const onResize = () => {
      const w = getWidth();
      const h = getHeight();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      updateScrollyTargets(smoothScroll);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // Initial setup
    onScroll();
    updateScrollyTargets(0);

    // Imperative actions
    triggerLaserScanRef.current = () => {
      notify('⚡ Initiating diagnostic light sweep across quantum lattice...');
      keyLightGold.intensity = 8.0;
      innerCore.scale.set(1.25, 1.25, 1.25);
      setTimeout(() => {
        keyLightGold.intensity = 3.6;
        innerCore.scale.set(1.0, 1.0, 1.0);
      }, 600);
    };

    pulseCoreBurstRef.current = () => {
      notify('⚡ Energy Burst: Accelerating orbital satellite velocities...');
      satellites.forEach((s) => (s.speed *= 3.5));
      setTimeout(() => {
        satellites.forEach((s) => (s.speed /= 3.5));
      }, 1200);
    };

    // --- 7. ANIMATION LOOP ---
    const clock = new THREE.Clock();
    let frameCount = 0;
    let lastTime = performance.now();
    let animId = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // FPS tracking
      frameCount++;
      const now = performance.now();
      if (now >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }

      // Smooth scroll interpolation
      smoothScroll = lerp(smoothScroll, rawScroll, 0.08);
      updateScrollyTargets(smoothScroll);

      // Interpolate transforms
      currentTransform.pos.x = lerp(currentTransform.pos.x, targetTransform.pos.x, 0.08);
      currentTransform.pos.y = lerp(currentTransform.pos.y, targetTransform.pos.y, 0.08);
      currentTransform.pos.z = lerp(currentTransform.pos.z, targetTransform.pos.z, 0.08);

      currentTransform.rot.x = lerp(currentTransform.rot.x, targetTransform.rot.x, 0.08);
      currentTransform.rot.y = lerp(currentTransform.rot.y, targetTransform.rot.y, 0.08);
      currentTransform.rot.z = lerp(currentTransform.rot.z, targetTransform.rot.z, 0.08);

      currentTransform.scale = lerp(currentTransform.scale, targetTransform.scale, 0.08);
      currentTransform.satSpread = lerp(currentTransform.satSpread, targetTransform.satSpread, 0.08);

      mouseParallax.x = lerp(mouseParallax.x, mouseParallax.targetX, 0.05);
      mouseParallax.y = lerp(mouseParallax.y, mouseParallax.targetY, 0.05);

      // Autonomous gimbal rotations
      ring1.rotation.z += 0.008;
      ring1.rotation.x += 0.004;

      ring2.rotation.y += 0.012;
      ring2.rotation.z -= 0.006;

      ring3.rotation.x -= 0.009;
      ring3.rotation.y -= 0.005;

      innerCore.rotation.y += 0.015;
      innerCore.rotation.x += 0.008;
      cageMesh.rotation.y -= 0.008;
      outerHaloMesh.rotation.y += 0.006;

      // Orbiting satellites
      satellites.forEach((s) => {
        s.angle += s.speed;
        const r = s.rad * currentTransform.satSpread;
        s.mesh.position.x = Math.cos(s.angle) * r;
        s.mesh.position.z = Math.sin(s.angle) * r;
        s.mesh.position.y = Math.sin(s.angle * 2 + time) * 0.4;
      });

      // Drifting particles
      particleSystem.rotation.y = time * 0.02;

      // Gentle breathing motion
      const breathe = Math.sin(time * 1.8) * 0.05;

      engineMaster.position.set(
        currentTransform.pos.x + mouseParallax.x * 0.6,
        currentTransform.pos.y + mouseParallax.y * 0.6 + breathe,
        currentTransform.pos.z
      );

      engineMaster.rotation.set(
        currentTransform.rot.x + userDrag.x + -mouseParallax.y * 0.3,
        currentTransform.rot.y + userDrag.y + mouseParallax.x * 0.4,
        currentTransform.rot.z
      );

      engineMaster.scale.setScalar(currentTransform.scale);

      // Update rotation status text directly on DOM (avoids 60fps React re-renders)
      if (frameCount % 6 === 0) {
        const degX = (((engineMaster.rotation.x * (180 / Math.PI)) % 360) || 0).toFixed(1);
        const degY = (((engineMaster.rotation.y * (180 / Math.PI)) % 360) || 0).toFixed(1);
        const rotElem = document.getElementById('hudRotationText');
        if (rotElem) {
          rotElem.textContent = `X: ${degX}° | Y: ${degY}°`;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Pause rendering when tab is hidden to save GPU/battery
    let isRunning = true;
    const onVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animId);
      } else if (!isRunning) {
        isRunning = true;
        lastTime = performance.now();
        clock.getDelta();
        animate();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Toggle 3D inspect handler
    const handleToggleOrbit = (e: any) => {
      isOrbiting = e.detail?.active ?? !isOrbiting;
      setIsOrbitActive(isOrbiting);
      if (isOrbiting) {
        notify('✦ 3D Free-Orbit Active: Drag anywhere to rotate the 3D core in background.');
      } else {
        userDrag.x *= 0.1;
        userDrag.y *= 0.1;
        notify('✦ Scrollytelling Re-synced.');
      }
    };
    window.addEventListener('toggle-3d-orbit', handleToggleOrbit);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('toggle-3d-orbit', handleToggleOrbit);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      // Dispose Three.js objects
      [coreGeo, cageGeo, outerHaloGeo, ring1Geo, ring2Geo, ring3Geo, satGeo, particleGeo].forEach(
        (g) => g.dispose()
      );
      [
        coreMat,
        cageMat,
        outerHaloMat,
        ring1Mat,
        ring2Mat,
        ring3Mat,
        goldSatMat,
        charcoalSatMat,
        particleMat,
        gridMat,
      ].forEach((m) => m.dispose());

      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const toggleOrbitMode = () => {
    const nextState = !isOrbitActive;
    window.dispatchEvent(new CustomEvent('toggle-3d-orbit', { detail: { active: nextState } }));
  };

  if (isAdminOrPortal) {
    return null;
  }

  return (
    <>
      {/* Top Scrollytelling Telemetry Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-[#E5E7EB]/40 dark:bg-[#1E2024]/60 z-50 pointer-events-none">
        <div
          id="scrollProgress"
          className="h-full bg-gradient-to-r from-[#D4AF37] via-[#E5B238] to-[#B8860B] w-0 transition-all duration-75 shadow-sm"
        />
      </div>

      {/* FIXED THREE.JS 3D VIEWPORT CANVAS (Strictly z-0 behind HTML content) */}
      <div
        ref={mountRef}
        id="webgl-canvas-container"
        aria-hidden="true"
        className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* FLOATING HUD TOAST NOTIFICATION */}
      {toastMsg && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-24 right-6 z-50 rounded-2xl bg-[#121316] border border-[#D4AF37]/50 px-4 py-2.5 text-xs font-mono font-bold text-[#D4AF37] shadow-xl animate-fade-in"
        >
          {toastMsg}
        </div>
      )}

      {/* HUD LIVE ENGINE CONTROLS (Persistent Bottom-Left, 60-30-10 Luxury Palette) */}
      <aside aria-label="3D Engine Telemetry" className="fixed bottom-6 left-6 z-30 pointer-events-auto">
        <div className="rounded-2xl bg-white/90 border border-[#E5E7EB] p-3 shadow-partner-card backdrop-blur-xl transition-all duration-300 dark:bg-[#1E2024]/90 dark:border-[#2A2D34]">
          {/* Header Bar */}
          <div className="flex items-center justify-between gap-3 pb-2 border-b border-[#E5E7EB] dark:border-[#2A2D34]">
            <button
              type="button"
              onClick={() => setIsHudOpen(!isHudOpen)}
              className="flex items-center gap-2 text-xs font-bold text-[#121316] hover:text-[#D4AF37] dark:text-white"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4AF37]" />
              </span>
              <span>3D Quantum Core</span>
            </button>

            <span className="font-mono text-[11px] font-bold text-[#6B7280] dark:text-[#9CA3AF]">
              {fps} FPS
            </span>
          </div>

          {/* Expanded Diagnostic Details */}
          {isHudOpen && (
            <div className="mt-2.5 space-y-1.5 font-mono text-[11px] text-[#2B2D33] dark:text-[#E5E7EB] animate-fade-in">
              <div className="flex justify-between gap-4">
                <span className="text-[#6B7280] dark:text-[#9CA3AF]">Subsystem:</span>
                <span className="font-bold text-[#D4AF37]">{subsystem}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#6B7280] dark:text-[#9CA3AF]">Uptime:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">99.98% Monitored</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#6B7280] dark:text-[#9CA3AF]">Core Rotation:</span>
                <span id="hudRotationText" className="text-[#121316] dark:text-white">X: 0.0° | Y: 0.0°</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#E5E7EB] dark:border-[#2A2D34] flex gap-1.5">
                <button
                  type="button"
                  onClick={() => triggerLaserScanRef.current()}
                  className="flex-1 rounded-lg bg-[#FBFBFA] border border-[#E5E7EB] py-1 text-[10px] font-bold uppercase tracking-wider text-[#121316] hover:border-[#D4AF37] hover:text-[#D4AF37] dark:bg-[#121316] dark:border-[#2A2D34] dark:text-[#E5E7EB]"
                >
                  Light Sweep
                </button>
                <button
                  type="button"
                  onClick={() => pulseCoreBurstRef.current()}
                  className="flex-1 rounded-lg bg-[#FBFBFA] border border-[#E5E7EB] py-1 text-[10px] font-bold uppercase tracking-wider text-[#121316] hover:border-[#D4AF37] hover:text-[#D4AF37] dark:bg-[#121316] dark:border-[#2A2D34] dark:text-[#E5E7EB]"
                >
                  Orbital Burst
                </button>
              </div>
            </div>
          )}

          {/* 3D Free-Orbit Inspect Mode Toggle Button */}
          <div className="mt-2 pt-1.5 border-t border-[#E5E7EB] dark:border-[#2A2D34]">
            <button
              type="button"
              onClick={toggleOrbitMode}
              className={`w-full rounded-xl px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
                isOrbitActive
                  ? 'bg-[#D4AF37] text-[#121316] shadow-sm'
                  : 'bg-[#121316] text-[#D4AF37] hover:bg-[#1E2024] dark:bg-white dark:text-[#121316]'
              }`}
            >
              {isOrbitActive ? '✦ Free-Orbit: Drag to Inspect' : 'Inspect 3D Core'}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ThreeBackground;
