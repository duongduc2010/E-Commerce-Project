import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SellService } from './services/sell.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor( private sellerService:SellService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):| Observable<boolean | UrlTree>| Promise<boolean | UrlTree>| boolean| UrlTree {
    
    if(localStorage.getItem('seller')){
      return true
    }
    return this.sellerService.isSellerLoggedIn;
  }
}