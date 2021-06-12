import {Injectable} from '@angular/core'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable} from 'rxjs'


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader = {
      'x-rapidapi-key': '5a6f8f78f0mshcc75449283bb9b8p109733jsne0369714e9a0',
      'x-rapidapi-host': 'covid-193.p.rapidapi.com'
    }
    const authReq = request.clone({setHeaders: authHeader})
    return next.handle(authReq)
  }
}
