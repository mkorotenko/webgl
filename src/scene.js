import THREE from './three';
import figures from './figures'
class sceneBuilder {
    constructor(scene) {

        var planeGeometry = new THREE.PlaneGeometry(50, 20, 10, 1);
        var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        // rotate and position the plane
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 15;
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

        scene.add(figures.sphere());

        scene.add( figures.wireBox({width: 20, height: 10, depth: 5}) );
    }
}

export default sceneBuilder;