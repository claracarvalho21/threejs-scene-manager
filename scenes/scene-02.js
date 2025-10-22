const material = new THREE.MeshLambertMaterial(
    {
        color: 0x348feb,
        side: THREE.DoubleSide
    }
);

const cube = new THREE.Mesh (
    new THREE.BoxBufferGeometry(
        1, 1, 1
    ),
     material
); 

scene.add(cube);

const circle = new THREE.Mesh(
    // radius segments
    new THREE.CircleBufferGeometry(
        0.5, 20
    ),
    material
);
circle.position.x = -2;
circle.rotation.x = THREE.MathUtils.degToRad(-90);
scene.add(circle);

const cone = new THREE.Mesh(
    // radius height radialSegments heightSegments
    new THREE.ConeBufferGeometry(
        0.3, 0.5
    ),
    material
);

cone.position.x = -2;
cone.position.y = 2;
scene.add(cone);

const cylinder = new THREE.Mesh(
    // radiusTop radiusBottom height
    new THREE.CylinderBufferGeometry(
        0.5, 0.5, 1
    ),
    material
);

cylinder.position.x = 2;
cylinder.position.y = 0;
scene.add(cylinder);

const plane = new THREE.Mesh(
    // width height
    new THREE.PlaneBufferGeometry(
        1, 1
    ),
    material
);

plane.position.x = 2;
plane.position.y = 2;
plane.rotation.x = THREE.MathUtils.degToRad(-90);
scene.add(plane);

const sphere = new THREE.Mesh(
    // radius, widthSegments, heightSegments
    new THREE.SphereBufferGeometry(
        0.3, 20, 20
    ),
    material
);

sphere.position.x = 0;
sphere.position.y = 2;
scene.add(sphere);

x3.add(circle, { label: 'circle' });

x3.add(cube, { label: 'cube' });

x3.add(cone, { label: 'cone' });

x3.add(cone, { label: 'cylinder' });

x3.add(cone, { label: 'plane' });

x3.add(cone, { label: 'sphere' });

renderer.setAnimationLoop(() => {
    x3.tick();

    x3.fps(() => {
        renderer.render(scene, camera);
    });   
});

