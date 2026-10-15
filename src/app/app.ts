import { Component, signal } from '@angular/core';
import { PokemonForm } from './pokemon-form/pokemon-form';

@Component({
  imports: [PokemonForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('pokemon-app');
}
