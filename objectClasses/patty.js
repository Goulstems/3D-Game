// Given elapsed seconds, return the patty's flip offset and rotation.
function pattyFlipFormula(elapsed) {
    let duration = 0.8, height = 2.5, spins = 1
    const t = Math.min(Math.max(elapsed / duration, 0), 1);   // clamp 0..1
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    return {
        position: { y: height * 4 * t * (1 - t) },   // offset from the start height
        rotation: { x: spins * Math.PI * 2 * eased }
    };
}

export class Patty {
    constructor(obj) {
        this.obj = obj;
        this.baseY=obj.position.y;
        this.flipping = false;
    }

    flip() {
        if (this.flipping) return;
        this.elapsed = 0;
        this.flipping = true;
    }

    update(delta) {
        if (!this.flipping) return;

        this.elapsed += delta;
        const pose = pattyFlipFormula(this.elapsed);

        this.obj.position.y = this.baseY + pose.position.y;
        this.obj.rotation.x = pose.rotation.x;

        if (pose.done) {
            this.flipping = false;
            this.obj.position.y = this.baseY;
            this.obj.rotation.x = 0;
        }
    }
}