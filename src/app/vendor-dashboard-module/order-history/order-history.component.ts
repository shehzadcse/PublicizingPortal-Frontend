import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/common-service.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  constructor(private commonService: CommonServiceService) { }
  user: any;
  adsData:any;
  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user') || 
    '{}');

    this.commonService.getUserAds().subscribe(data=>{
      this.adsData  =data[0];
    })
  }


  onPrint(divName:any) {
    // console.log('here');
    // const printContents = document.getElementById(divName)?.innerHTML || '';
    // console.log(printContents);
    // const originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    window.print();
    // document.body.innerHTML = originalContents;
}
}
