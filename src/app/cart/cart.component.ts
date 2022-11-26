import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { AuthService } from '../auth.service';
import { CommonServiceService } from '../common-service.service';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  loggedId: any;
  user: any;
  description: any;
formSubmitted = false;
 loading= false;
  constructor(private route:ActivatedRoute,
              private router:Router, 
              private commonService: CommonServiceService,
              private auth: AuthService
              ) { }


  blocks:any =0;

  blocksData:any;
  errors:any={
    name: false,
    email: false,
    phone:false,
    company_name: false,
    tagline: false,
    city_name: false,
    pincode: false,
    state: false,
    country: false,
    addressLine1: false
  }


  ngOnInit(): void {

    this.route.queryParams.subscribe((params)=> {
      this.blocks = params['count'];

      if(!params['count']){
        this.router.navigate(['/create-ads'])
      }
      // console.log(params)
      this.blocksData = {
        hBlocks: params['hblocks'],
        wBlocks: params['wblocks'],
      }
    })

    this.auth.loggedInSubscription().subscribe((res:any) => {
      this.loggedId = res;
      let locUser:string =localStorage.getItem('user') || '{}'
      this.user = JSON.parse(locUser);

    })
    
  }

  checkForm(form:any){
    if(this.formSubmitted){
      Object.keys(form.value).forEach(key => {
        if(!form.value[key]){
          this.errors[key] = true;
          // document.getElementById(key)?.focus();
        }else {
          this.errors[key] = false;
        }
      })
    }
     

  }
  checkout(form:any){
    if(this.loading){
      return;
    }
    this.formSubmitted = true;
    if(!form.valid){
      Object.keys(form.value).forEach(key => {
        if(!form.value[key]){
          this.errors[key] = true;
         
        }
      })
      console.log(this.errors)
      // Swal.fire('Please Fill All Details','','error')
      return;
    }
    this.loading= true;
    this.commonService.checkout({
      ...form.value,blocksData: this.blocksData,
      isLoggedIn: localStorage.getItem('token') !== undefined || false,
      email: this.user?.email || form.value.email,

    }).subscribe((val: any) => {
      this.loading= false;
      Swal.fire('Purchase Complete','Thank you for your purchase' ,'success').then(()=>
      {
        this.commonService.setBlocksInCart(0,0,0, {});
        this.commonService.setAdsData(val)
        localStorage.setItem('token', 'asdasdasd');
        localStorage.setItem('user', JSON.stringify({
          ...this.user,
          id: val[0].user_id,
          email: this.user?.email|| form.value.email,
          name: form.value.name,
          phone: form.value.phone,
          status: 'inactive',
          email_verified: false,
          phone_verified: false,
        }));
        this.auth.setLoggedIn()
        this.commonService.getAds()

        if(localStorage.getItem('token')){
          
          this.router.navigate(['vendor-profile', 'business-profile'])
        }else {
          this.router.navigate(['/login'])
        }
    
      })
    
    }, (err: any) => { 
      this.loading= false;
      Swal.fire('An Error Occured',err.error.message,'error')
    })
 
  }

  onDescChange(event:any){
    if(event.length <= 400){
    this.description = event;
    }
  }
}
