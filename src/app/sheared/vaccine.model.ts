export class vaccineModel{
    name: string;
    company: string;
    discription: string;
    imgSource:string;
    constructor(name: string,company: string,discription:string,imageSource?:string){
        this.name=name;
        this.company=company;
        this.discription=discription;
        this.imgSource=imageSource;
    }
}