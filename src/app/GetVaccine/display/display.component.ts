import { Component, DoCheck, ErrorHandler, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

import { DataServiceService } from 'src/app/services/data-service.service';
import { person } from 'src/app/sheared/person.model';
import { VaccineService } from 'src/app/services/vaccine.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  providers:[DataServiceService]
})
export class DisplayComponent implements OnInit {
  
  @ViewChild('f') formData: NgForm;
  aadharNumber:number;
  isClick=false;//show the message is slot is nt booked
   secondShoot1:Subscription;
   secondShot:any;
   isloading:boolean=false;
   isBookingToday=false;
  person:person[]=[
    new person(null,null,null,null,null,null,null)
  ];
  defaultSelect: string="Vaccine";
  vaccines: string[]=[];

  

  constructor
  (
    private dataService: DataServiceService,
    private vaccine: VaccineService,
    private auth: AuthServiceService
  ) { }
  loadDtata(){
    this.isloading=true;
    
    //this.dataService.getAadhar(this.aadharNumber);
    //console.log("Before Sending"+)
      this.dataService.loadDetailes(this.aadharNumber).subscribe(data=>{
        console.log(data.perBook);
        console.log(new Date());
        alert(new Date(data.perBook)+" Date Now "+new Date());
        this.person.splice(0,1,data);
        if(new Date()>=new Date(this.person[0].perBook)){
          this.isBookingToday=true;
          alert("Executed");
        }
        this.dataService.writetoLocal(data,'VUserData');
        this.isClick=true;
        this.isloading=false;
        console.log("Data Load Sussfully")
      },error=>{
        console.log("Error Occure"+error);
        this.isloading=false;
        this.isClick=false;
      });
      //write data to local File
      
  }
  ngOnInit(): void {
    
    for(let element of this.vaccine.vaccine){
      console.log(element.name);
        this.vaccines.push(element.name);
    }
    const person:person=this.dataService.readFromLocal('VUserData');
    if(person){
      this.person.splice(0,1,person);
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

    this.secondShot.subscribe(data=>{
      this.person[0].isSecondShot=data;
    });
    
    
  }
    
  
  takeFirstShort(person: person){
      this.dataService.firstShort(person,this.formData.value.vaccine);
      this.secondShot.subscribe(data=>{
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
    this.secondShot.unsubscribe();
  }
}
