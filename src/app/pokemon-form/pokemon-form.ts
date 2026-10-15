import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-form',
  imports: [ReactiveFormsModule],
  templateUrl: './pokemon-form.html',
  styleUrl: './pokemon-form.css',
})
export class PokemonForm {
  private formBuilder = inject(FormBuilder);
  pokemonService = inject(Pokemon);

  pokemonForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    level: [1, [Validators.required, Validators.min(1)]],
    nature: ['', Validators.required],
  });

  onSubmit() {
    alert('1. Button clicked');
    if(this.pokemonForm.valid){
      this.pokemonService.savePokemon(this.pokemonForm.getRawValue()).subscribe({
        next: () => {
          alert('2. Saved!');
          this.pokemonService.fetchPokemon(); // Refresh Data
          this.pokemonForm.reset(); // Clear Form
        },
        error: (err) => alert('ERROR: ' + err.status + ' ' + err.message)
      });
    }
  }
}