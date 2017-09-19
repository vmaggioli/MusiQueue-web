import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'create-join',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './create-join.component.html',
  styleUrls: ['./create-join.component.css']
})

export class CreateJoinComponent {

  constructor(
    private router: Router) {

  }
  
  ngOnInit() {
    
  }
  
  gotoJoinHub() {
    this.router.navigate(['join-hub']);
  }
  
  gotoCreateHub() {
    this.router.navigate(['create-hub']); 
  }
}
