import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/common-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.css']
})
export class PersonalProfileComponent implements OnInit {
  passMatch =true;

  constructor(private commonService: CommonServiceService) { }
  adsData:any
  user: any;
  loading =false;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.commonService.getUserAds().subscribe(data=>{
      this.adsData  =data[0];
    })
  }
  updatePersonalProfile(data:any){
    if(data.value.alt_email === this.user.email){
      Swal.fire('Email cannot be same as current email', '','error');
      return
    }
    this.commonService.updatePersonalProfile({...data.value,
      email: this.user.email,
      id:this.user.id}).subscribe((res:any) => {
      this.user = res[0]
      localStorage.setItem('user', JSON.stringify(res[0] || '{}'))
      Swal.fire('Success', 'Personal Profile Updated Successfully', 'success')
    }, (error:any)=> {
      Swal.fire('Something Went Wrong!', error.error.message,'error')
    })
  }



}
