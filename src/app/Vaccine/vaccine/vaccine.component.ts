import { Component, OnInit } from '@angular/core';
import { VaccineService } from 'src/app/services/vaccine.service';
import { vaccineModel } from 'src/app/sheared/vaccine.model';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.scss']
})
export class VaccineComponent implements OnInit {

  vaccinesSet:vaccineModel[]=[]
  constructor(private vaccines:VaccineService) { }

  ngOnInit(): void {
    this.vaccinesSet=this.vaccines.vaccine;
    console.log(this.vaccinesSet)
  }

}
