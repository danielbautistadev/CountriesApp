import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'capital-table',
  templateUrl: './capital-table.component.html',
  styles: ``
})
export class CapitalTableComponent {

  // Crear una propiedad de tipo Country[] para almacenar un arreglo de países
  // El decorador @Input permite que esta propiedad sea accedida desde el componente padre (por ejemplo, el componente ByCapitalPageComponent) y se le pueda asignar un valor desde allí.
  @Input() public countries: Country[] = [];

}
