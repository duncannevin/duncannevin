import {
  AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild, ChangeDetectionStrategy
} from '@angular/core';
import { DemoDerbyClientService, DerbyPlayer, DerbySnapshot } from '../services/demo-derby-client.service';

@Component({
  selector: 'app-demoderby',
  template: `
    <canvas #canvas [attr.width]="width" [attr.height]="height" style="display:block;max-width:100%;border:1px solid #e5e7eb;border-radius:8px;"></canvas>
    <p style="margin:.5rem 0 0 0;font-size:.8rem;color:#6b7280">
      Controls: ↑/↓ throttle, ←/→ steer, Space brake
    </p>
  `,
  styles: [`
    :host {
      display: block;
    }
    canvas {
      user-select: none;
      -webkit-user-select: none;
      outline: none;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true,
})
export class DemoderbyComponent implements AfterViewInit, OnDestroy {
  @Input() wsUrl = 'wss://demo.duncannevin.com:4000/socket';
  @Input() topic = 'arena:lobby';
  @Input() name = 'Guest';
  @Input() color = generateRandomHexColor();
  @Input() width = 1200;
  @Input() height = 800;

  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  // input state
  private keys = new Set<string>();
  private inputSeq = 0;
  private inputTimer?: number;
  private myId?: string;

  // interpolation buffer
  private snaps: DerbySnapshot[] = [];
  private players = new Map<string, DerbyPlayer>();

  private rafId?: number;

  constructor(private client: DemoDerbyClientService) {}

  async ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2D context not supported');
    this.ctx = ctx;

    // Connect & join
    this.client.connectSocket(this.wsUrl);
    const reply = await this.client.joinArena(this.topic, { name: this.name, color: this.color });
    this.myId = reply.me.id;

    // Wire events (outside Angular zone)
    this.client.onState((snap) => {
      this.snaps.push(snap);
      if (this.snaps.length > 8) this.snaps.shift();
    });

    // Input polling ~20 Hz
    this.inputTimer = window.setInterval(() => this.pushInput(), 50);

    // Keyboard listeners
    const kd = (e: KeyboardEvent) => {
      if (isControlKey(e.key)) { this.keys.add(e.key); e.preventDefault(); }
    };
    const ku = (e: KeyboardEvent) => {
      if (isControlKey(e.key)) { this.keys.delete(e.key); e.preventDefault(); }
    };
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);

    // store cleanup
    this._cleanupFns.push(() => {
      window.removeEventListener('keydown', kd);
      window.removeEventListener('keyup', ku);
    });

    // Start render loop
    this.rafId = requestAnimationFrame(this.draw);
  }

  ngOnDestroy(): void {
    if (this.inputTimer) window.clearInterval(this.inputTimer);
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this._cleanupFns.forEach(fn => fn());
    this.client.leave();
    // don't disconnect socket if you’ll embed multiple arenas; otherwise:
    this.client.disconnect();
  }

  // ——— helpers ———
  private pushInput() {
    const throttle = (this.keys.has('ArrowUp') ? 1 : 0) + (this.keys.has('ArrowDown') ? -1 : 0);
    const turn = (this.keys.has('ArrowRight') ? 1 : 0) + (this.keys.has('ArrowLeft') ? -1 : 0);
    const brake = this.keys.has(' ');
    this.client.pushInput({ throttle, turn, brake, seq: ++this.inputSeq });
  }

  private draw = () => {
    const target = performance.now() - 100;

    // 1) handle both 1-snap and 2-snap cases
    if (this.snaps.length >= 1) {
      const b = this.snaps[this.snaps.length - 1];
      let a = b;
      let t = 1;

      if (this.snaps.length >= 2) {
        a = this.snaps[this.snaps.length - 2];
        const denom = Math.max(1, b.t - a.t);
        t = Math.max(0, Math.min(1, (target - a.t) / denom));
      }

      this.players.clear();
      for (const pb of b.players) {
        const pa = (a.players.find(p => p.id === pb.id)) ?? pb;
        this.players.set(pb.id, {
          ...pb,
          x: lerp(pa.x, pb.x, t),
          y: lerp(pa.y, pb.y, t),
          heading: angleLerp(pa.heading, pb.heading, t),
          speed: lerp(pa.speed, pb.speed, t)
        });
      }
    }
    // else: keep previous this.players; DON'T clear to avoid flicker

    const c = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, c.width, c.height);
    this.ctx.strokeRect(0.5, 0.5, c.width - 1, c.height - 1);

    this.players.forEach(p => drawCar(this.ctx, p, this.myId ?? ''));
    this.rafId = requestAnimationFrame(this.draw);
  };

  private _cleanupFns: Array<() => void> = [];
}

function isControlKey(k: string) {
  return k === 'ArrowUp' || k === 'ArrowDown' || k === 'ArrowLeft' || k === 'ArrowRight' || k === ' ';
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function clamp01(x: number) { return Math.max(0, Math.min(1, x)); }
function angleLerp(a: number, b: number, t: number) {
  let diff = ((b - a + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
  return a + diff * t;
}
function drawCar(ctx: CanvasRenderingContext2D, p: DerbyPlayer, myId: string) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.heading);
  ctx.fillStyle = p.color as any;
  ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
  ctx.fillStyle = 'white';
  ctx.fillRect(p.w / 2 - 4, -3, 6, 6);
  ctx.restore();

  // health bar
  const hw = 30, hh = 4, hx = p.x - hw / 2, hy = p.y - p.h / 2 - 10;
  ctx.strokeRect(hx, hy, hw, hh);
  ctx.fillRect(hx, hy, hw * (p.health / 100), hh);

  if (p.id === myId) {
    ctx.font = '10px sans-serif';
    ctx.fillText('You', p.x - 12, p.y + p.h / 2 + 12);
  }
}

function generateRandomHexColor(): string {
  // Generate a random number between 0 and 16777215 (0xFFFFFF)
  const randomNum = Math.floor(Math.random() * 0xFFFFFF);

  // Convert the number to a hexadecimal string
  let hexColor = randomNum.toString(16);

  // Pad the string with leading zeros if necessary to ensure 6 characters
  while (hexColor.length < 6) {
    hexColor = "0" + hexColor;
  }

  // Prepend '#' to create a valid hex color string
  return `#${hexColor.toUpperCase()}`;
}
