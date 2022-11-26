import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonServiceService } from '../common-service.service';
import * as data from '../../assets/cities'
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  showScrollToTop =false;
  @HostListener('window:scroll', ['$event']) 
  doSomething(event:any) {
    // console.debug("Scroll Event", document.body.scrollTop);
    // see András Szepesházi's comment below
    if(window.pageYOffset === 0){
      this.showScrollToTop = false;
    }else if(window.pageYOffset > 1000){
      this.showScrollToTop = true;
    }
    console.debug("Scroll Event", window.pageYOffset );
  }
  constructor(private commonService:CommonServiceService, private route:ActivatedRoute) { }
  images:any =[]
  rows:any=[];
  allArr:any=[]
  loading =false;
  isVisible=false
  userData:any;
  selectedData:any;
  location:any;
  search: any ='';
  userIp:any;
  currUser:any;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if(params['search']){
        this.search = params['search']
      }else{
        this.search = ''
      }
      if(params['location']){
        this.location = params['location']
      }
      this.userIp = this.commonService.getUserIp();
      this.currUser = JSON.parse(localStorage.getItem('user') || '{}');
      this.getData()
    })
  }


  getData(){
    let lowerCaseCity = data.data.map((val:any) => val.toLowerCase())
    let filterSearch = this.search.split(' ').filter((val:any) => !lowerCaseCity.includes(val.toLowerCase())).join(" ");
    this.commonService.getHomepageData({
     location: this.location,
      search: filterSearch
    }).subscribe((res:any)=>{
      this.images = res.map((val:any) => { return {
        ...val,
        hBlocks: val.hblocks,
        wBlocks: val.wblocks,
        total: val.hblocks * val.wblocks,
        img: val.imageUrl,
      }});
      this.images = this.images.filter((val:any) => val.status === 'active')

      let searchTokens = this.search.split(' ').filter((val:any) =>  lowerCaseCity.includes(val.toLowerCase()));
      searchTokens.push(this.location.toLowerCase());
      searchTokens = searchTokens.map((val:any) => val.toLowerCase())
      console.log(searchTokens)
      console.log(this.images.map((val:any) => val.img && searchTokens.includes(val.city.toLowerCase())))
      this.images = this.images.filter((val:any) => val.img && searchTokens.includes(val.city.toLowerCase()) );
      
      this.images = this.images.sort((a:any, b:any) => b.total - a.total);
      let total = 0;
      this.images.forEach((val:any) => {
        total += val.total;
      });
      if(total < 400){
        for(let i=0;i<400-total;i++){
          this.images.push( {
           hBlocks: 1,
           wBlocks: 1,
           img: './assets/media/block.jpeg'
          })
       }
      }else {
       
      
        for(let i=0;i<Math.abs(((this.images.length-400) % 20) - 20);i++){
          this.images.push( {
           hBlocks: 1,
           wBlocks: 1,
           img: './assets/media/block.jpeg'
          })
       }
      }
     })
  }
  getLeadsNextPage(){
    this.loading =true;
    setTimeout(() => {
      // this.shuffleImage();
      for(let i=0;i<200;i++){
        this.images.push({
          hBlocks: 1,
          wBlocks: 1,
          img: './assets/media/block.jpeg'
         })
      }
     
      this.loading =false;
    },1500)
  
  }

  stringify(obj:any){
    return JSON.stringify(obj)
  }

  getStyle(img:any){
    return {
      'grid-row-end': `span ${img.hBlocks}`,
      'grid-column-end': `span ${img.wBlocks}`
    }
  }

  getSpanEstimate(size:number) {
    if (size > 250) {
      return 2
    }
  
    return 1
  }


  submitModal(form:any){
    if(form.valid){

      this.commonService.submitLead({...form.value, ads_id: this.selectedData.id,  ip: this.userIp}).subscribe((res:any)=>{
        this.userData = form.value;
      })
    }else {
      Swal.fire('Please fill all the fields', '', 'error')
    }
  }

  openMaps(){
    window.open('https://www.google.com/maps/place/Vi+-+Vodafone+Idea+Store/@22.4705269,88.1690792,11z/data=!4m9!1m2!2m1!1sVodafone!3m5!1s0x3a027107fbfbe975:0x73ee344074a59341!8m2!3d22.4705438!4d88.369852!15sCghWb2RhZm9uZSIDiAEBkgEjdGVsZWNvbW11bmljYXRpb25zX3NlcnZpY2VfcHJvdmlkZXI')
  }

  handleCancel(){
    this.isVisible= false;
    // this.userData = null
  }

  viewModal(data:any){
    if(!data.img || data.img === './assets/media/block.jpeg'){
      return;
    }
    this.selectedData = data;
    if(this.currUser?.id === this.selectedData.user_id){
      this.isVisible = true;
      
      return;
    }
    // this.isVisible = true;
    if(this.userData){
      this.commonService.submitLead({...this.userData, ads_id: this.selectedData.id, ip: this.userIp}).subscribe((res:any)=>{
    
        this.isVisible = true;
      })
    }else{
      this.isVisible = true;
    }
  }

  onEdit(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
}
