import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import {map} from 'rxjs/operators'
// @ts-ignore
import {v4 as uuid} from 'uuid'


@Injectable({providedIn: 'root'})
export class CovidService {
  private readonly baseUrl: string

  constructor(
    private httpClient: HttpClient,
  ) {
    this.baseUrl = 'https://covid-193.p.rapidapi.com/statistics'
  }


  /*** TO GET ALL COUNTRIES VALUES: ***/
  getAll(queryParam?: HttpParams): any {
    return this.httpClient.get<Response>(this.baseUrl, {params: queryParam})
      .pipe(map((res: Response) => res))
  }

}
