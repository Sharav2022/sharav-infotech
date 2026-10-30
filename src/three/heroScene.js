// "Glass Core": a faceted glass core holding a luminous inner sphere, with
// application modules on translucent orbits, each wired back to the core.
// Reads as one system: a centre of engineering with the services around it.
import {
  PALETTE,
  THREE,
  connection,
  contactShadow,
  materials,
  roundedBox,
} from "./studio.js";

const MODULES = [
  // [angle, radius, height, kind, material stops]
  [0.25, 2.05, 0.95, "panel", [PALETTE.royal, PALETTE.violet]],
  [1.25, 2.2, -0.6, "cube", [PALETTE.teal, PALETTE.cyan]],
  [2.3, 2.0, 0.6, "glass"],
  [3.25, 2.15, -0.9, "panel", [PALETTE.violet, PALETTE.royal]],
  [4.2, 2.05, 0.8, "cube", [PALETTE.violet, PALETTE.royal]],
  [5.25, 2.2, -0.3, "pill", [PALETTE.cyan, PALETTE.teal]],
];

export function buildHeroScene({ scene }) {
  const root = new THREE.Group();
  scene.add(root);

  // ---------- Core ----------
  const core = new THREE.Group();
  root.add(core);

  const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.3, 0), materials.crystal());
  shell.renderOrder = 2;
  core.add(shell);

  // Cut-glass edges catch the light along every facet.
  const facets = new THREE.LineSegments(
    new THREE.EdgesGeometry(shell.geometry),
    new THREE.LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.85 })
  );
  core.add(facets);

  const inner = new THREE.Mesh(
    new THREE.SphereGeometry(0.58, 64, 64),
    materials.satin([PALETTE.cyan, PALETTE.royal, PALETTE.violet])
  );
  inner.material.emissive = new THREE.Color(PALETTE.violet);
  inner.material.emissiveIntensity = 0.35;
  core.add(inner);

  const lattice = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.88, 0)),
    new THREE.LineBasicMaterial({ color: PALETTE.cyan, transparent: true, opacity: 0.75 })
  );
  core.add(lattice);

  // ---------- Orbits ----------
  const orbitA = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.022, 16, 200), materials.frost("#b8c4ff"));
  orbitA.rotation.set(Math.PI / 2.25, 0.18, 0);
  const orbitB = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.012, 12, 160), materials.glow(PALETTE.violet, 0.9));
  orbitB.rotation.set(Math.PI / 1.85, -0.35, 0.2);
  root.add(orbitA, orbitB);

  // ---------- Modules ----------
  const modules = MODULES.map(([angle, radius, height, kind, stops], index) => {
    const position = new THREE.Vector3(Math.cos(angle) * radius, height, Math.sin(angle) * radius * 0.55);
    let mesh;
    if (kind === "panel") {
      mesh = new THREE.Group();
      const card = roundedBox(0.86, 0.56, 0.08, 0.06, materials.satin(stops));
      const screen = roundedBox(0.7, 0.16, 0.02, 0.01, materials.porcelain());
      screen.position.set(0, 0.12, 0.05);
      const line1 = roundedBox(0.5, 0.05, 0.02, 0.01, materials.porcelain());
      line1.position.set(-0.14, -0.08, 0.05);
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.055, 24, 24), materials.glow(PALETTE.teal, 1.2));
      dot.position.set(0.3, -0.12, 0.07);
      mesh.add(card, screen, line1, dot);
    } else if (kind === "cube") {
      mesh = roundedBox(0.5, 0.5, 0.5, 0.1, materials.satin(stops));
    } else if (kind === "pill") {
      mesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.5, 8, 24), materials.satin(stops));
      mesh.rotation.z = Math.PI / 2.6;
    } else {
      mesh = roundedBox(0.56, 0.56, 0.56, 0.14, materials.crystal("#d9dcff"));
    }
    mesh.position.copy(position);
    mesh.userData = { base: position.clone(), phase: index * 1.1 };
    mesh.lookAt(0, height * 0.3, 6);
    root.add(mesh);

    // Connection from the core surface to the module, bowed for elegance.
    const start = position.clone().normalize().multiplyScalar(1.05);
    const mid = position.clone().multiplyScalar(0.55).add(new THREE.Vector3(0, 0.35, 0));
    const tube = connection([start.toArray(), mid.toArray(), position.toArray()], materials.glow(PALETTE.cyan, 1.1), 0.011);
    root.add(tube);

    // A travelling signal along each connection.
    const curve = new THREE.CatmullRomCurve3([start, mid, position]);
    const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), materials.glow("#ffffff", 2));
    root.add(pulse);
    return { mesh, curve, pulse, tube };
  });

  // Satellites on the outer orbit.
  const satellites = new THREE.Group();
  [0, 2.1, 4.2].forEach((angle, i) => {
    const s = new THREE.Mesh(
      new THREE.SphereGeometry(0.09 - i * 0.015, 24, 24),
      materials.satin([PALETTE.violet, PALETTE.cyan])
    );
    s.position.set(Math.cos(angle) * 2.15, 0, Math.sin(angle) * 2.15);
    satellites.add(s);
  });
  satellites.rotation.copy(orbitA.rotation);
  root.add(satellites);

  root.add(contactShadow(4.4, -2.05, 0.26));
  root.rotation.set(0.08, -0.35, 0);

  const pointer = new THREE.Vector2();
  const tilt = new THREE.Vector2();

  // t in seconds. Pass a fixed t for still renders.
  function update(t) {
    tilt.lerp(pointer, 0.04);
    root.rotation.y = -0.35 + t * 0.06 + tilt.x * 0.25;
    root.rotation.x = 0.08 + tilt.y * 0.12;
    core.rotation.y = t * 0.18;
    core.rotation.x = Math.sin(t * 0.3) * 0.15;
    inner.rotation.y = -t * 0.4;
    lattice.rotation.y = -t * 0.25;
    orbitB.rotation.z = 0.2 + t * 0.1;
    satellites.rotation.y = t * 0.2;
    modules.forEach(({ mesh, curve, pulse }, i) => {
      const { base, phase } = mesh.userData;
      mesh.position.y = base.y + Math.sin(t * 0.8 + phase) * 0.07;
      const progress = (t * 0.32 + i / modules.length) % 1;
      pulse.position.copy(curve.getPointAt(progress));
      pulse.scale.setScalar(Math.sin(progress * Math.PI) * 1 + 0.2);
    });
  }

  return { root, update, pointer };
}
