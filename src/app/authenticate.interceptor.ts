import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticateInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let local_token = localStorage.getItem('token');
    let clonereq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${local_token}`
      }
    })
    return next.handle(clonereq);
  }
}
