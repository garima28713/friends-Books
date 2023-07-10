import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userToken = localStorage.getItem('token')
    const modifiedReq = request.clone({ 
      headers: request.headers.set('Authorization', `Bearer ${userToken}`),
    });
    return next.handle(modifiedReq);

  }
}
