// Shared 3D "studio": renderer, lighting, materials and helpers used by the
// live hero scene and by the offline service renders (scripts/render-3d), so
// every 3D visual on the site shares one material and lighting language.
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export { THREE };

export const PALETTE = {
  royal: "#3457ff",
  cyan: "#00c8e8",
  violet: "#8056f7",
  teal: "#18c9ad",
  lavender: "#f1ebff",
  ice: "#edf7ff",
  white: "#ffffff",
  deep: "#24318f",
};

export function createStudio({ canvas, width, height, pixelRatio = 1, preserve = false }) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: preserve,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height, false);
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.035).texture;
  scene.environmentIntensity = 0.55;

  const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
  camera.position.set(0, 0.7, 10);
  camera.lookAt(0, 0, 0);

  // Studio lighting: neutral key plus coloured rims for gradient illumination.
  const key = new THREE.DirectionalLight("#ffffff", 2.4);
  key.position.set(3, 6, 5);
  const violetRim = new THREE.PointLight(PALETTE.violet, 40, 14, 1.6);
  violetRim.position.set(-4.5, 2, 1.5);
  const cyanRim = new THREE.PointLight(PALETTE.cyan, 34, 14, 1.6);
  cyanRim.position.set(4.5, -1, 2.5);
  const fill = new THREE.HemisphereLight("#ffffff", PALETTE.lavender, 0.45);
  scene.add(key, violetRim, cyanRim, fill);

  return { renderer, scene, camera, pmrem };
}

// ---------- Materials ----------

const textureCache = new Map();

export function gradientTexture(stops, { vertical = true } = {}) {
  const cacheKey = stops.join("|") + vertical;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);
  const canvas = document.createElement("canvas");
  canvas.width = vertical ? 4 : 256;
  canvas.height = vertical ? 256 : 4;
  const ctx = canvas.getContext("2d");
  const grad = vertical
    ? ctx.createLinearGradient(0, 0, 0, 256)
    : ctx.createLinearGradient(0, 0, 256, 0);
  stops.forEach((color, i) => grad.addColorStop(i / (stops.length - 1), color));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(cacheKey, texture);
  return texture;
}

export const materials = {
  // Clear refractive glass with a faint iridescent sheen.
  glass: (tint = "#ffffff") =>
    new THREE.MeshPhysicalMaterial({
      color: tint,
      transmission: 1,
      thickness: 1.4,
      roughness: 0.05,
      ior: 1.5,
      iridescence: 0.7,
      iridescenceIOR: 1.35,
      clearcoat: 1,
      attenuationColor: "#a9b6ff",
      attenuationDistance: 3.2,
    }),
  // Faceted crystal for hero objects: reflective and iridescent without
  // transmission, so it never shows "holes" over a transparent canvas.
  crystal: (tint = "#c9d0ff") =>
    new THREE.MeshPhysicalMaterial({
      color: tint,
      transparent: true,
      opacity: 0.42,
      roughness: 0.04,
      metalness: 0.05,
      clearcoat: 1,
      iridescence: 1,
      iridescenceIOR: 1.6,
      iridescenceThicknessRange: [200, 800],
      specularIntensity: 1,
      envMapIntensity: 1.6,
      side: THREE.DoubleSide,
      depthWrite: false,
      flatShading: true,
    }),
  // Satin-finished frosted glass for secondary surfaces.
  frost: (tint = "#ffffff") =>
    new THREE.MeshPhysicalMaterial({
      color: tint,
      transmission: 0.7,
      thickness: 0.8,
      roughness: 0.3,
      attenuationColor: "#9aa8ff",
      attenuationDistance: 1.2,
      ior: 1.4,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
    }),
  // Lacquered colour with a vertical gradient.
  satin: (stops) =>
    new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      map: gradientTexture(stops),
      roughness: 0.32,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.22,
    }),
  // Soft porcelain white used for structural parts.
  porcelain: () =>
    new THREE.MeshPhysicalMaterial({
      color: "#fbfcff",
      roughness: 0.38,
      clearcoat: 0.5,
      clearcoatRoughness: 0.3,
      sheen: 0.5,
      sheenColor: new THREE.Color(PALETTE.ice),
    }),
  // Self-lit accent for signals, connections and "live" elements.
  glow: (color = PALETTE.cyan, intensity = 1.4) =>
    new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: intensity,
      roughness: 0.4,
    }),
};

// ---------- Geometry helpers ----------

export function roundedBox(w, h, d, radius = 0.06, material) {
  return new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 5, radius), material);
}

export function connection(points, material, radius = 0.014) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  return new THREE.Mesh(new THREE.TubeGeometry(curve, 64, radius, 10, false), material);
}

// Blue-tinted soft contact shadow (no black in any visual asset).
export function contactShadow(size = 5, y = -1.8, strength = 0.28) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext("2d");
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, `rgba(52, 87, 255, ${strength})`);
  grad.addColorStop(0.45, `rgba(128, 86, 247, ${strength * 0.45})`);
  grad.addColorStop(1, "rgba(128, 86, 247, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  const texture = new THREE.CanvasTexture(canvas);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = y;
  return mesh;
}

export function disposeScene(scene) {
  scene.traverse((object) => {
    object.geometry?.dispose();
    const mats = Array.isArray(object.material) ? object.material : [object.material];
    mats.forEach((m) => {
      if (!m) return;
      m.map?.dispose();
      m.dispose();
    });
  });
}
