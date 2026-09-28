export function sceneResizer(gameContainer, camera, renderer) {
    function resize() {
        const width = gameContainer.clientWidth;
        const height = gameContainer.clientHeight;

        if (width === 0 || height === 0) return;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(gameContainer);
    resize();
}