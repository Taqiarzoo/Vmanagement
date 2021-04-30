import { Injectable } from '@angular/core';

import { person } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  persn:person[]=[
    new person(12365475,true,'MOhd Hussain',23,false,null,null),
    new person(12365478,false,'MOhd Taqi',20,false,null,null),
    new person(12365476,true,'MOhd Hussain',23,true,null,null)
  ]
 aadhar: Number=0;
 /* persons=[
   
    {
      aadhar: 12365476,
      eligibility: true,
      name:'Mohd Hussain',
      age: 40,
      vactnationStatus:true,
      firstdose: Date=null,
      seconddose: Date=null
    },
    {
      aadhar: 12365478,
      eligibility: true,
      name:'Mohd Taqi',
      age: 20,
      vactnationStatus:false,
      firstdose: Date=null,
      seconddose: Date=null
    },
    {
      aadhar: 12365475,
      eligibility: false,
      name:'Mohd Hassnain',
      age: 30,
      vactnationStatus:false,
      firstdose: Date=null,
      seconddose: Date=null
    },
    {
      aadhar: 12365474,
      eligibility: true,
      name:'Mohd Akbar',
      age: 50,
      vactnationStatus:false,
      firstdose: Date=null,
      seconddose: Date=null
    },
    {
      aadhar: 12365473,
      eligibility: true,
      name:'Mohd Akbar',
      age: 50,
      vactnationStatus:false,
      firstdose: Date=null,
      seconddose: Date=null
    },
    
  ]*/
  
  getAadhar(aadhar: Number){
    this.aadhar=aadhar;
    console.log(this.aadhar);
  }
  loadDetailes(aadhar:Number){
    for(let element of this.persn){
      if(element.aadharNo==aadhar){
        console.log(element);
        return element;
      }
    }
  }
  
  //now call
  firstShort(aadhar: Number,vaccine:string){
    let dt:Date=new Date();
    for(let element of this.persn){
      if(element.aadharNo==aadhar){
          element.firstdose= Date.now();
          element.vactnationStatus=true;
          let a = new Date(element.firstdose);
          //a.setMonth(a.getMonth()+1);
          //just for testing only few minutes are added
          a.setMinutes(a.getMinutes()+1);
          element.seconddose=a.getTime();
          element.firstShot=true;
          element.vaccine=vaccine;
      }
      
    } 
  }
  

  
}


