import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-all-country-page',
  templateUrl: './all-country-page.component.html',
  styles: ``
})
export class AllCountryPageComponent implements OnInit {

  // 1. Crear una propiedad para almacenar los países
  public countries: Country[] = []

  // 2. Inyectar el servicio de países en el constructor del componente
  constructor(private countriesService: CountriesService) { 

  }

  // 3. Crear un método para obtener todos los paises en un método publico llamado "searchCountriesAll" que se ejecute al inicializar el componente. Este método debe llamar al servicio de país para obtener la lista de países y asignarla a la propiedad "countries".
  ngOnInit(): void {
    this.searchCountriesAll();
  }

  searchCountriesAll(): void { 
    this.countriesService.searchCountryAll()
      .subscribe( 
        data => {
          this.countries = data;
          // console.log(this.countries);
        }
       );
  }
}
