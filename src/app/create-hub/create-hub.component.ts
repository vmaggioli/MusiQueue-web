import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'create-hub',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './create-hub.component.html',
  styleUrls: ['./create-hub.component.css']
})

export class CreateHubComponent() {
  
  constructor() {
    
  }
  
  ngOnInit() {
    
  }
}

var isValidPW(passwd) {
  if(!Number(passwd) && passwd.length != 4) {
    return false;
  }
  return true;
  
}
var isValidName(hubName){
  if(hubName.length < 4) {
    return false;
  }
  return true;
}