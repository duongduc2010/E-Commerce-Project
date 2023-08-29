import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SignUp, login } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class SellService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  isLoginError = new EventEmitter<boolean>(false)


  constructor(private http:HttpClient, private router:Router) { }
  // Dang ky + Them data tài khoản vào API
  userSignUp (data:SignUp){
    this.http.post(`http://localhost:3004/seller`, data,
    { observe : 'response' }
    ).subscribe((result)=>{
      console.warn(result)
      if(result){
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      }
    }); 
  }
  // 
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }
  userLogin(data:login){
    console.warn(data)
    this.http.get(`http://localhost:3004/seller?email=${data.email}&password=${data.password}`,
    {observe:'response'}
    ).subscribe((result:any)=>{
      console.warn(result)
      if(result && result.body && result.body.length){
        console.warn("user loged in")
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      }
      else{
        console.warn("login failed")
        this.isLoginError.emit(true)
      }
    });
  }

}
