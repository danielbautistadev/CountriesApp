import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'region-table',
  templateUrl: './region-table.component.html',
  styles: ``
})
export class RegionTableComponent {

  // 1. Declarar una propiedad de tipo Country[] llamada countries. Esta propiedad debe ser pública y estar inicializada con un array vacío. Esta propiedad se utilizará para almacenar la lista de países que se mostrarán en la tabla.
  @Input() public countries: Country[] = [];

}
