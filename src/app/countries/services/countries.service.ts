import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, map, of, delay } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })

export class CountriesService {
    // creamos una propiedad privada llamada 'apiUrl' que contiene la URL base de la API que vamos a utilizar.
    private apiUrl: string = 'https://restcountries.com/v3.1';

    // creamos una propiedad pública llamada 'cacheStore' que contiene un objeto de tipo 'CacheStore' que utilizaremos para almacenar en caché los resultados de las búsquedas realizadas por el usuario. Esta propiedad se inicializa con un objeto vacío.
    public cacheStore: CacheStore = {
        byCapital: { term: '', countries: [] },
        byCountries: { term: '', countries: [] },
        byRegion: { region: '', countries: [] },
    }

    // creamos un método privado llamado 'saveLocalStorage' que guarda el contenido de la propiedad 'cacheStore' en el almacenamiento local del navegador utilizando el método 'setItem' del objeto 'localStorage'. El primer parámetro es el nombre de la clave bajo la cual se almacenará el valor, y el segundo parámetro es el valor a almacenar, que se convierte a una cadena JSON utilizando el método 'stringify' del objeto 'JSON'.
    private saveLocalStorage() { 
        localStorage.setItem( 'cacheStore', JSON.stringify( this.cacheStore ) );
    }

    // creamos un método privado llamado 'loadLocalStorage' que carga el contenido del almacenamiento local del navegador en la propiedad 'cacheStore' utilizando el método 'getItem' del objeto 'localStorage'. El parámetro es el nombre de la clave bajo la cual se almacenó el valor. Si no existe ningún valor almacenado con esa clave, el método devuelve 'undefined', por lo que se utiliza el operador '!' para indicar que el valor no puede ser 'null' o 'undefined'. Si el valor existe, se convierte de una cadena JSON a un objeto utilizando el método 'parse' del objeto 'JSON' y se asigna a la propiedad 'cacheStore'.
    private loadLocalStorage() {
        if ( !localStorage.getItem('cacheStore') ) return;
        this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
    }


    // asignamos al construdtor de la clase 'CountriesService' un parámetro privado llamado 'http' de tipo 'HttpClient' que nos permitirá realizar peticiones HTTP a la API.
    constructor(private http: HttpClient) { 
        // console.log( 'CountriesService Initialized' );
        this.loadLocalStorage();
     }

    // creamos un método privado llamado 'getCountriesRequest' que devuelve un Observable de tipo 'Country[]' y recibe como parámetro llamado 'url' de tipo ´string' que representa la URL de la petición que vamos a realizar a la API. Este método utiliza el método 'get' del objeto 'http' para realizar la petición y se utiliza el operador 'pipe' para encadenar una serie de operadores que transforman y manejan la respuesta de la API. En este caso, se utiliza el operador 'catchError' para manejar cualquier error que pueda ocurrir durante la petición y devolver un Observable vacío en su lugar.
    private getCountriesRequest(url: string): Observable<Country[]> {
        return this.http.get<Country[]>( url ).pipe(
            // el operador 'catchError' se utiliza para manejar cualquier error que pueda ocurrir durante la petición. En este caso, se utiliza para devolver un Observable vacío en caso de que ocurra un error. El operador 'catchError' recibe como parámetro una función que se ejecuta cuando ocurre un error y devuelve un Observable que emite un valor en su lugar. En este caso, se utiliza el operador 'of' para crear un Observable que emite un array vacío en caso de que ocurra un error.
            catchError(error => of([])),
            // el operador 'delay()' se utiliza para agregar un retraso a la emisión de los valores del Observable. En este caso, se utiliza para simular un tiempo de carga de la petición y agregar un retraso de 2000 milisegundos (2 segundos) antes de emitir los valores.
            delay( 2000 )
        );
    }

    // construye un método publico llamado 'searchCountryAll' que devuelve un Observable de tipo 'Country[]'. Esta función se utiliza para obtener una lista de todos los países de la API. La URL de la petición se construye concatenando la URL base de la API y la ruta '/all'. Luego, se utiliza el método 'get' del objeto 'http' para realizar la petición y se utiliza el operador 'pipe' para encadenar una serie de operadores que transforman y manejan la respuesta de la API.
    searchCountryAll(): Observable<Country[]> { 
        const url: string = `${this.apiUrl}/all`;
        return this.getCountriesRequest(url);
    }

    // creamos un método público llamado 'searchCountryByAlphaCode' que recibe un parámetro 'code' de tipo 'string' y devuelve un Observable de tipo 'Country | null'. Esta función se utiliza para buscar un país por su código alfa (alpha code) en la API. La URL de la petición se construye concatenando la URL base de la API, la ruta '/alpha/' y el código alfa del país. Luego, se utiliza el método 'get' del objeto 'http' para realizar la petición y se utiliza el operador 'pipe' para encadenar una serie de operadores que transforman y manejan la respuesta de la API. 
    searchCountryByAlphaCode( code: string ): Observable<Country | null> {
        const url: string = `${this.apiUrl}/alpha/${code}`;
        
        return this.http.get<Country[]>( url )
            .pipe(
                // el operador 'map' sirve para transformar la respuesta de la API en un objeto de tipo 'Country' o 'null' si la respuesta está vacía. En este caso, se utiliza el operador 'map' para extraer el primer elemento del array de respuesta de la API y devolverlo como un objeto de tipo 'Country'. Si el array está vacío, se devuelve 'null'. También se utiliza el operador 'catchError' para manejar cualquier error que pueda ocurrir durante la petición y devolver 'null' en su lugar.
                map( countries => countries[0] || null ),
                catchError( () => of(null))
            );
    }

    searchCapital( term: string ): Observable<Country[]> {
        const url: string = `${this.apiUrl}/capital/${term}`;
        return this.getCountriesRequest(url).pipe(
            // El operador 'tap' se utiliza para realizar una acción secundaria en la secuencia de datos sin modificar los datos emitidos. En este caso, se utiliza para almacenar en la caché local los resultados de la búsqueda por capital. También se utiliza el método 'saveLocalStorage' para guardar los datos en el almacenamiento local del navegador.
            tap( countries => this.cacheStore.byCapital = { term, countries } ),
            tap( () => this.saveLocalStorage() ),
        );
    }

    searchCountry( term: string ): Observable<Country[]> {
        const url: string = `${this.apiUrl}/name/${term}`;
        return this.getCountriesRequest(url).pipe(
            tap( countries => this.cacheStore.byCountries = { term, countries } ),
            tap( () => this.saveLocalStorage() ),
        );
    }

    searchRegion( region: Region ): Observable<Country[]> {
        const url: string = `${this.apiUrl}/region/${region}`;
        return this.getCountriesRequest(url).pipe(
            tap( countries => this.cacheStore.byRegion = { region, countries } ),
            tap( () => this.saveLocalStorage() ),
        );
    }
    
}