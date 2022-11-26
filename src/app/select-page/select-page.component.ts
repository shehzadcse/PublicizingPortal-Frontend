import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-select-page',
  templateUrl: './select-page.component.html',
  styleUrls: ['./select-page.component.css']
})


export class SelectPageComponent implements OnInit {
 
  layouts:any={
    1: { 0: [[0]]},
    2: {0: [[0,0]] , 1:[[0], [0]]},
    3: {0: [[0,0,0]] , 1:[[0], [0] ,[0]]},
    4: {0: [[0,0,0,0]] , 1:[[0], [0] ,[0] ,[0]], 2: [[0,0],[0,0]]},
    5: {0: [[0,0,0,0,0]] , 1:[[0], [0] ,[0],[0], [0]]},
    6: {0: [[0,0,0,0,0,0]] , 1:[[0], [0] ,[0] ,[0],[0], [0]], 2: [[0,0,0],[0,0,0]], 3: [[0,0],[0,0],[0,0]]},
    7: {0: [[0,0,0,0,0,0,0]] , 1:[[0], [0] ,[0],[0], [0],[0], [0]]},
    8: {0: [[0,0,0,0,0,0,0,0]] , 1:[[0], [0] ,[0] ,[0],[0], [0],[0], [0]], 2: [[0,0],[0,0],[0,0],[0,0]], 3: [[0,0,0,0],[0,0,0,0]]},
    9: {0: [[0,0,0,0,0,0,0,0,0]] , 1:[[0], [0] ,[0],[0], [0],[0], [0],[0], [0]], 2: [[0,0,0],[0,0,0],[0,0,0]]},
    10: {0: [[0,0,0,0,0,0,0,0,0,0]] , 1:[[0], [0],[0], [0] ,[0] ,[0],[0], [0],[0], [0]], 2: [[0,0],[0,0],[0,0],[0,0],[0,0]], 3: [[0,0,0,0,0],[0,0,0,0,0]]},
  }

  mat = [this.layouts[1][0]]

  count=1;
  type = 1;
  index =0;
  params={}
  constructor(private router:Router, private commonService: CommonServiceService, private route:ActivatedRoute) { }


  ngOnInit(): void {
    // this.commonService.setBlocksInCart(this.count);
    this.route.queryParams.subscribe(params => {
      this.params = params;
      if(params['count']){
        this.count = params['count'];
      }
      if(params['type']){
        this.type = params['type'];
      }
      if(params['index']){
        this.index = params['index'];
      }
      this.onChangeBlocks(this.count)
    })
  }
  selectBlock(ind:any, index:any){
    this.index = index;
   
    this.commonService.setBlocksInCart(this.count, this.type, this.index, {hBlocks:ind.length , wBlocks:ind[0].length});
  
    this.goToCheckout(this.count, this.type, this.index, {hBlocks:ind.length , wBlocks:ind[0].length});
  }
  goToCheckout(count:any, type:any, index:any, layout:any){
    this.router.navigate(['/cart'], {queryParams:{count:count, type:type, index:index, hblocks: layout.hBlocks, wblocks: layout.wBlocks}});
  }
 

  onChangeBlocks(noOfBlocks: any){
    this.count=+noOfBlocks;
    console.log(this.type)
  
   
    if(this.type == 1 && noOfBlocks !== 1){
      this.mat = [this.layouts[noOfBlocks][0]]
    }else if(this.type == 2&& noOfBlocks !== 1){
      this.mat = [this.layouts[noOfBlocks][1]]
    }else {

      this.mat = Object.keys(this.layouts[noOfBlocks]).map(val => this.layouts[noOfBlocks][val]);
      if(this.mat.length  >= 3){
        let tempFirst = this.mat[0];
        this.mat.splice(0,1);
        this.mat.push(tempFirst);
        this.mat =this.mat.reverse();
      }
    //  if(noOfBlocks !== 1){
    //   this.mat.splice(0,2);
     
    //  }
   
    }
    // console.log(+this.type === 2 ,this.count === 1)
    if(+this.type === 2 && this.count === 1){
      this.mat = [this.layouts[noOfBlocks][0]]
      // console.log('inside')
    }
    console.log(this.mat)
    this.router.navigate(['create-ads'], {queryParams:{
      ...this.params,
      count:this.count, type:this.type, index:this.index}});
    // console.log(this.mat);
  }
  changeLayout(layout:any){
   this.type = layout;
   this.onChangeBlocks(this.count);
  }
}
