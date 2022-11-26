import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { CommonServiceService } from 'src/app/common-service.service';
import * as data from '../../../assets/cities'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('toggleButton') toggleButton: ElementRef | any;
  @ViewChild('menu') menu: ElementRef | any;

  @Input() loggedId: any=false;
  @Input() user:any;
  cities=data.data
  selectedCity = ''
  search=''
  constructor(private router:Router,
              private route:ActivatedRoute, 
              private commonService:CommonServiceService, 
              private auth: AuthService,
              private nzContextMenuService: NzContextMenuService) { 


  }
 

  

  onShow=false;
  showInvalidCred =false
  blocksSub:any ;
  count=0;
  allLocation:any;
  adsData:any;


  onValChange(event:any){
    this.search = event
  }

  getLocationPromise () {
    // console.log(GeolocationCoordinates)
    return new Promise(function (resolve, reject) {

        // Promisifying the geolocation API
        navigator.geolocation.getCurrentPosition(
            (position) => resolve(position),
            (error) => reject(error),
            {enableHighAccuracy:true}
        );
    });
};

async getLoc() {
  try{
    const pos:any = await this.getLocationPromise()
     let lat = pos?.coords?.latitude
     let lng = pos?.coords?.longitude
     return {lat,lng}
  }catch(err){
    console.log(err)
    return {}
  }
}

async getLocApi(){
  try{
    let loc= await this.commonService.getLoc().toPromise()
    return loc;
  }catch(err){
    console.log(err)
    return {};
  }


}

  ngOnInit(): void {
    console.log(this.cities)
    this.commonService.getUserAds().subscribe(data=>{
      this.adsData  =data[0];
      
    })
    this.route.queryParams.subscribe(async (params) => {
      let location:any = {}
      let lat;
      let lng;
      // location = await this.getLocApi();
      if(!location?.city){
      try{
      
        let gLoc= await this.getLoc();
        lat = gLoc?.lat
        lng = gLoc?.lng
        if(!lat || !lng){
        let res:any =await this.commonService.getLocation().toPromise()
        lat=res?.location?.lat;
        lng=res?.location?.lng;
        }
        let loc:any= await this.commonService.getAddress(lat,lng).toPromise()
        let pincode =  loc?.results[0]?.address_components?.filter((val:any) => val.types.includes('postal_code'));
        if(pincode.length>0){
          // alert( pincode[0].long_name);
        loc = await this.commonService.getAddressPincode( pincode[0].long_name).toPromise();
        }
        let loc2 = loc?.results[0]?.address_components?.filter((val:any) => val.types.includes('locality'))
        let allLocalities = loc?.results[0]?.postcode_localities?.map((val:any)=> val.toLowerCase()) || []
        loc = loc?.results[0]?.address_components?.filter((val:any) => val.types.includes('administrative_area_level_2'))
        location= {
          city:  'Delhi',
          ip: lat.toString() + lng.toString() 
        }
        // console.log(loc2[0]?.long_name, loc[0]?.long_name)
        
        let found:any = []
        let found2:any=[]
        if(loc2.length){

          found = this.cities.filter((val:any)=> val.toLowerCase() === loc2[0]?.long_name?.toLowerCase())
        }
        if(loc.lenth){

          found2 =  this.cities.filter((val:any)=> val.toLowerCase() === loc[0]?.long_name?.toLowerCase())
        }
        let found3 = this.cities.filter((val) => {
          return allLocalities.includes(val.toLowerCase());
        })
// console.log(found3, allLocalities)
        if(found3.length> 0){
          location.city = found3[0]
        } else if(loc.length &&found2.length){
          location.city = loc[0].long_name
        }else if(loc2.length &&found.length){
          console.log('in')
          location.city = loc2[0].long_name
        }
      }catch(err){
        console.log(err)
        location = {
          city: 'Delhi',
          ip: '127.4.4.5'
        }
      }
    }
        this.allLocation = location;
        this.selectedCity =    location.city
      
    
      this.commonService.setUserIp(this.allLocation.ip)

      if(!params['location'] ){
        let actRoute=  this.router.url.split('?')[0].split("/").filter(val => val);
       
        this.router.navigate(actRoute, { queryParams: { ...params,location: this.selectedCity } })
        
      }else {
        this.selectedCity = params['location']
        
      }
      if(params['search']){
        this.search = params['search']
      }
      console.log(this.selectedCity)
    })

    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.blocksSub = this.commonService.getBlocksInCart().subscribe(val => {
      if(! isNaN(+val)){
        this.count  =val;
      }
      // console.log(this.blocksSub);
    })
    // this.count= this.commonService.getBlocksInCartValue();
  
    this.auth.loggedInSubscription().subscribe((res:any) => {
      this.loggedId = res;
      let locUser:string =localStorage.getItem('user') || '{}'
      this.user = JSON.parse(locUser);

    })
    if(this.user.email){
      this.loggedId =true;
    }



  }
  ngOnDestroy(): void {
    this.blocksSub.unsubscribe();
  }

  toggleShow(){
    this.onShow =!this.onShow
  }
  goToCart()
  {
    // if(!this.loggedId){
    //   this.toggleShow()
    //   return;
    // }

    
    // if(this.count > 0){
    //   this.router.navigate(['/cart'])
    // }else {
      this.closeMenu()
      setTimeout(() => {
        this.router.navigate(['/create-ads'])

      },0)
    // }
    
  }

  gotoVendor(){
    this.closeMenu()
    this.router.navigate(['/vendor-profile'])
    this.onShow =false
    // window.location.href = "http://ads-proj-laravel.herokuapp.com/bussiness_profile"
    // window.open('http://ads-proj-laravel.herokuapp.com/bussiness_profile')
  }
  goToHome()
  {
    this.closeMenu()
    this.router.navigate(['/'])
    this.onShow =false;
  }
  goToAds()
  {
    this.router.navigate(['/create-ads'])
    this.onShow=false;
  }
  onSignOut()
  {
    this.loggedId=false
    this.onShow=false
    this.adsData = null
    localStorage.clear();
    this.router.navigate(['/']);
    setTimeout(() => {
      window.location.reload();
    },10)
      
  }

  gotoRegister(){
    this.router.navigate(['/register'])
    this.onShow=false
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }

  onLocationChange(e:any){
    this.selectedCity =e
    this.router.navigate(['/'], { queryParams: { location: e, search: this.search } })
  }

  onSearchChange(e:any){

    this.search =e.target.value
    this.router.navigate(['/'], { queryParams: { location: this.selectedCity, search: this.search  } })
  }

  clearSearch(){
    this.search = ''
    this.router.navigate(['/'], { queryParams: { location: this.selectedCity, search: this.search  } })

  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  closeMenu(): void {
    console.log(document.getElementById("click"))
    document.getElementById("click")?.click()
  }
}
