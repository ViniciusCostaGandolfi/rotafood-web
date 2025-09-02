import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { TokenService } from '../services/jwt-token/token.service';
import { Router } from '@angular/router';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService)
  const router = inject(Router);


  if (tokenService.hasToken()) {
    if (tokenService.hasExpired()) {
      tokenService.deleteToken();
      router.navigate(['/entrar']); 
      return throwError(() => new Error('Token expirado'));
    }
    const AuthTokenDto = tokenService.getToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${AuthTokenDto}`)
    });
    
    return next(authReq);
  }
  return next(req);
};


