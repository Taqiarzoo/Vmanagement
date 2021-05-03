import { Component, DoCheck, ErrorHandler, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { DataServiceService } from 'src/app/data-service.service';
import { person } from 'src/app/person.model';
import { VaccineService } from 'src/app/vaccine.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  providers:[DataServiceService]
})
export class DisplayComponent implements OnInit {
  
  @ViewChild('f') formData: NgForm;
  aadharNumber:Number;
   secondShoot1:Subscription;
   secondShot:any;
  person:person[]=[
    new person(null,null,null,null,null,null,null)
  ];
  defaultSelect: string="Vaccine";
  vaccines: string[]=[];

  

  constructor(private dataService: DataServiceService,private vaccine: VaccineService) { }
  loadDtata(){
    //this.dataService.getAadhar(this.aadharNumber);
    //console.log("Before Sending"+)
      this.person.splice(0,1,this.dataService.loadDetailes(this.aadharNumber));
  }
  ngOnInit(): void {
    for(let element of this.vaccine.vaccine){
      console.log(element.name);
        this.vaccines.push(element.name);
    }
    //observable to check the second shoot 
    this.secondShot=Observable.create(observer=>{
      let isSecondShoot:boolean=false;
      setInterval(()=>{
        if(new Date()>this.person[0].seconddose){
          isSecondShoot=true;
        }
       
        console.log(new Date()  +" Second Dose "+this.person[0].seconddose+"is Second"+isSecondShoot);
        observer.next(isSecondShoot);
      },1000);
    })
    
    
    
  }
    
  
  takeFirstShort(person: person){
      this.dataService.firstShort(person,this.formData.value.vaccine);
      this.secondShoot1=this.secondShot.subscribe(data=>{
        this.person[0].isSecondShot=data;
      });
  }
  selectedValue(event: any){
          console.log(event.target.value);      
  }
  
  isSecondDose(){
    
  }
  takeSecondShot(person: person){
    console.log("You UNsubscribe");
    this.dataService.secondShot(person);
    this.secondShoot1.unsubscribe();
  }
}
