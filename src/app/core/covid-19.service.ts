import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import {environment} from '../../environments/environment'


@Injectable({providedIn: 'root'})
export class CovidService {

  constructor(private httpClient: HttpClient) { }


  /*** TO GET ALL COVID-19 VALUES BY COUNTRIES: ***/
  getAllCountriesValues(): any {
    return this.httpClient.get<Response>(environment.countryBaseUrl)
      .pipe(map((res: Response) => res))
  }

  /*** TO GET ALL COVID-19 VALUES BY FEDERAL STATES: ***/
  getProBundesland(bundeslandId: number): any {
    return this.httpClient.get<Response>(
      environment.federalStatesBaseUrl + bundeslandId + environment.federalStatesQueriesUrl)
      .pipe(map((res: Response) => res))
  }

}
