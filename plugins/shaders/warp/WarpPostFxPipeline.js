import FragSrc from './warp-postfxfrag.js';
import GameClock from '../../time/clock/GameClock.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const Vector2 = Phaser.Math.Vector2;
const GetValue = Phaser.Utils.Objects.GetValue;
const PI2 = Math.PI * 2;


class WarpPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexWarpPostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.frequencyX = 10;
        this.frequencyY = 10;
        this.amplitudeX = 10;
        this.amplitudeY = 10;
        this.progressX = 0;
        this.progressY = 0;
        this.speed = new Vector2(0, 0);
    }

    resetFromJSON(o) {
        var frequency = GetValue(o, 'frequency', 10);
        this.setFrequency(GetValue(o, 'frequencyX', frequency), GetValue(o, 'frequencyY', frequency));

        var amplitude = GetValue(o, 'amplitude', 10);
        this.setAmplitude(GetValue(o, 'amplitudeX', amplitude), GetValue(o, 'amplitudeY', amplitude));

        var progress = GetValue(o, 'progress', 0);
        this.setProgress(GetValue(o, 'progressX', progress), GetValue(o, 'progressY', progress));

        var speed = GetValue(o, 'speed', 0);
        this.setSpeed(GetValue(o, 'speedX', speed), GetValue(o, 'speedY', speed));

        this.setSpeedEnable(GetValue(o, 'speedEnable', (this.speedX !== 0) || (this.speedY !== 0)));

        return this;
    }

    onPreRender() {
        this.set2f('frequency', this.frequencyX, this.frequencyY);
        this.set2f('amplitude', this.amplitudeX, this.amplitudeY);

        this.set2f('progress', this.progressX * PI2, this.progressY * PI2);

        this.set2f('speed', this.speed.x, this.speed.y);
        this.set1f('time', (this.clock) ? this.clock.now : 0);

        this.set2f('texSize', this.renderer.width, this.renderer.height);
    }

    destroy() {
        if (this.clock) {
            this.clock.destroy();
            this.clock = undefined;
        }

        super.destroy();
        return this;
    }

    // frequencyX
    setFrequencyX(value) {
        this.frequencyX = value;
        return this;
    }

    // frequencyY
    setFrequencyY(value) {
        this.frequencyY = value;
        return this;
    }

    setFrequency(width, height) {
        if (height === undefined) {
            height = width;
        }
        this.frequencyX = width;
        this.frequencyY = height;
        return this;
    }

    get frequency() {
        return (this.frequencyX + this.frequencyY) / 2;
    }

    set frequency(value) {
        this.frequencyX = value;
        this.frequencyY = value;
    }

    // amplitudeX
    setAmplitudeX(value) {
        this.amplitudeX = value;
        return this;
    }

    // amplitudeY
    setAmplitudeY(value) {
        this.amplitudeY = value;
        return this;
    }

    setAmplitude(x, y) {
        if (y === undefined) {
            y = x;
        }
        this.amplitudeX = x;
        this.amplitudeY = y;
        return this;
    }

    get amplitude() {
        return (this.amplitudeX + this.amplitudeY) / 2;
    }

    set amplitude(value) {
        this.amplitudeX = value;
        this.amplitudeY = value;
    }

    // progress
    setProgressX(value) {
        this.progressX = value;
        return this;
    }
    setProgressY(value) {
        this.progressY = value;
        return this;
    }

    setProgress(x, y) {
        if (y === undefined) {
            y = x;
        }
        this.progressX = x;
        this.progressY = y;
        return this;
    }

    get progress() {
        return (this.progressX + this.progressY) / 2;
    }

    set progress(value) {
        this.progressX = value;
        this.progressY = value;
    }

    // speed
    setSpeedX(value) {
        this.speedX = value;
        return this;
    }
    setSpeedY(value) {
        this.speed.y = value;
        return this;
    }
    get speedX() {
        return this.speed.x;
    }
    set speedX(value) {
        this.speed.x = value;
    }
    get speedY() {
        return this.speed.y;
    }
    set speedY(value) {
        this.speed.y = value;
    }

    setSpeed(x, y) {
        if (y === undefined) {
            y = x;
        }
        this.speedX = x;
        this.speedY = y;
        return this;
    }

    // Speed enable
    get speedEnable() {
        return this._speedEnable;
    }
    set speedEnable(value) {
        if (this._speedEnable === value) {
            return;
        }

        this._speedEnable = value;
        if (value) {
            if (!this.clock) {
                this.clock = new GameClock(this, { eventEmitter: false });
                this.clock.start();
            } else {
                this.clock.resume();
            }
        } else {
            if (this.clock) {
                this.clock.pause();
            }
        }
    }
    setSpeedEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.speedEnable = enable;
        return this;
    }

}

export default WarpPostFxPipeline;