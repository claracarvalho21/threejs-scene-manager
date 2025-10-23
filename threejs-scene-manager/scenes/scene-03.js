// Criar floresta
const forestGroup = new THREE.Group();
scene.add(forestGroup);

// Texturas simples (usando cores)
const treeColors = [0x2d5a27, 0x3d6b35, 0x4a7a3f, 0x37632f];
const groundColor = 0x5d4037;

// Criar chão
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshLambertMaterial({ 
    color: groundColor 
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.5;
forestGroup.add(ground);

// Função para criar árvores
function createTree(x, z, size) {
    const treeGroup = new THREE.Group();
    
    // Tronco
    const trunkGeometry = new THREE.CylinderGeometry(0.1 * size, 0.15 * size, 1 * size, 8);
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 0.5 * size;
    treeGroup.add(trunk);
    
    // Copa da árvore (3 níveis)
    const treeColor = treeColors[Math.floor(Math.random() * treeColors.length)];
    
    // Nível inferior
    const bottomCrownGeometry = new THREE.ConeGeometry(0.8 * size, 1.5 * size, 8);
    const bottomCrownMaterial = new THREE.MeshLambertMaterial({ color: treeColor });
    const bottomCrown = new THREE.Mesh(bottomCrownGeometry, bottomCrownMaterial);
    bottomCrown.position.y = 1.2 * size;
    treeGroup.add(bottomCrown);
    
    // Nível médio
    const middleCrownGeometry = new THREE.ConeGeometry(0.6 * size, 1.2 * size, 8);
    const middleCrown = new THREE.Mesh(middleCrownGeometry, bottomCrownMaterial);
    middleCrown.position.y = 2.2 * size;
    treeGroup.add(middleCrown);
    
    // Nível superior
    const topCrownGeometry = new THREE.ConeGeometry(0.4 * size, 1 * size, 8);
    const topCrown = new THREE.Mesh(topCrownGeometry, bottomCrownMaterial);
    topCrown.position.y = 3.1 * size;
    treeGroup.add(topCrown);
    
    treeGroup.position.set(x, 0, z);
    return treeGroup;
}

// Função para criar arbustos
function createBush(x, z, size) {
    const bushGroup = new THREE.Group();
    
    const bushGeometry = new THREE.SphereGeometry(0.6 * size, 8, 6);
    const bushMaterial = new THREE.MeshLambertMaterial({ 
        color: treeColors[Math.floor(Math.random() * treeColors.length)] 
    });
    const bush = new THREE.Mesh(bushGeometry, bushMaterial);
    bush.position.y = 0.4 * size;
    bushGroup.add(bush);
    
    bushGroup.position.set(x, 0, z);
    return bushGroup;
}

// Criar várias árvores
const treePositions = [
    [-6, -4], [-3, -5], [2, -6], [5, -3],
    [-7, 0], [-4, 2], [0, 4], [4, 5], [7, 2],
    [-5, 6], [-1, 7], [3, 8], [6, 6],
    [-8, -2], [8, -1], [-2, -7], [1, -8]
];

treePositions.forEach(pos => {
    const size = 0.8 + Math.random() * 0.6;
    const tree = createTree(pos[0], pos[1], size);
    forestGroup.add(tree);
});

// Criar arbustos
const bushPositions = [
    [-4, -2], [-1, -3], [3, -4], [6, -2],
    [-6, 1], [-2, 1], [2, 2], [5, 3],
    [-3, 4], [1, 5], [4, 4], [7, 1],
    [-7, -1], [8, 0], [-1, -6], [2, -7]
];

bushPositions.forEach(pos => {
    const size = 0.4 + Math.random() * 0.3;
    const bush = createBush(pos[0], pos[1], size);
    forestGroup.add(bush);
});

// Adicionar algumas pedras
const rockGeometry = new THREE.DodecahedronGeometry(0.3, 1);
const rockMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });

const rockPositions = [
    [-5, -1], [-2, -2], [4, -3], [7, -4],
    [-3, 3], [1, 3], [5, 1], [-6, 3]
];

rockPositions.forEach(pos => {
    const rock = new THREE.Mesh(rockGeometry, rockMaterial);
    rock.position.set(pos[0], -0.2, pos[1]);
    rock.scale.set(
        0.8 + Math.random() * 0.6,
        0.6 + Math.random() * 0.4,
        0.8 + Math.random() * 0.6
    );
    rock.rotation.set(
        Math.random() * 0.3,
        Math.random() * Math.PI,
        Math.random() * 0.3
    );
    forestGroup.add(rock);
});

// Luz ambiente para iluminação suave da floresta
const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
scene.add(ambientLight);

// Luz direcional para simular sol
const sunLight = new THREE.DirectionalLight(0xfff4c2, 0.8);
sunLight.position.set(10, 10, 5);
sunLight.castShadow = true;
scene.add(sunLight);

// Ajustar câmera para visão da floresta
camera.position.set(0, 5, 8);
camera.lookAt(0, 0, 0);

x3.add(forestGroup, { label: 'Floresta' });

renderer.setAnimationLoop(() => {
    x3.tick();
    x3.fps(() => {
        renderer.render(scene, camera);
    });
});