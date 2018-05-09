import THREE from './three';

function updateGroupGeometry( mesh, geometry ) {

	mesh.children[ 0 ].geometry.dispose();
	mesh.children[ 1 ].geometry.dispose();

	mesh.children[ 0 ].geometry = new THREE.WireframeGeometry( geometry );
	mesh.children[ 1 ].geometry = geometry;

	// these do not update nicely together if shared

}

const BoxBufferGeometry = function ( mesh ) {

    var data = {
        width: 15,
        height: 15,
        depth: 15,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1
    };

    function generateGeometry() {

        updateGroupGeometry( mesh,
            new THREE.BoxBufferGeometry(
                data.width, data.height, data.depth, data.widthSegments, data.heightSegments, data.depthSegments
            )
        );

    }

    generateGeometry();

}

class sceneBuilder {
    constructor(scene) {
        var mesh = new THREE.Object3D();

        mesh.add( new THREE.LineSegments(
        
            new THREE.Geometry(),
        
            new THREE.LineBasicMaterial( {
                color: 0xffffff,
                transparent: true,
                opacity: 0.5
            } )
        
        ) );
        
        mesh.add( new THREE.Mesh(
        
            new THREE.Geometry(),
        
            new THREE.MeshPhongMaterial( {
                color: 0x156289,
                emissive: 0x072534,
                side: THREE.DoubleSide,
                flatShading: true
            } )
        
        ) );
        
        BoxBufferGeometry(mesh);
        
        scene.add( mesh );
    }
}

export default sceneBuilder;