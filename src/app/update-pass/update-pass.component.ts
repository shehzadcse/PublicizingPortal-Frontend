import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-update-pass',
  templateUrl: './update-pass.component.html',
  styleUrls: ['./update-pass.component.css']
})
export class UpdatePassComponent implements OnInit {
  passMatch=true;
  user:any;
  adsData:any;
  constructor(private commonService:CommonServiceService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.commonService.getUserAds().subscribe(data=>{
      this.adsData  =data[0];
    })
  }

  checkPass(pass:string, pass2:string){
    if(pass === pass2){
      this.passMatch =true;
    }else {
      this.passMatch=false;
    }
  }

  updatePass(form:any){
    this.commonService.updatePass({id:this.user.id, password:form.value.password, oldPassword: form.value.oldPassword}).subscribe((res:any) => {
      Swal.fire('Success', 'Password Updated Successfully', 'success')
      form.reset();
      this.passMatch =true;
    } , (error:any)=> {
      Swal.fire('Something Went Wrong!', error.error.message[0],'error')
    } )
  }
}
