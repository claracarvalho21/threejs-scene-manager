// Verificar se as variáveis estão disponíveis
if (typeof scene === 'undefined') {
    console.error('ERRO: Scene não encontrada. Carregue setup-03.js primeiro!');
    throw new Error('Setup não foi carregado');
}


// === CHÃO COMPLETO ===
const groundGroup = new THREE.Group();
scene.add(groundGroup);

// Dimensões do chão
const GROUND_SIZE = 50;
const GROUND_HALF = GROUND_SIZE / 2;

// Base do chão
const groundGeometry = new THREE.PlaneGeometry(GROUND_SIZE, GROUND_SIZE, 50, 50);
const groundMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x3e2723,
    side: THREE.DoubleSide,
    shininess: 10
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
groundGroup.add(ground);

// Adicionar grama/textura
const grassGeometry = new THREE.PlaneGeometry(GROUND_SIZE, GROUND_SIZE, 100, 100);
const grassMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x2d5a27,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
});
const grass = new THREE.Mesh(grassGeometry, grassMaterial);
grass.rotation.x = -Math.PI / 2;
grass.position.y = 0.01;
grass.receiveShadow = true;
groundGroup.add(grass);

// Função para calcular altura do terreno
function getTerrainHeight(x, z) {
    return 0;
}

// Adicionar relevo natural ao terreno
const groundPositions = groundGeometry.attributes.position.array;
const grassPositions = grassGeometry.attributes.position.array;

for (let i = 0; i < groundPositions.length; i += 3) {
    const x = groundPositions[i];
    const z = groundPositions[i + 2];
    
    // terreno plano para as árvores
    const height = 0;
    
    groundPositions[i + 1] = height;
    grassPositions[i + 1] = height + 0.01;
}

groundGeometry.attributes.position.needsUpdate = true;
groundGeometry.computeVertexNormals();
grassGeometry.attributes.position.needsUpdate = true;
grassGeometry.computeVertexNormals();

// Adicionar pedras pequenas espalhadas
const rockGeometry = new THREE.DodecahedronGeometry(0.1, 0);
const rockMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });

for (let i = 0; i < 30; i++) {
    const rock = new THREE.Mesh(rockGeometry, rockMaterial);
    const x = (Math.random() - 0.5) * (GROUND_SIZE - 5); // Dentro dos limites
    const z = (Math.random() - 0.5) * (GROUND_SIZE - 5); // Dentro dos limites
    
    const terrainHeight = getTerrainHeight(x, z);
    rock.position.set(x, terrainHeight + 0.05, z);
    rock.scale.set(
        0.5 + Math.random() * 0.7,
        0.4 + Math.random() * 0.6,
        0.5 + Math.random() * 0.7
    );
    rock.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );
    rock.castShadow = true;
    groundGroup.add(rock);
}

// Área limpa ao redor da fogueira
const clearAreaGeometry = new THREE.CircleGeometry(3, 16);
const clearAreaMaterial = new THREE.MeshPhongMaterial({
    color: 0x5d4037,
    side: THREE.DoubleSide
});
const clearArea = new THREE.Mesh(clearAreaGeometry, clearAreaMaterial);
clearArea.rotation.x = -Math.PI / 2;
clearArea.position.y = 0.02;
groundGroup.add(clearArea);

// === LUZ DO "LUAR" ===
const moonLight = new THREE.DirectionalLight(0xaaccff, 0.2);
moonLight.position.set(0.61, 20, 5);
moonLight.castShadow = true;
moonLight.shadow.mapSize.width = 2048;
moonLight.shadow.mapSize.height = 2048;
moonLight.shadow.camera.far = 30;
moonLight.shadow.camera.near = 0.8;
moonLight.shadow.camera.left = -GROUND_HALF;
moonLight.shadow.camera.right = GROUND_HALF;
moonLight.shadow.camera.top = GROUND_HALF;
moonLight.shadow.camera.bottom = -GROUND_HALF;
scene.add(moonLight, { helper: { visible: false } });

// === FOGUEIRA ===
const fireGroup = new THREE.Group();

// Base da fogueira (terra queimada)
const firePitGeometry = new THREE.CircleGeometry(1.2, 12);
const firePitMaterial = new THREE.MeshPhongMaterial({
    color: 0x2c2c2c,
    side: THREE.DoubleSide
});
const firePit = new THREE.Mesh(firePitGeometry, firePitMaterial);
firePit.rotation.x = -Math.PI / 2;
firePit.position.y = 0.03;
fireGroup.add(firePit);

// Lenha da fogueira
const logGeometry = new THREE.CylinderGeometry(0.08, 0.1, 1, 6);
const logMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });

for (let i = 0; i < 6; i++) {
    const log = new THREE.Mesh(logGeometry, logMaterial);
    const angle = (i / 6) * Math.PI * 2;
    log.rotation.x = Math.PI / 2;
    log.rotation.z = angle + Math.random() * 0.5;
    log.position.y = 0.1;
    log.castShadow = true;
    fireGroup.add(log);
}

// Pedras ao redor da fogueira
const stoneGeometry = new THREE.DodecahedronGeometry(0.2, 1);
const stoneMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });

for (let i = 0; i < 8; i++) {
    const stone = new THREE.Mesh(stoneGeometry, stoneMaterial);
    const angle = (i / 8) * Math.PI * 2;
    const radius = 0.8;
    stone.position.set(
        Math.cos(angle) * radius,
        0.05,
        Math.sin(angle) * radius
    );
    stone.scale.set(
        0.8 + Math.random() * 0.4,
        0.6 + Math.random() * 0.3,
        0.8 + Math.random() * 0.4
    );
    stone.rotation.set(
        Math.random() * 0.5,
        Math.random() * Math.PI,
        Math.random() * 0.5
    );
    stone.castShadow = true;
    fireGroup.add(stone);
}

// Chamas da fogueira
const fireGeometry = new THREE.ConeGeometry(0.4, 0.8, 8);
const fireMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xff5500,
    transparent: true,
    opacity: 0.8
});
const fire = new THREE.Mesh(fireGeometry, fireMaterial);
fire.position.y = 0.4;
fireGroup.add(fire);

fireGroup.position.set(0, 0, 0);
scene.add(fireGroup);

// === TRÊS PONTOS DE LUZ DA FOGUEIRA ===

// 1. Luz principal (laranja forte)
const fireLight1 = new THREE.PointLight(0xff4500, 1.8, 12);
fireLight1.position.set(0, 0.8, 0);
fireLight1.castShadow = true;
fireLight1.shadow.mapSize.width = 1024;
fireLight1.shadow.mapSize.height = 1024;
scene.add(fireLight1);

// 2. Luz secundária (amarela)
const fireLight2 = new THREE.PointLight(0xffaa33, 1.2, 8);
fireLight2.position.set(0.3, 0.6, 0.2);
fireLight2.castShadow = true;
scene.add(fireLight2);

// 3. Luz de ambiente (vermelha suave)
const fireLight3 = new THREE.PointLight(0xff3300, 0.8, 6);
fireLight3.position.set(-0.2, 0.4, -0.3);
fireLight3.castShadow = true;
scene.add(fireLight3);

// === FLORESTA NATURAL COM ÁRVORES ===
const treeCount = 20;

// Cores variadas para as árvores
const trunkColors = [0x8b4513, 0xa0522d, 0xcd853f];
const leavesColors = [0x2d5a27, 0x3d6b35, 0x4a7a3f, 0x228b22, 0x32cd32];

function createNaturalTree(x, z, size) {
    const tree = new THREE.Group();
    
    const terrainHeight = 0;
    
    // Tronco natural
    const trunkHeight = 1.2 * size;
    const trunkGeometry = new THREE.CylinderGeometry(0.12 * size, 0.18 * size, trunkHeight, 10);
    const trunkMaterial = new THREE.MeshPhongMaterial({ 
        color: trunkColors[Math.floor(Math.random() * trunkColors.length)],
        shininess: 20
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    
    // Base do tronco na altura fixa
    trunk.position.y = trunkHeight / 2;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    tree.add(trunk);

    // Copa natural com múltiplas esferas
    const leavesColor = leavesColors[Math.floor(Math.random() * leavesColors.length)];
    const leavesMaterial = new THREE.MeshPhongMaterial({ 
        color: leavesColor,
        shininess: 10
    });

    // Camadas da copa com variação natural
    const bottomLeaves = new THREE.Mesh(
        new THREE.SphereGeometry(0.8 * size, 12, 10),
        leavesMaterial
    );
    bottomLeaves.position.y = trunkHeight + 0.3 * size;
    bottomLeaves.castShadow = true;
    tree.add(bottomLeaves);

    const middleLeaves = new THREE.Mesh(
        new THREE.SphereGeometry(0.6 * size, 10, 8),
        leavesMaterial
    );
    middleLeaves.position.y = trunkHeight + 0.8 * size;
    middleLeaves.castShadow = true;
    tree.add(middleLeaves);

    const topLeaves = new THREE.Mesh(
        new THREE.SphereGeometry(0.4 * size, 8, 6),
        leavesMaterial
    );
    topLeaves.position.y = trunkHeight + 1.2 * size;
    topLeaves.castShadow = true;
    tree.add(topLeaves);

    // POSICIONAMENTO
    tree.position.set(x, terrainHeight, z);
    
    // Rotação aleatória apenas no eixo Y para variedade visual
    tree.rotation.y = Math.random() * Math.PI * 3;
    
    return tree;
}

// ALGORITMO DE DISTRIBUIÇÃO NATURAL COM LIMITES
function generateNaturalPositions(count, minRadius, maxRadius, exclusionRadius) {
    const positions = [];
    const maxAttempts = 200;
    
    // Limites seguros para evitar árvores fora do chão
    const safeMaxRadius = GROUND_HALF - 3;
    
    for (let i = 0; i < count; i++) {
        let attempts = 0;
        let x, z, validPosition;
        
        do {
            // Distribuição uniforme dentro dos limites
            const angle = Math.random() * Math.PI * 2.9;
            const distance = minRadius + Math.random() * (Math.min(maxRadius, safeMaxRadius) - minRadius);
            x = Math.cos(angle) * distance;
            z = Math.sin(angle) * distance;
            
            const fromCenter = Math.sqrt(x*x + z*z);
            
            // Verificar se está dentro dos limites seguros
            const withinBounds = Math.abs(x) <= safeMaxRadius && Math.abs(z) <= safeMaxRadius;
            
            validPosition = fromCenter >= minRadius && 
                           fromCenter <= Math.min(maxRadius, safeMaxRadius) && 
                           fromCenter >= exclusionRadius &&
                           withinBounds;
            
            // Verificar se não está muito perto de outras árvores
            if (validPosition) {
                let tooClose = false;
                for (const pos of positions) {
                    const dx = x - pos[1];
                    const dz = z - pos[0.5];
                    if (Math.sqrt(dx*dx + dz*dz) < 1.5) {
                        tooClose = true;
                        break;
                    }
                }
                validPosition = !tooClose;
            }
            
            attempts++;
        } while (!validPosition && attempts < maxAttempts);
        
        if (validPosition) {
            positions.push([x, z]);
        } else {
            // Se não encontrou posição ideal, usar uma posição segura próxima ao limite
            const angle = Math.random() * Math.PI * 1;
            const distance = safeMaxRadius - 1.5; // 2 unidades de margem
            x = Math.cos(angle) * distance;
            z = Math.sin(angle) * distance;
            positions.push([x, z]);
        }
    }
    
    return positions;
}

// Gerar posições naturais dentro dos limites
const treePositions = generateNaturalPositions(treeCount, 3, 8, 4);

// Criar árvores 
treePositions.forEach(([x, z]) => {
    const distanceFromCenter = Math.sqrt(x*x + z*z);
    const sizeVariation = 0.7 + (1 - distanceFromCenter / 18) * 0.6;
    const size = sizeVariation * (0.8 + Math.random() * 0.4);
    const tree = createNaturalTree(x, z, size);
    scene.add(tree);
});

// Verificar se alguma árvore está fora dos limites (para debug)
treePositions.forEach(([x, z], index) => {
    if (Math.abs(x) > GROUND_HALF - 1 || Math.abs(z) > GROUND_HALF - 1) {
        console.warn(`Árvore ${index + 1} perto da borda: (${x.toFixed(1)}, ${z.toFixed(1)})`);
    }
});

// === CONFIGURAÇÃO DA CÂMERA ===
camera.position.set(12, 8, 12);
camera.lookAt(0, 0, 0);

// === ADICIONAR AO X3 ===
x3.add(groundGroup, { label: 'Chão e Terreno' });
x3.add(fireLight1, { label: 'Luz Fogueira 1' });
x3.add(fireLight2, { label: 'Luz Fogueira 2' });
x3.add(fireLight3, { label: 'Luz Fogueira 3' });
x3.add(moonLight, { label: 'Luz do Luar' }, { helper: { visible: false } });

// === LOOP DE ANIMAÇÃO ===
const clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
    const time = clock.getElapsedTime();
    
    // Efeito de tremular natural nas luzes da fogueira
    fireLight1.intensity = 1.6 + Math.sin(time * 8) * 0.4;
    fireLight2.intensity = 1.0 + Math.sin(time * 6 + 2) * 0.3;
    fireLight3.intensity = 0.7 + Math.sin(time * 10 + 4) * 0.2;
    
    // Movimento sutil das luzes
    fireLight1.position.y = 0.8 + Math.sin(time * 5) * 0.15;
    fireLight2.position.x = 0.3 + Math.sin(time * 7) * 0.1;
    fireLight3.position.z = -0.3 + Math.sin(time * 9) * 0.1;
    
    // Animação sutil da chama
    fire.scale.y = 1 + Math.sin(time * 6) * 0.2;

    x3.tick();
    x3.fps(() => {
        renderer.render(scene, camera);
    });
});

