import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from "chart.js";
import { BaseChartDirective } from 'ng2-charts';
import { CommonServiceService } from 'src/app/common-service.service';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'ng2-charts-demo';

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 1
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];


  public barChartData: ChartData<'bar'> = {
    labels: [  ],
    datasets: [
      { data: [  ], label: 'Monthly Clicks' },

    ]
  };

  public barChartDataDaily: ChartData<'bar'> = {
    labels: [  ],
    datasets: [
      { data: [  ], label: 'Daily Clicks' },

    ]
  };
  adsData: any;
  totalClicks:any;
  user:any;
  isVisible=false;
  isVisible2=false;
  constructor(private commonService:CommonServiceService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.commonService.getUserAds().subscribe(data=>{
      this.adsData  =data[0];
      if(this.adsData){
        this.commonService.getDashboardStatistics({ad_id: this.adsData?.id }).subscribe((res:any) => {
          this.totalClicks = res?.total_clicks[0]?.clicks
          this.barChartData= {
            ...this.barChartData,
            labels:  res.monthlydata.map((item:any) => item.month_name),
            datasets: [
              { 
                data: res.monthlydata.map((item:any) => item.clicks), label: 'Monthly Clicks'
               },
             ]
          }
          this.barChartDataDaily= {
            ...this.barChartDataDaily,
            labels: res.week_data.map((item:any) => item.dayname),
           datasets: [
            { data: res.week_data.map((item:any) => item.count), label: 'Daily Clicks' },
           ]
          }

          console.log(this.barChartData, this.barChartDataDaily)
          // this.lineChartDataDaily.labels = res.week_data.map((item:any) => item.dayname);
          // this.lineChartDataDaily.datasets[0].data = res.week_data.map((item:any) => item.clicks);
        })
      }
 
    })
   
  }

  handleOk(value: NgForm): void {
    console.log('Button ok clicked!');
    console.log(value.value)
    if(!value.value.otp){
      return;
    }else{
      this.commonService.validateOtp({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        user_id: this.user.id,
        otp: value.value.otp,
        operation: 'ValidateEmail'
      }).subscribe((res: any) => {
        Swal.fire("Success", "Email Verified", "success").then(() => {
          localStorage.setItem('user', JSON.stringify({...this.user, status: this.user.phone_verified ? 'active': 'inactive', email_verified: true}))
          window.location.reload()
        });
        this.isVisible = false;
      }, (err: any) => {
        Swal.fire("Error", "Invalid OTP", "error")
      })

    }
  }

  handleOkPhone(value: NgForm): void {
    console.log('Button ok clicked!');
    if(!value){
      return;
    }else{
      this.commonService.validateOtp({
        name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      user_id: this.user.id,
        otp: value.value.otp,
        operation: 'ValidatePhone'
      }).subscribe((res: any) => {
        Swal.fire("Success", "Phone Verified", "success").then(() => {
          localStorage.setItem('user', JSON.stringify({...this.user, status: this.user.email_verified ? 'active': 'inactive', phone_verified: true}))
          window.location.reload()
        });
        this.isVisible2 = false;
      }, (err: any) => {
        Swal.fire("Error", "Invalid OTP", "error")
      })
    }
  }

  showModal(){
    this.commonService.requestOtp({
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      user_id: this.user.id,
      operation: 'ValidateEmail'
    }).subscribe((res:any) => {
      
    })
    this.isVisible = true;
  }
  showModal2(){
    this.commonService.requestOtp({
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      user_id: this.user.id,
      operation: 'ValidatePhone'
    }).subscribe((res:any) => {
      
    })
    this.isVisible2 = true;
  }
  handleCancel(): void {
    this.isVisible = false;
    this.isVisible2 = false;
  }

}
