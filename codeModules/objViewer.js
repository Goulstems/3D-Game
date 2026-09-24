import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.182.0/build/three.module.js";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.182.0/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "https://cdn.jsdelivr.net/npm/three@0.182.0/examples/jsm/loaders/MTLLoader.js";

/**
 * Load an .obj file and add it to the scene.
 * If a matching .mtl file exists, its colors and textures are used.
 * Centers and scales the model. Does not change camera state.
 */
export function loadObj(scene, path) {
    const lastSlash = path.lastIndexOf("/");
    const folder = lastSlash >= 0 ? path.slice(0, lastSlash + 1) : "./";
    const filename = lastSlash >= 0 ? path.slice(lastSlash + 1) : path;
    const mtlFilename = filename.replace(/\.obj$/i, ".mtl");

    const mtlLoader = new MTLLoader();
    mtlLoader.setPath(folder);
    mtlLoader.load(
        mtlFilename,
        (materials) => {
            materials.preload();
            loadObjFile(scene, folder, filename, materials);
        },
        undefined,
        () => {
            // No .mtl file? Load the OBJ with a gray fallback material.
            loadObjFile(scene, folder, filename, null);
        }
    );
}

function loadObjFile(scene, folder, filename, materials) {
    const loader = new OBJLoader();
    loader.setPath(folder);

    if (materials) {
        loader.setMaterials(materials);
    }

    loader.load(
        filename,
        (object) => {
            if (!materials) {
                object.traverse((child) => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0x888888,
                            metalness: 0.35,
                            roughness: 0.45
                        });
                    }
                });
            }

            const box = new THREE.Box3().setFromObject(object);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxSize = Math.max(size.x, size.y, size.z) || 1;
            const scale = 6 / maxSize;

            object.scale.setScalar(scale);
            object.position.copy(center).multiplyScalar(-scale);
            object.rotation.y = Math.PI / 2;

            scene.add(object);
        },
        undefined,
        (error) => {
            console.error("Could not load OBJ:", folder + filename, error);
        }
    );
}
