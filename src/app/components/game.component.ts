import { Component } from '@angular/core';
import { DemoderbyComponent } from './demoderby.component';
import {DemoDerbyClientService} from '../services/demo-derby-client.service';

@Component({
  selector: 'app-game',
  template: `
    @if (client.socketState !== 'closed') {
      <section class="py-16 bg-background">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-8 text-foreground">Demo Derby Game</h2>
          <app-demoderby
            wsUrl="wss://demo.duncannevin.com:4000/socket"
            topic="arena:lobby"></app-demoderby>
        </div>
      </section>
    }
  `,
  styles: [],
  imports: [DemoderbyComponent],
  standalone: true,
})
export class GameComponent {
  constructor(public client: DemoDerbyClientService) {
  }
}
