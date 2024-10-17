import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })

export class CountriesService {
    // creamos una propiedad privada llamada 'apiUrl' que contiene la URL base de la API que vamos a utilizar.
    private apiUrl: string = 'https://restcountries.com/v3.1';

    // asignamos al construdtor de la clase 'CountriesService' un parámetro privado llamado 'http' de tipo 'HttpClient' que nos permitirá realizar peticiones HTTP a la API.
    constructor(private http: HttpClient) { }

    // construye un método publico llamado 'searchCountryAll' que devuelve un Observable de tipo 'Country[]'. Esta función se utiliza para obtener una lista de todos los países de la API. La URL de la petición se construye concatenando la URL base de la API y la ruta '/all'. Luego, se utiliza el método 'get' del objeto 'http' para realizar la petición y se utiliza el operador 'pipe' para encadenar una serie de operadores que transforman y manejan la respuesta de la API.
    searchCountryAll(): Observable<Country[]> { 
        const url: string = `${this.apiUrl}/all`;
        return this.http.get<Country[]>(url).pipe(
            catchError(error => of([]))
        );
    }

    // creamos un método público llamado 'searchCountryByAlphaCode' que recibe un parámetro 'code' de tipo 'string' y devuelve un Observable de tipo 'Country | null'. Esta función se utiliza para buscar un país por su código alfa (alpha code) en la API. La URL de la petición se construye concatenando la URL base de la API, la ruta '/alpha/' y el código alfa del país. Luego, se utiliza el método 'get' del objeto 'http' para realizar la petición y se utiliza el operador 'pipe' para encadenar una serie de operadores que transforman y manejan la respuesta de la API. 

    searchCountryByAlphaCode( code: string ): Observable<Country | null> {
        const url: string = `${this.apiUrl}/alpha/${code}`;
        
        return this.http.get<Country[]>( url )
            .pipe(
                map( countries => countries.length > 0 ? countries[0] : null),
                catchError( () => of(null))
            );
    }

    searchCapital( term: string ): Observable<Country[]> {
        const url: string = `${this.apiUrl}/capital/${term}`;
        return this.http.get<Country[]>( url )
            .pipe(
                catchError( error => of([]))
            );
    }

    searchCountry( term: string ): Observable<Country[]> {
        const url: string = `${this.apiUrl}/name/${term}`;
        return this.http.get<Country[]>(url)
            .pipe(
                catchError( error => of([]) )
            )
    }

    searchRegion( region: string ): Observable<Country[]> {
        const url: string = `${this.apiUrl}/region/${region}`;
        return this.http.get<Country[]>(url)
            .pipe(
                catchError( error => of([]) )
            )
    }
    
}