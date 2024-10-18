import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';
import { CountriesService } from '../../services/countries.service';



@Component({
  selector: 'app-by-regionl-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  // 1. Declaramos una propiedad llamada 'regions' que es un arreglo de tipo 'Region'. El tipo 'Region' es probablemente un tipo personalizado que se ha definido en la aplicación. Este arreglo contiene las regiones disponibles para la búsqueda de países.
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  constructor( private countriesService: CountriesService ) {

  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
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
