import BaseClock from './BaseClock.js';

class Clock extends BaseClock {
    startTicking() {
        super.startTicking();
        this.scene.events.on('update', this.update, this);
    }

    stopTicking() {
        super.stopTicking();
        if (this.scene) { // Scene might be destoryed
            this.scene.events.off('update', this.update, this);
        }
    }

    update(time, delta) {
        if ((!this.isRunning) || (this.timeScale === 0)) {
            return this;
        }
        delta *= this.timeScale;
        this.now += delta;
        this.emit('update', this.now, delta);
        return this;
    }
}

export default Clock;