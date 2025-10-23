const ball = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 60, 60),
    new THREE.MeshPhongMaterial({
        color: 0xffffff
    })
);
ball.position.x = 1;
ball.position.y = 1;
ball.castShadow = true;
scene.add(ball);

const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(10, 10),
    new THREE.MeshPhongMaterial({
        color: 0xffffff, side: THREE.DoubleSide
    })
);
floor.rotation.x = THREE.MathUtils.degToRad(-90);
floor.receiveShadow = true;
scene.add(floor);

const shadowLight = new THREE.PointLight(
    0xffffff, 0.75
);
shadowLight.position.y = 4;
shadowLight.castShadow = true;
shadowLight.target = ball;
scene.add(shadowLight)

x3.add(shadowLight);
x3.add(floor, {label: 'Floor'});
x3.add(ball, {label: 'Ball'});

renderer.setAnimationLoop(() => {
    x3.tick();
    x3.fps(() => {
        renderer.render(scene, camera);
    });
});