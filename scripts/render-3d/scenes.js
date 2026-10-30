// Offline 3D compositions for service and brand imagery. Each scene builds
// into the shared studio (src/three/studio.js) so all renders share one
// material, colour and lighting system. Rendered by scripts/render-3d.
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import {
  PALETTE as P,
  THREE,
  connection,
  contactShadow,
  materials as M,
  roundedBox,
} from "../../src/three/studio.js";
import { buildHeroScene } from "../../src/three/heroScene.js";

const V = (x, y, z) => new THREE.Vector3(x, y, z);

function uiCard(w, h, headerStops, rows = 3) {
  const g = new THREE.Group();
  g.add(roundedBox(w, h, 0.07, 0.07, M.porcelain()));
  const header = roundedBox(w - 0.16, h * 0.22, 0.03, 0.03, M.satin(headerStops));
  header.position.set(0, h * 0.3, 0.05);
  g.add(header);
  for (let i = 0; i < rows; i++) {
    const bar = roundedBox((w - 0.3) * (1 - i * 0.22), 0.06, 0.03, 0.02, M.frost("#cfd8ff"));
    bar.position.set(-((w - 0.3) * i * 0.11), h * 0.02 - i * 0.14, 0.05);
    g.add(bar);
  }
  return g;
}

export const SCENES = {
  hero({ scene }) {
    const hero = buildHeroScene({ scene });
    hero.update(4.2);
    return { camera: [0, 0.6, 9.2] };
  },

  "product-design"({ scene }) {
    const g = new THREE.Group();
    const back = uiCard(2.6, 1.8, [P.violet, P.royal], 4);
    back.position.set(-0.55, 0.45, -0.9);
    back.rotation.set(-0.12, 0.35, 0.02);
    const mid = uiCard(2.2, 1.5, [P.cyan, P.royal], 3);
    mid.position.set(0.35, -0.05, 0);
    mid.rotation.set(-0.1, 0.25, -0.04);
    const front = roundedBox(1.15, 1.4, 0.09, 0.12, M.glass("#f4f0ff"));
    front.position.set(1.35, -0.45, 0.9);
    front.rotation.set(-0.08, -0.3, 0.06);
    g.add(back, mid, front);
    [P.royal, P.violet, P.teal, P.cyan].forEach((c, i) => {
      const chip = roundedBox(0.34, 0.34, 0.1, 0.08, M.satin([c, c]));
      chip.position.set(-1.9 + i * 0.42, -1.05, 0.6);
      chip.rotation.set(-0.3, 0.3, 0);
      g.add(chip);
    });
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.42, 64, 64), M.satin([P.violet, P.royal]));
    sphere.position.set(-1.75, 1.25, 0.6);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.1, 32, 96), M.glass());
    ring.position.set(1.85, 1.15, 0.2);
    ring.rotation.set(0.6, -0.4, 0);
    g.add(sphere, ring, contactShadow(6, -1.7, 0.24));
    scene.add(g);
    return { camera: [0, 0.6, 9.5] };
  },

  "web-development"({ scene }) {
    const g = new THREE.Group();
    const win = roundedBox(3.4, 2.3, 0.1, 0.12, M.frost("#c8d2ff"));
    win.position.set(0, 0.1, -0.6);
    g.add(win);
    [P.violet, P.cyan, P.teal].forEach((c, i) => {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.06, 24, 24), M.glow(c, 0.8));
      dot.position.set(-1.45 + i * 0.2, 1.0, -0.5);
      g.add(dot);
    });
    const code = [
      [1.3, 0, P.violet], [0.9, 0.35, P.royal], [1.6, 0.35, P.cyan],
      [0.7, 0.7, P.teal], [1.2, 0.35, P.royal], [0.5, 0, P.violet],
    ];
    code.forEach(([len, indent, c], i) => {
      const bar = roundedBox(len, 0.16, 0.16, 0.07, M.satin([c, P.royal]));
      bar.position.set(-1.2 + indent + len / 2, 0.6 - i * 0.28, 0.15 + (i % 2) * 0.25);
      g.add(bar);
    });
    const modA = roundedBox(0.6, 0.6, 0.6, 0.12, M.satin([P.teal, P.cyan]));
    modA.position.set(2.35, 0.9, 0.4);
    modA.rotation.set(0.4, 0.6, 0);
    const modB = roundedBox(0.5, 0.5, 0.5, 0.11, M.glass("#efeaff"));
    modB.position.set(2.1, -0.95, 0.9);
    modB.rotation.set(0.2, -0.5, 0.2);
    g.add(modA, modB);
    const glow = M.glow(P.cyan, 1.1);
    g.add(connection([[1.6, 0.6, -0.4], [2.0, 0.85, 0.1], [2.35, 0.9, 0.4]], glow));
    g.add(connection([[1.6, -0.6, -0.4], [1.9, -0.85, 0.3], [2.1, -0.95, 0.9]], glow));
    g.add(contactShadow(6.5, -1.6, 0.22));
    g.rotation.set(0.05, -0.32, 0);
    scene.add(g);
    return { camera: [0, 0.5, 9.5] };
  },

  "cloud-services"({ scene }) {
    const g = new THREE.Group();
    const cloud = new THREE.Group();
    [[0, 0, 0, 0.85], [-0.85, -0.2, 0.1, 0.62], [0.85, -0.15, 0, 0.66], [-0.4, 0.45, -0.2, 0.6], [0.45, 0.4, -0.1, 0.55]].forEach(
      ([x, y, z, r]) => {
        const s = new THREE.Mesh(new THREE.SphereGeometry(r, 64, 64), M.glass("#eef2ff"));
        s.position.set(x, y, z);
        cloud.add(s);
      }
    );
    const heart = new THREE.Mesh(new THREE.SphereGeometry(0.42, 48, 48), M.satin([P.cyan, P.royal, P.violet]));
    heart.material.emissive = new THREE.Color(P.royal);
    heart.material.emissiveIntensity = 0.25;
    cloud.add(heart);
    cloud.position.y = 0.95;
    g.add(cloud);
    const glow = M.glow(P.cyan, 1.2);
    for (let ix = -1; ix <= 1; ix++) {
      for (let iz = -1; iz <= 1; iz++) {
        const tower = new THREE.Group();
        const body = roundedBox(0.42, 0.75, 0.42, 0.06, M.porcelain());
        tower.add(body);
        [0.18, 0, -0.18].forEach((y, k) => {
          const strip = roundedBox(0.3, 0.035, 0.02, 0.01, M.glow(k === 0 ? P.teal : P.royal, 1));
          strip.position.set(0, y, 0.215);
          tower.add(strip);
        });
        tower.position.set(ix * 0.95, -1.15, iz * 0.75);
        g.add(tower);
        g.add(connection([[ix * 0.95, -0.75, iz * 0.75], [ix * 0.6, -0.1, iz * 0.4], [ix * 0.3, 0.45, 0]], glow, 0.01));
      }
    }
    g.add(contactShadow(6, -1.55, 0.26));
    g.rotation.set(0.12, -0.5, 0);
    scene.add(g);
    return { camera: [0, 0.6, 9.5] };
  },

  "it-consulting"({ scene }) {
    const g = new THREE.Group();
    const tints = ["#b9c6ff", "#cdb8ff", "#a9ecff", "#a8f0e2"];
    const accents = [P.royal, P.violet, P.cyan, P.teal];
    const glow = M.glow(P.cyan, 1.1);
    const nodes = [];
    tints.forEach((tint, i) => {
      const y = -1.1 + i * 0.72;
      const plate = roundedBox(2.6 - i * 0.25, 0.08, 2.6 - i * 0.25, 0.04, M.frost(tint));
      plate.position.y = y;
      g.add(plate);
      const layerNodes = [];
      [[-0.7 + i * 0.12, -0.55], [0.65, -0.2 - i * 0.12], [-0.05 - i * 0.1, 0.65]].forEach(([x, z], k) => {
        const s = (2.6 - i * 0.25) / 2.6;
        const node =
          k === 2
            ? roundedBox(0.32, 0.32, 0.32, 0.08, M.satin([accents[i], accents[(i + 1) % 4]]))
            : new THREE.Mesh(new THREE.SphereGeometry(0.15, 32, 32), M.satin([accents[(i + 2) % 4], accents[i]]));
        node.position.set(x * s, y + 0.22, z * s);
        g.add(node);
        layerNodes.push(node.position);
      });
      nodes.push(layerNodes);
    });
    for (let i = 0; i < nodes.length - 1; i++) {
      nodes[i].forEach((p, k) => {
        const q = nodes[i + 1][(k + 1) % 3];
        g.add(connection([p.toArray(), [(p.x + q.x) / 2, (p.y + q.y) / 2 + 0.1, (p.z + q.z) / 2], q.toArray()], glow, 0.012));
      });
    }
    g.add(contactShadow(6, -1.4, 0.24));
    g.rotation.set(0.12, -0.62, 0);
    scene.add(g);
    return { camera: [0, 3.2, 9] };
  },

  "digital-marketing"({ scene }) {
    const g = new THREE.Group();
    const base = roundedBox(3.6, 0.12, 1.9, 0.06, M.frost("#c8d2ff"));
    base.position.y = -1.2;
    g.add(base);
    const heights = [0.6, 0.95, 0.8, 1.35, 1.85];
    const tops = [];
    heights.forEach((h, i) => {
      const bar = roundedBox(0.42, h, 0.42, 0.08, M.satin(i % 2 ? [P.violet, P.royal] : [P.cyan, P.teal]));
      const x = -1.3 + i * 0.65;
      bar.position.set(x, -1.14 + h / 2, 0);
      g.add(bar);
      tops.push([x, -1.14 + h + 0.35, 0.05]);
    });
    g.add(connection(tops, M.glow(P.teal, 1.2), 0.022));
    tops.forEach((p) => {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.075, 24, 24), M.porcelain());
      dot.position.set(...p);
      g.add(dot);
    });
    const donut = new THREE.Group();
    [[0, 2.4, P.royal], [2.45, 1.7, P.violet], [4.2, 2.05, P.cyan]].forEach(([start, len, c]) => {
      const arc = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.16, 32, 96, len), M.satin([c, c]));
      arc.rotation.z = start;
      donut.add(arc);
    });
    donut.position.set(1.55, 1.15, -0.6);
    donut.rotation.set(-0.5, -0.35, 0);
    g.add(donut);
    g.add(contactShadow(6.5, -1.27, 0.24));
    g.rotation.set(0.12, -0.42, 0);
    scene.add(g);
    return { camera: [0, 0.5, 9.5] };
  },

  "software-testing"({ scene }) {
    const g = new THREE.Group();
    const prism = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.5, 6, 1), M.glass("#eefcff"));
    prism.rotation.x = Math.PI / 2;
    prism.rotation.y = Math.PI / 6;
    g.add(prism);
    const shape = new THREE.Shape();
    shape.moveTo(-0.55, 0.05);
    shape.lineTo(-0.15, -0.35);
    shape.lineTo(0.6, 0.4);
    shape.lineTo(0.45, 0.55);
    shape.lineTo(-0.15, -0.05);
    shape.lineTo(-0.4, 0.2);
    shape.closePath();
    const check = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shape, { depth: 0.22, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 6 }),
      M.satin([P.teal, P.cyan])
    );
    check.position.set(0, -0.05, -0.1);
    g.add(check);
    [1.6, 2.0].forEach((r, i) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.016, 12, 160), M.glow(i ? P.violet : P.cyan, 0.9));
      ring.rotation.x = Math.PI / 2.3;
      ring.position.y = -0.2;
      g.add(ring);
    });
    [0.5, 2.2, 3.9, 5.4].forEach((a, i) => {
      const n = roundedBox(0.26, 0.26, 0.26, 0.07, M.satin([i % 2 ? P.royal : P.violet, P.cyan]));
      n.position.set(Math.cos(a) * 2.0, -0.2 + Math.sin(a) * 0.35, Math.sin(a) * 0.9);
      g.add(n);
    });
    g.add(contactShadow(5.5, -1.5, 0.26));
    g.rotation.set(0.06, -0.3, 0);
    scene.add(g);
    return { camera: [0, 0.5, 9] };
  },

  "launching-and-support"({ scene }) {
    const g = new THREE.Group();
    const steps = [
      [-1.2, -1.15, 0.2, 1.1, M.satin([P.ice, "#c9d6ff"])],
      [-0.15, -0.6, -0.2, 0.95, M.satin([P.violet, P.royal])],
      [0.85, -0.05, -0.55, 0.8, M.satin([P.cyan, P.royal])],
    ];
    steps.forEach(([x, y, z, r, mat], i) => {
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.18, 64), mat);
      disc.position.set(x, y, z);
      g.add(disc);
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, y + 1.6, 16), M.porcelain());
      pillar.position.set(x, (y - 1.6) / 2, z);
      if (i > 0) g.add(pillar);
    });
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.55, 64, 64), M.satin([P.cyan, P.violet]));
    orb.position.set(0.95, 1.05, -0.5);
    orb.material.emissive = new THREE.Color(P.violet);
    orb.material.emissiveIntensity = 0.2;
    const shell = new THREE.Mesh(new THREE.SphereGeometry(0.78, 64, 64), M.glass());
    shell.position.copy(orb.position);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.02, 12, 160), M.glow(P.cyan, 1));
    ring.position.copy(orb.position);
    ring.rotation.set(1.2, 0.3, 0);
    g.add(orb, shell, ring);
    g.add(connection([[-1.2, -0.95, 0.2], [-0.6, 0.1, 0.4], [0.2, 0.75, 0], [0.95, 1.05, -0.5]], M.glow(P.teal, 1.2), 0.018));
    g.add(contactShadow(6, -1.3, 0.24));
    g.rotation.set(0.05, -0.25, 0);
    scene.add(g);
    return { camera: [0, 0.4, 9.5] };
  },

  // The Sharav mark, extruded: brand moment for About.
  brand({ scene }) {
    const g = new THREE.Group();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg"><path d="M40 6V14H16V20H26L18 28H8V16A10 10 0 0 1 18 6Z"/><path d="M8 42V34H32V28H22L30 20H40V32A10 10 0 0 1 30 42Z"/></svg>`;
    const data = new SVGLoader().parse(svg);
    const mats = [M.satin([P.cyan, P.royal]), M.satin([P.violet, P.royal])];
    data.paths.forEach((path, i) => {
      SVGLoader.createShapes(path).forEach((shape) => {
        const geo = new THREE.ExtrudeGeometry(shape, { depth: 7, bevelEnabled: true, bevelSize: 0.8, bevelThickness: 0.8, bevelSegments: 8 });
        const mesh = new THREE.Mesh(geo, mats[i]);
        mesh.position.z = i * 2.5;
        g.add(mesh);
      });
    });
    g.scale.set(0.06, -0.06, 0.06);
    g.position.set(-1.44, 1.44, 0);
    const holder = new THREE.Group();
    holder.add(g);
    [[-2.1, 1.3, -1, P.violet], [2.0, -1.1, 0.5, P.cyan], [1.9, 1.4, -1.5, P.teal]].forEach(([x, y, z, c], i) => {
      const tile = roundedBox(0.5, 0.5, 0.12, 0.1, i === 1 ? M.glass() : M.satin([c, P.royal]));
      tile.position.set(x, y, z);
      tile.rotation.set(0.3 * i, -0.4, 0.2);
      holder.add(tile);
    });
    holder.add(contactShadow(5, -2.0, 0.22));
    holder.rotation.set(0.08, -0.28, 0);
    scene.add(holder);
    return { camera: [0, 0.3, 10] };
  },

  // Two interlocked rings: partnership. Used on Contact.
  contact({ scene }) {
    const g = new THREE.Group();
    const a = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.26, 48, 160), M.satin([P.royal, P.violet]));
    a.rotation.set(0.2, 0.5, 0);
    a.position.x = -0.62;
    const b = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.26, 48, 160), M.satin([P.cyan, P.teal]));
    b.rotation.set(Math.PI / 2, 0.15, 0.3);
    b.position.x = 0.62;
    g.add(a, b);
    [[-2.1, 1.1, 0.3, 0.16, P.cyan], [2.15, -1.0, 0.4, 0.12, P.teal], [1.7, 1.35, -0.5, 0.09, P.violet]].forEach(([x, y, z, r, c]) => {
      const s = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 32), M.satin([c, P.royal]));
      s.position.set(x, y, z);
      g.add(s);
    });
    g.add(contactShadow(5.5, -1.7, 0.24));
    scene.add(g);
    return { camera: [0, 0.5, 9] };
  },
};
