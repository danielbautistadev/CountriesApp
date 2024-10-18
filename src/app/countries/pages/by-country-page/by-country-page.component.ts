import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-bycountry-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  // creamos una propiedad pública llamada countries que es un arreglo de objetos de tipo Country.
  public countries: Country[] = []; 

  public initialValue: string = '';

  // inyecto el servicio CountriesService en el constructor de la clase.
  constructor( private countriesService: CountriesService ) {

  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  // creamos un método público llamado 'searchByCountry' que recibe un parámetro de tipo string llamado 'term'. Este método se encarga de llamar al método 'searchCountry' del servicio 'countriesService' y pasarle el término de búsqueda como argumento. Luego, nos suscribimos al observable que devuelve el método 'searchCountry' y asignar el resultado a la propiedad countries de la clase.
  searchByCountry( term: string ): void {
    this.countriesService.searchCountry( term )
      .subscribe( countries => {
        this.countries = countries;
      } );
  }

}
