import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  passMatch=true;
  isVisible=false;

  
  constructor(private auth:AuthService, private router:Router,  private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {

    this.socialAuthService.authState.subscribe((user) => {
      if(user){
        this.auth.setLoggedIn();
        localStorage.setItem('user', JSON.stringify(user))
        // localStorage.setItem('token', JSON.stringify(res.data.token))
        this.auth.setLoggedIn();
      }
   
    });
  }

  register(form:any){
    this.auth.register({...form.value}).subscribe((res:any)=> {
      if(res[0]?.email){
        this.auth.login({...form.value}).subscribe((res:any)=> {
          if(res.token){
           console.log('in')
          
            localStorage.setItem('user', JSON.stringify(res.user))
            localStorage.setItem('token', JSON.stringify(res.token))
              this.auth.setLoggedIn();
              this.router.navigate(['/create-ads'])
          }else {
            Swal.fire('An Error Occured',res.Message,'error')
          }
        })
      }else {
        Swal.fire('An Error Occured',res.Message,'error')
      }
    }, (err: any) => { 
      Swal.fire('An Error Occured',err.error.message[0],'error')
    })
  }

  gotoLogin(){
    this.router.navigate(['/login'])
  }

  checkPass(pass:string, pass2:string){
    if(pass === pass2){
      this.passMatch =true;
    }else {
      this.passMatch=false;
    }
  }

  showModal(){
    this.isVisible=true;
  }
  handleCancel(){
    this.isVisible=false;
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  loginWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  logOut(): void {
    this.socialAuthService.signOut();
  }
}
