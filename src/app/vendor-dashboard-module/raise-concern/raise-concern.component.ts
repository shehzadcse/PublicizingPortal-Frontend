import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raise-concern',
  templateUrl: './raise-concern.component.html',
  styleUrls: ['./raise-concern.component.css']
})
export class RaiseConcernComponent implements OnInit {
  isVisible=false;
  concernFormVisible=false;
  constructor() { }

  dataSource=[{
    concern: 'My Ad is not visible.',
    priority: 'High',
    status: 'Open',
    raisedOn: '12/12/2020',
  }]

  ngOnInit(): void {
  }


  handleCancel(){
    this.isVisible = false;
  }

  showModal(){
    this.isVisible = true;
  }

  openConcernModal(){
    this.concernFormVisible = true
  }

  handleConcernCancel(){
    this.concernFormVisible = false;
  }
}
