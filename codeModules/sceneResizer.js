/**
 * Keeps the camera projection and renderer size matched to the container.
 * Resizes and renders immediately, then repeats whenever the container changes.
 *
 * @param {HTMLElement} gameContainer - The DOM element whose dimensions control the render size.
 * @param {object} camera - A THREE.PerspectiveCamera.
 * @param {object} renderer - A THREE.WebGLRenderer.
 * @param {object} scene - The THREE.Scene to render after resizing.
 * @returns {ResizeObserver} The observer watching gameContainer.
 */

export function sceneResizer(gameContainer, camera, renderer, scene) {
    function resize() {
        const width = gameContainer.clientWidth;
        const height = gameContainer.clientHeight;

        if (width === 0 || height === 0) return;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        renderer.render(scene, camera);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(gameContainer);
    resize();

    return observer;
}