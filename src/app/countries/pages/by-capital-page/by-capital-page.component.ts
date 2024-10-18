import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false; // 1. Inicializamos un propiedad booleana en false para mostrar el spinner cuando se realiza la petición HTTP
  public initialValue: string = '';

  constructor( private countriesServices: CountriesService ) {  }

  ngOnInit(): void {
    // 4. Al inicializar el componente, obtenemos los países almacenados en el servicio para mostrarlos en la vista sin necesidad de realizar una nueva petición HTTP
    this.countries = this.countriesServices.cacheStore.byCapital.countries; 
    this.initialValue = this.countriesServices.cacheStore.byCapital.term;
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
