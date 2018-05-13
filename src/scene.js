import THREE from './three'
import figures from './figures'
import GUI from './gui'
import CANNON from 'cannon';

class sceneBuilder {
    constructor(scene) {

        console.info('CANNON', CANNON);

        this.scene = scene;

        this.initPhysics();
        
        // var planeGeometry = new THREE.PlaneGeometry(50, 50, 1, 1);
        // var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        // var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        // plane.receiveShadow = true;
        // // rotate and position the plane
        // plane.rotation.x = -0.5 * Math.PI;
        // plane.position.x = 0;
        // plane.position.y = -5;
        // plane.position.z = 0;
        // // add the plane to the scene
        // scene.add(plane);
                // floor
                // let geometry = new THREE.PlaneGeometry( 300, 300, 50, 50 );
                // geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

                // let material = new THREE.MeshLambertMaterial( { color: 0xdddddd } );

                // let mesh = new THREE.Mesh( geometry, material );
                // mesh.castShadow = true;
                // mesh.receiveShadow = true;
                // scene.add( mesh );

        // add subtle ambient lighting
        var ambientLight = new THREE.AmbientLight(0x0c0c0c);
        scene.add(ambientLight);
        // add spotlight for the shadows
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10);
        spotLight.castShadow = true;
        scene.add(spotLight);

        const wireBox = figures.wireBox({width: 20, height: 10, depth: 20})
        scene.add( wireBox )
        console.info('wireBox', wireBox)

        this.sceneControl = {
            run: false,
            count: 40,
            reset: this.resetSpheres.bind(this)
        }

        this.resetSpheres();

        GUI(this.sceneControl)

        console.info('scene', this)

        var groundShape = new CANNON.Plane();
        var groundBody = new CANNON.Body({ mass: 0 });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
        this.world.add(groundBody);

        setInterval(this.calculateScene.bind(this),10)
    }

    initPhysics() {
        // Setup our world
        let world = this.world = new CANNON.World();
        world.quatNormalizeSkip = 0;
        world.quatNormalizeFast = false;

        var solver = new CANNON.GSSolver();

        world.defaultContactMaterial.contactEquationStiffness = 1e9;
        world.defaultContactMaterial.contactEquationRelaxation = 4;

        solver.iterations = 7;
        solver.tolerance = 0.1;
        var split = true;
        if (split)
            world.solver = new CANNON.SplitSolver(solver);
        else
            world.solver = solver;

        world.gravity.set(0, -20, 0);
        world.broadphase = new CANNON.NaiveBroadphase();

        // Create a slippery material (friction coefficient = 0.0)
        let physicsMaterial = new CANNON.Material("slipperyMaterial");
        var physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial,
            physicsMaterial,
            0.0, // friction coefficient
            0.3  // restitution
        );
        // We must add the contact materials to the world
        world.addContactMaterial(physicsContactMaterial);

        // var groundShape = new CANNON.Plane();
        // var groundBody = new CANNON.Body({ mass: 0 });
        // groundBody.addShape(groundShape);
        // groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
        // world.add(groundBody);
    }

    resetSpheres() {

        if (!this.scene) {
            console.error('resetSpheres error scene not assigned');
            return
        }

        if (this.spheres) {
            this.spheres.forEach(o => this.scene.remove(o));
        }
        const spheres = this.spheres = [];

        for (let i=0; i<this.sceneControl.count; i++)
        spheres.push(
            figures.sphere());

        console.info('spheres', spheres)

        spheres.forEach(s => {
            s.position.x = Math.random() * 19 - 10;
            s.position.y = Math.random() * 9 - 5;
            s.position.z = Math.random() * 19 - 10;

            s.userData.body.position.set(s.position.x,s.position.y,s.position.z);

            this.scene.add(s);
            this.world.add(s.userData.body);
        });

    }

    calculateScene() {
        var dt = 1/60;
        if (this.sceneControl.run) {
            this.spheres.forEach(s => {
                // s.position.add(s.userData.direction.clone().multiplyScalar(0.1))
                s.position.copy(s.userData.body.position);
                s.quaternion.copy(s.userData.body.quaternion);
            });
            this.world.step(dt);
        }
    }

}

export default sceneBuilder;