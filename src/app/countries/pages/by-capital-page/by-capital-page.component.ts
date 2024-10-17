import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false; // 1. Inicializamos un propiedad booleana en false para mostrar el spinner cuando se realiza la petición HTTP

  constructor( private countriesServices: CountriesService ) {

  }

  searchByCapital( term: string ): void {

    this.isLoading = true; // 2. Cuando se realiza la petición HTTP, cambiamos el valor de la propiedad a true para mostrar el spinner
    this.countriesServices.searchCapital(term)
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false; // 3. Cuando se recibe la respuesta de la petición HTTP, cambiamos el valor de la propiedad a false para ocultar el spinner
      });

  }

}
