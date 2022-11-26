import { HttpClient, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService implements HttpInterceptor {

  constructor(private http:HttpClient) { 
    
  }

  intercept(req:any, next:any) {
    let tokenValue = localStorage.getItem('token');
 
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${tokenValue} `,
      },
    });
    return next.handle(tokenizedReq);
  }
  
  baseUrl = environment.baseUrl;
  typeOfBlock= new BehaviorSubject<number>(0);
  blocksInCart= new BehaviorSubject<number>(0);
  index= new BehaviorSubject<number>(0);
  userAds= new BehaviorSubject<any>({});
  blocksData:any;
  adsData:any;
  userIp:any;


  setUserIp(data:any){
    this.userIp = data
  }

  getUserIp(){
    return this.userIp;
  }
  getBlocksInCart(){
    return this.blocksInCart.asObservable()
  }
  getIndexCart(){
    return this.index.asObservable()
  }
  getTypeCart(){
    return this.typeOfBlock.asObservable()
  }
  setBlocksInCart(num:number, type: number, index:number, data: any){
    this.blocksInCart.next(num)
    this.typeOfBlock.next(type)
    this.typeOfBlock.next(index)
    // console.log(data);
    this.blocksData =data
  }
  getBlocksInCartValue(){
    return this.blocksInCart.getValue();
  }
  getBlocksData(){
    return this.blocksData;
  }

  checkout(data:any){
    return this.http.post(this.baseUrl + '/create-ad', data);
  }
  setAdsData(data:any){
    this.adsData =data
  }
  getAdsData(){
    return this.adsData;
  }
  
  getHomepageData(data:any){
    return this.http.post(this.baseUrl + '/search-ads', data);
  }
  uploadAdsImage(fd:any){
    return this.http.post(this.baseUrl + '/upload-image', fd);
  }

  getAllUserAds(data: any){
    return this.http.get(this.baseUrl + '/get-all-user-ads', { params: data});
  }

  uploadImage(data:any){
    return this.http.post(this.baseUrl + '/upload-image', data);
  }

  getAds(){
    let user = JSON.parse(localStorage.getItem('user')|| '{}');
    this.getAllUserAds({
      "user_id":user.id
    }).subscribe((res: any) => {
      this.userAds.next(res.sort((a:any, b:any) => (a.id > b.id) ? -1 : 1));
    }, (err: any) => {
      Swal.fire('Error', err.error.message, 'error');
    })
  }

  getUserAds(){
    return this.userAds.asObservable();
  }

  updateBusinessProfile(data:any){
    return this.http.post(this.baseUrl + '/update-business-profile', data);
  }
  updatePersonalProfile(data:any){
    return this.http.post(this.baseUrl + '/update-personal-profile', data);
  }
  getLocation(){
    return this.http.post("https://www.googleapis.com/geolocation/v1/geolocate?key=" + environment.GOOGLE_KEY, {});
  }

  getAddress(lat:string, lon:string) {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=" + environment.GOOGLE_KEY);
  }

  getAddressPincode(address:string) {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ address + "&key=" + environment.GOOGLE_KEY);
  }

  submitLead(data:any){
    return this.http.post(this.baseUrl + '/create-ad-stats', data);
  }


  getStatistics(data:any){
    return this.http.get(this.baseUrl + '/get-ad-stats', {params: data});
  }

  getDashboardStatistics(data:any){
    return this.http.get(this.baseUrl + '/get-dashboard-data', {params: data});
  }
  updatePass(form:any){
    return this.http.post(this.baseUrl + '/reset-password', form);
  }
  getLoc(){
    return this.http.get("https://ipapi.co/json");
  }

  requestOtp(body:any){
    return this.http.post(this.baseUrl + '/validate-data', body);
  }

  validateOtp(body:any){
    return this.http.post(this.baseUrl + '/validate-otp', body);
  }
}
