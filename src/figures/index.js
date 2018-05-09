import THREE from '../three';

export default {

    box: function ( _data ) {

        var data = {
            width: 1,
            height: 1,
            depth: 1,
            widthSegments: 1,
            heightSegments: 1,
            depthSegments: 1
        }
        Object.assign(data, _data);
    
        // create a cube
        // var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        // var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        // var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        // cube.castShadow = true;
        // // position the cube
        // cube.position.x = -4;
        // cube.position.y = 3;
        // cube.position.z = 0;
        // // add the cube to the scene
        // scene.add(cube);
                        
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
    
        let geometry = new THREE.BoxBufferGeometry(
            data.width, data.height, data.depth, 
            data.widthSegments, data.heightSegments, data.depthSegments
        );
    
        mesh.children[ 0 ].geometry = new THREE.WireframeGeometry( geometry );
        mesh.children[ 1 ].geometry = geometry;
    
        console.info('box', mesh)
    
        return mesh;
    
    },

    wireBox: function ( _data ) {

        var data = {
            width: 1,
            height: 1,
            depth: 1,
            widthSegments: 1,
            heightSegments: 1,
            depthSegments: 1
        }
        Object.assign(data, _data);
    
        var mesh = new THREE.Object3D();
    
        mesh.add( new THREE.LineSegments(
        
            new THREE.Geometry(),
        
            new THREE.LineBasicMaterial( {
                color: 0xffffff,
                transparent: true,
                opacity: 0.5
            } )
        
        ) );
    
        let geometry = new THREE.BoxBufferGeometry(
            data.width, data.height, data.depth, 
            data.widthSegments, data.heightSegments, data.depthSegments
        );
    
        mesh.children[ 0 ].geometry = new THREE.WireframeGeometry( geometry );
    
        mesh.castShadow = true;

        console.info('wireBox', mesh)
    
        return mesh;
    
    },

    sphere: function ( _data ) {

        var data = {
            radius: 1,
            segments: 20,
        }
        Object.assign(data, _data);
        
        var sphereGeometry = new THREE.SphereGeometry(data.radius, data.segments, data.segments);
        var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
        var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        // position the sphere
        // sphere.position.x = 20;
        // sphere.position.y = 0;
        // sphere.position.z = 2;
        sphere.castShadow = true;

        return sphere;
    }
}
