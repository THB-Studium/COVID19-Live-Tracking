import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import {environment} from '../../environments/environment'


@Injectable({providedIn: 'root'})
export class CovidService {

  constructor(private httpClient: HttpClient) {
  }


  /*** TO GET ALL COVID-19 VALUES BY COUNTRIES:
   * The data come from the "rapidapi" free API (https://covid-193.p.rapidapi.com/statistics) ***/
  getAllCountriesValues(): any {
    return this.httpClient.get<Response>(environment.countryBaseUrl)
      .pipe(map((res: Response) => res))
  }

  /*** TO GET ALL COVID-19 VALUES BY FEDERAL STATES:
   * The data come from the arcgis free API (https://services7.arcgis.com/mOBPykOjAyBO2ZKk/ArcGIS/rest/services/) ***/
  getProBundesland(bundeslandId: number): any {
    return this.httpClient.get<Response>(
      environment.federalStatesBaseUrl + bundeslandId + environment.federalStatesQueriesUrl)
      .pipe(map((res: Response) => res))
  }

  /*** TO GET ALL COVID-19 VALUES OF ALL FEDERAL STATES:
   * The data come from the arcgis free API (https://services7.arcgis.com/mOBPykOjAyBO2ZKk/ArcGIS/rest/services/) ***/
  getforAllBundesland(): any {
    return this.httpClient.get<Response>(environment.fetchAllFederalStatesBaseUrl)
      .pipe(map((res: Response) => res))
  }

}
