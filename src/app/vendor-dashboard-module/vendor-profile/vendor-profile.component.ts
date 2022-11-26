import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'ng-zorro-antd/menu';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { filter } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth.service';
import { CommonServiceService } from '../../common-service.service';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.css'],

})
export class VendorProfileComponent implements OnInit {
  

  constructor(private http: HttpClient, private msg: NzMessageService, private router:Router,private commonService:CommonServiceService,private auth:AuthService) {}



  adsData:any;
  user:any
  ngOnInit(): void {
   if(!localStorage.getItem('token')) {
    this.router.navigate(['/login'])
   }else {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.commonService.getAds()
   }

  }


}
