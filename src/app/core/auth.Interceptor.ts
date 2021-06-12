import {Injectable} from '@angular/core'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable} from 'rxjs'
import {environment} from '../../environments/environment'
import {constAuthHeader} from '../shared/constante'


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authHeader = {}

    if (request.url === environment.countryBaseUrl) {
      authHeader = constAuthHeader
    }

    const authReq = request.clone({setHeaders: authHeader})
    return next.handle(authReq)
  }
}
