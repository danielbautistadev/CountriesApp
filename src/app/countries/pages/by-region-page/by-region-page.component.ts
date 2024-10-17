import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

// 2. Definimos un tipo personalizado llamada 'Region' que es una unión de cinco cadenas de texto: 'Africa', 'Americas', 'Asia', 'Europe' y 'Oceania'. Este tipo se utiliza para especificar las regiones disponibles para la búsqueda de países.
type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania'; 

@Component({
  selector: 'app-by-regionl-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public countries: Country[] = [];
  // 1. Declaramos una propiedad llamada 'regions' que es un arreglo de tipo 'Region'. El tipo 'Region' es probablemente un tipo personalizado que se ha definido en la aplicación. Este arreglo contiene las regiones disponibles para la búsqueda de países.
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  constructor( private countriesService: CountriesService ) {

  }
  // el método 'searchByRegion' toma un parámetro llamado 'region' de tipo 'Region'. Cuando se llama a este método, se asigna el valor del parámetro 'region' a la propiedad 'selectedRegion'. Luego, se llama al método 'searchRegion' del servicio 'countriesService' y se le pasa el valor de 'region' como argumento. El método 'searchRegion' devuelve un Observable que emite un arreglo de objetos de tipo 'Country'. Cuando el Observable emite un valor, se asigna a la propiedad 'countries' del componente.
  searchByRegion( region: Region ):void {

    this.selectedRegion = region;

    this.countriesService.searchRegion( region )
      .subscribe( countries => {
        this.countries = countries;
      } );
  }

}
