import { Component, OnInit,ViewChild } from '@angular/core';
import {NgbDateStruct, NgbCalendar,NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {DatePickerComponent} from 'ng2-date-picker';
import { Observable, Subscription } from 'rxjs';
import { DataServiceService } from 'src/app/services/data-service.service';
import { person } from 'src/app/sheared/person.model';

@Component({
  selector: 'app-pre-booking',
  templateUrl: './pre-booking.component.html',
  styleUrls: ['./pre-booking.component.scss']
})
export class PreBookingComponent implements OnInit {
  //Calander Specfic
  //#region 
  year1=new Date().getFullYear();
   isDisabled = (date: NgbDate, current: {month: number}) => date.day === 1;
   today1=new Date();
  setMinDate:{
    year: any, 
    month: any, 
    day: any
    
  };
  
  setMaxDate:{
    year: any, 
    month: any, 
    day: any
  };
  model: NgbDateStruct;
  date: {year: number, month: number};
//#endregion
//data Specfic
aadharNumber:number;
isClick=false;//show the message is slot is nt booked
 secondShoot1:Subscription;
 secondShot:any;
 isloading:boolean=false;
person:person[]=[
  new person(null,null,null,null,null,null,null,null,null,null,null,null,null)
];  
constructor
(
  private calendar: NgbCalendar,
  private dataService: DataServiceService
){}
  
  selectToday() {
    this.model = this.calendar.getToday();
    
    
  }
  focusSelect(){
    alert("selected");
  }

  ngOnInit(): void {
    
    let a=2+2;
    console.log(a);
    this.setInitials();
    const person:person=this.dataService.readFromLocal('preBook');
    if(person){
      this.person.splice(0,1,person);
    }
    
  }
  
  loadDtata(){
    this.isloading=true;

    //this.dataService.getAadhar(this.aadharNumber);
    //console.log("Before Sending"+)
      this.dataService.loadDetailes(this.aadharNumber).subscribe(data=>{
        if(new Date()>data.perBook){
          console.log("Code Block Execute")
          this.person[0].isPreBook=true;
        }
        this.person.splice(0,1,data);
        this.dataService.writetoLocal(data,'preBook');
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
  setInitials(){
    //set up min date
    this.setMinDate={year:null,month:null,day:null}
    this.setMaxDate={year:null,month:null,day:null}
    this.setMinDate.year=this.year1;
    this.setMinDate.month=this.today1.getMonth()+1;
    console.log(this.setMinDate.month);
    this.setMinDate.day=this.today1.getDate();
    console.log(this.setMinDate);
    //set Up max Date
    this.checkDate(this.setMinDate,this.setMaxDate);
    console.log(this.setMaxDate);
  }
  preBooking(person:person){
    if(this.model){
      person.perBook=new Date(this.model.year,this.model.month-1,this.model.day);
      person.isPreBook=true;
    }
    alert(person.perBook);
    this.dataService.preBook(person,this.aadharNumber)
  }
   day=23;//Number Of Days From Now Booking Is enabled
   //function to Adjust the Date/
  checkDate
  (
    setMinDate:{year: any, month: any, day: any},
    setMaxDate:{year: any, month: any, day: any}
  )
  {
    if(setMinDate.month==12){
      if(setMinDate.day+this.day>31){
        setMaxDate.year=setMinDate.year+1;
        setMaxDate.month=1;
        setMaxDate.day=((setMinDate.day+this.day)-31)
      }
      else{
        setMaxDate.year=setMinDate.year;
        setMaxDate.month=setMinDate.month;
        setMaxDate.day=setMinDate.day+this.day;
      }
          
    }
    else if(setMinDate.month==2){
      
        if(setMinDate.year%4==0){
          if(setMinDate.day+this.day>29){
            setMaxDate.year=setMinDate.year;
            setMaxDate.month=setMinDate.month+1;
            setMaxDate.day=((setMinDate.day+this.day)-29)
          }else{
            setMaxDate.year=setMinDate.year;
            setMaxDate.month=setMinDate.month;
            setMaxDate.day=setMinDate.day+this.day;
          }
        }
        else{
          if(setMinDate.day+this.day>28){
            setMaxDate.year=setMinDate.year;
            setMaxDate.month=setMinDate.month+1;
            setMaxDate.day=((setMinDate.day+this.day)-28)
          }else{
            setMaxDate.year=setMinDate.year;
            setMaxDate.month=setMinDate.month;
            setMaxDate.day=setMinDate.day+this.day;
          }
        }
    }
    else if
    (
      setMinDate.month==1||
      setMinDate.month==3||
      setMinDate.month==5||
      setMinDate.month==7||
      setMinDate.month==8||
      setMinDate.month==10     
    ){
      if(setMinDate.day+this.day>31){
        setMaxDate.year=setMinDate.year;
        setMaxDate.month=setMinDate.month+1;
        setMaxDate.day=((setMinDate.day+this.day)-31)
        console.log("Its Executing");
      }
      else{
        setMaxDate.year=setMinDate.year;
        setMaxDate.month=setMinDate.month;
        setMaxDate.day=setMinDate.day+this.day;
      }
    }
    else{
      if(setMinDate.day+this.day>30){
        setMaxDate.year=setMinDate.year;
        setMaxDate.month=setMinDate.month+1;
        setMaxDate.day=((setMinDate.day+this.day)-30)
      }
      else{
        setMaxDate.year=setMinDate.year;
        setMaxDate.month=setMinDate.month;
        setMaxDate.day=setMinDate.day+this.day;
      }
    }
  }
}
