import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { CommonServiceService } from 'src/app/common-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit {
  description= '';
  tags=[];
  loading=false;
  @ViewChild('search')
  public searchElementRef!: ElementRef;

  constructor(private commonService:CommonServiceService, 
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }
  adsData:any;
  user:any;

  latitude!: number;
  longitude!: number;
  zoom!: number;
  address!: string;
  private geoCoder:any;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')|| '{}');
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          this.getAddress(this.latitude, this.longitude);
        });
      });
    });
    this.commonService.getUserAds().subscribe(data=>{
      this.adsData  =data[0];
      if(this.adsData?.tags){
      this.tags = this.adsData?.tags?.split(",");
      }
      this.description =this.adsData?.description || ''
    })
  }


  getData() {
    this.commonService.getAds()
  }
  uploadImage(image:any){
    if(!image?.files?.length){
      return;
    }
    let fd = new FormData();
    fd.append('image', image.files[0]);
    fd.append('ad_id',this.adsData.id );
    this.loading = true;
    this.commonService.uploadImage(fd).subscribe(() => {
      this.loading = false;
      this.getData();
      Swal.fire('Success', 'Image Updated Successfully', 'success')
    }, (error:any)=> {
      Swal.fire('Something Went Wrong!', 'Please Upload An Image Less Than 2 MB','error')
      this.loading = false;
    })
  }

  updateBusinessProfile(data:any){
    this.commonService.updateBusinessProfile({...data.value, id:this.adsData.id, tags: data.value?.tags?.join(",")}).subscribe((val:any) => {
      this.getData();
      Swal.fire('Success',
       'Business Profile Updated Successfully' + ( (!this.user.email_verified || !this.user.phone_verified )?  ' But your ad is still not active. Please verify your email or phone number to activate your ad.': '')
       , 'success')
    }, (error:any)=> {
      console.log(error);
      Swal.fire('Something Went Wrong!', error.error.message,'error')
    })
  }


  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  
  getAddress(latitude:number, longitude:number) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results:any, status:string) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    
    });
  }

  onDescChange(event:any){
    if(event.length <= 400){
    this.description = event;
    }
  }

  markerDragEnd($event: any) {
    console.log($event);
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.getAddress(this.latitude, this.longitude);
  }
}
