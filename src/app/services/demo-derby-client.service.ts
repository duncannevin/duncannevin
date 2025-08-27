import {Injectable, NgZone} from '@angular/core';
import {Socket, Channel, ConnectionState} from 'phoenix';

export interface DerbyPlayer {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  heading: number;
  health: number;
  speed: number;
}

export interface DerbySnapshot {
  t: number;
  players: DerbyPlayer[];
}

@Injectable({
  providedIn: 'root'
})
export class DemoDerbyClientService {
  private socket?: Socket;
  private channel?: Channel;

  socketState: ConnectionState = 'connecting';

  constructor(private zone: NgZone) { }

  connectSocket(wsUrl: string, params?: Record<string, unknown>) {
    if (this.socket) return;

    this.zone.runOutsideAngular(() => {
      this.socketState = 'connecting';
      console.log('Connecting to', wsUrl, 'with params', params);
      this.socket = new Socket(wsUrl, {params, reconnectAfterMs: (_tries) => Infinity});
      this.socket.connect();
      this.socketState = this.socket.connectionState()
      this.socket.onError((_err) => {
        this.socket?.disconnect();
        this.socketState = 'closed';
      })
    });
  }

  joinArena(topic: string, joinParams: { name?: string, color?: string }) {
    if (!this.socket) throw new Error('Socket not connected');

    this.channel = this.socket.channel(topic, joinParams);

    return new Promise<{ me: DerbyPlayer; arena: { w: number; h: number }; }>((resolve, reject) => {
      this.channel!
        .join()
        .receive('ok', (payload) => resolve(payload))
        .receive('error', (err) => reject(err));
    });
  }

  onWelcome(cb: (p: { me: DerbyPlayer }) => void)   { this.channel?.on('welcome', cb as any); }
  onState(cb: (snap: DerbySnapshot) => void)        { this.channel?.on('state', cb as any); }
  onPlayerJoined(cb: (p: DerbyPlayer) => void)      { this.channel?.on('player_joined', cb as any); }
  onPlayerLeft(cb: (msg: { id: string }) => void)   { this.channel?.on('player_left', cb as any); }

  pushInput(input: { throttle: number; turn: number; brake: boolean; seq: number }) {
    this.channel?.push('input', { input });
  }

  leave() {
    this.channel?.leave();
    this.channel = undefined;
  }

  disconnect() {
    this.leave();
    this.socket?.disconnect(() => {});
    this.socket = undefined;
  }
}
