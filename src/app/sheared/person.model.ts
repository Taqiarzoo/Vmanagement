import { Optional } from "@angular/core";

export class person{
    aadharNo: number;
    eligibility: boolean;
    name: string;
    age: number;
    vactnationStatus:boolean;
    firstdose:any;
    seconddose:any;
    vaccine: string;
    firstShot: boolean=false;
    secondShot:boolean=false;
    isSecondShot: boolean=false;
    perBook:any;
    isPreBook:boolean
    constructor
    (
        aadharNo: number,
        eligibility: boolean,
        name: string,
        age: number,
        vactnationStatus:boolean,
        firstdose:Date,
        seconddose:Date,
        vaccine?: string,
        firstShot?: boolean,
        secondShot?:boolean,
        isSecondShot?:boolean,
        prebook?:any,
        isPreBook?:boolean

    ){
        this.aadharNo= aadharNo;
        this.eligibility=eligibility;
        this.name=name;
        this.age=age;
        this.vactnationStatus=vactnationStatus;
        this.firstdose=firstdose;
        this.seconddose=seconddose;
        this.vaccine=vaccine
        this.firstShot=firstShot;
        this.secondShot=secondShot;
        this.isSecondShot=isSecondShot;
        this.perBook=prebook;
        this.isPreBook=isPreBook;
    }
}