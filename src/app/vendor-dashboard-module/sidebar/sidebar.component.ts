import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CommonServiceService } from 'src/app/common-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],

})
export class SidebarComponent implements OnInit {
  adsData: any;
  user:any;
  constructor(private commonService:CommonServiceService, private router:Router, private route:ActivatedRoute) { }
  activeUrl='';
  addClassBool=false;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.commonService.getUserAds().subscribe(data=>{
      this.adsData  =data[0];
      
    })
    this.activeUrl = this.router.url.replace('/vendor-profile','').split('?')[0].trim()
    this.router.events.pipe().subscribe((event: any) => {
      //  this.activeUrl =this.router.url.replace('/vendor-profile','')
       this.activeUrl = this.router.url.replace('/vendor-profile','').split('?')[0].trim()
      //  console.log(this.activeUrl);
    });
  }

  addClass(){
    this.addClassBool =!this.addClassBool
  }
  logout(){
  
    localStorage.clear();
    this.router.navigate(['/']);
    setTimeout(() => {
      window.location.reload();
    },10)
  }
}
