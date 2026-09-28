export function cameraRotate(camera, target, deltaTime, speed = 0.3) {
    const angle = speed * deltaTime;
    const offsetX = camera.position.x - target.x;
    const offsetZ = camera.position.z - target.z;

    camera.position.x = target.x + offsetX * Math.cos(angle) + offsetZ * Math.sin(angle);
    camera.position.z = target.z - offsetX * Math.sin(angle) + offsetZ * Math.cos(angle);
    camera.lookAt(target);
}