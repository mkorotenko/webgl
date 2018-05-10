import THREE from './three'
import figures from './figures'
import GUI from './gui'

class sceneBuilder {
    constructor(scene) {

        this.scene = scene;

        var planeGeometry = new THREE.PlaneGeometry(50, 50, 1, 1);
        var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        // rotate and position the plane
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 0;
        plane.position.y = -5;
        plane.position.z = 0;
        // add the plane to the scene
        scene.add(plane);
        // add subtle ambient lighting
        var ambientLight = new THREE.AmbientLight(0x0c0c0c);
        scene.add(ambientLight);
        // add spotlight for the shadows
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10);
        spotLight.castShadow = true;
        scene.add(spotLight);

        scene.add( figures.wireBox({width: 20, height: 10, depth: 20}) );

        const spheres = this.spheres = [];

        for (let i=0; i<10; i++)
        spheres.push(
            figures.sphere()
                .castToGroup()
                .setDirectionArrow());

        console.info('spheres', spheres)

        spheres.forEach(s => {
            s.position.x = Math.random() * 19 - 10;
            s.position.y = Math.random() * 9 - 5;
            s.position.z = Math.random() * 19 - 10;
            scene.add(s);
        });

        this.sceneControl = {
            run: false,
            reset: this.resetSpheres.bind(this)
        }
        GUI(this.sceneControl)

        console.info('scene', this)

        setInterval(this.calculateScene.bind(this),10)
    }

    resetSpheres() {

    }

    calculateScene() {
        if (this.sceneControl.run) {
            this.spheres.forEach(s => {
                s.position.add(s.userData.direction.clone().multiplyScalar(0.1))
            })
        }
    }

}

export default sceneBuilder;