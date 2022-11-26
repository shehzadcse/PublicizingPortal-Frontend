import { Component, OnInit } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import moment from 'moment';
import { CommonServiceService } from 'src/app/common-service.service';

@Component({
  selector: 'app-ads-statistics',
  templateUrl: './ads-statistics.component.html',
  styleUrls: ['./ads-statistics.component.css']
})
export class AdsStatisticsComponent implements OnInit {
  dataSource:any =[]
  

  

  constructor(private commonService:CommonServiceService) { }
  adsData:any
  ngOnInit(): void {
    this.commonService.getUserAds().subscribe(data=>{
      this.adsData  =data[0];
      if(this.adsData){
        this.commonService.getStatistics({ ad_id: this.adsData.id}).subscribe((res:any) => {
          let data:any={};
           res.forEach((item:any) => {
            if(!data[item.email]){
              data[item.email] = item;
            }
           })
          this.dataSource =Object.values(data);
        
        })
      }
 
    })
 
  }


  exportExcel(){
    let workbook = new Workbook();
    const worksheet0 = workbook.addWorksheet('Statistics');
    const trialBalanceHeaders = [
      'Name',
      'Email',
      'Phone',
      'Date',
    ];

    worksheet0.addRow(trialBalanceHeaders);
   
    this.dataSource.forEach((data: any) => {
      worksheet0.addRow([
        data?.name,
        data?.email,
        data?.phone,
        moment(data.created_at).format('DD-MM-YYYY'),
      ]);
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(
        blob,
        'Ads Statistics' +
          '_' +
          new Date().getTime() +
          '.xlsx'
      );
    });
  }

}
