const options = {
    targetSelector: '#scene', 
    width: 800, height: 600,
    backgroundColor: 0x222222
}

const renderer = new THREE.WebGLRenderer (
    { antialias: true}
);

renderer.setPixelRatio(
    window.devicePixelRatio
);

renderer.setSize(
    options.width, options.height
);

document.querySelector(
    options.targetSelector
) .appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(
    options.backgroundColor
);
const camera = new THREE.PerspectiveCamera(
    50, options.width / options.height
);

camera.position.x = 1.5;
camera.position.y = 3.5;
camera.position.z = 8.5;

const light = new THREE.HemisphereLight(
    0xffffff, 0x080820, 0.2
);

scene.add(light);

const x3 = new THREEx3 (
    {
        THREE,
        OrbitControls: THREE.OrbitControls,
        camera,
        renderer,
        scene
    },
    {
        grid: {visible: false}, 
        axes: {visible: false}
    }
);

x3.add(camera, {open: false});
x3.add(light, {helper: { visible: false }});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;