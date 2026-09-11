import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.182.0/build/three.module.js";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.182.0/examples/jsm/loaders/OBJLoader.js";

/**
 * Load an .obj file and add it to the scene.
 * Centers the model, scales it, and frames the camera if one is passed in.
 */
export function loadObj(scene, path, camera) {
    const loader = new OBJLoader();

    loader.load(
        path,
        (object) => {
            object.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0x888888,
                        metalness: 0.35,
                        roughness: 0.45
                    });
                }
            });

            const box = new THREE.Box3().setFromObject(object);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxSize = Math.max(size.x, size.y, size.z) || 1;
            const scale = 6 / maxSize;

            object.scale.setScalar(scale);
            object.position.copy(center).multiplyScalar(-scale);
            object.rotation.y = Math.PI / 2;

            scene.add(object);

            if (camera) {
                camera.position.set(0, 4.5, 6.5);
                camera.lookAt(0, 0, 0);
            }
        },
        undefined,
        (error) => {
            console.error("Could not load OBJ:", path, error);
        }
    );
}
