import THREE from './three';
import sceneBuilder from './scene';
import * as dat from 'dat.gui';

console.info('THREE', THREE)

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 150 );
camera.position.z = 30;

var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 1 );
// renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );

var orbit = new THREE.OrbitControls( camera, renderer.domElement );
orbit.enablezoom = false;

new sceneBuilder(scene);

var stats = new THREE.Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

var render = function () {

    requestAnimationFrame( render );
    stats.begin();

    renderer.render( scene, camera );

    stats.end();

};

window.addEventListener( 'resize', function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}, false );

render();
