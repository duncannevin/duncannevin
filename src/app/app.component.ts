import { Component } from '@angular/core';
import {NavigationComponent} from './components/navigation.component';
import {HeroComponent} from './components/hero.component';
import {GameComponent} from './components/game.component';
import {AboutComponent} from './components/about.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="min-h-screen bg-background">
      <app-navigation></app-navigation>
      <app-hero></app-hero>
      <app-about></app-about>
      <app-game></app-game>
    </div>
  `,
  imports: [GameComponent, HeroComponent, NavigationComponent, AboutComponent],
  standalone: true,
})
export class AppComponent {
  title = 'duncannevin.com';
}
