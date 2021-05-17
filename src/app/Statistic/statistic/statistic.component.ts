import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { plotChartService } from 'src/app/services/plotChart.service';
import { person } from 'src/app/sheared/person.model';

import { Label,ChartsModule } from 'ng2-charts';
import { statisticData } from 'src/app/sheared/statisticData.model';
import { chartDataSet } from '../../sheared/chartDataSet.model';
 

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit, AfterViewInit {
  @ViewChild('dataChart') chartComponent;
  
  persons:person[]=[];
  chartB:ChartsModule;
  sourceData:statisticData;
  chart:any;
  vaccinatedWith:chartDataSet;
  vaccineAgeGroup:chartDataSet;
  vaccinationStatus:chartDataSet;
  constructor
  (
    private dataservice:DataServiceService,
    private plotChart:plotChartService
  ) { }
  ngAfterViewInit(){
    console.log(this.chartComponent);
  }
  ngOnInit(): void {
    this.loadData();
    
    
  }
  
  
  chartLabels = [
    'January',
    'February',
    'March',
    'April'
  ];
  chartData = [
    {
      data: [330, 600, 260, 700],
      label: 'Account A'
    },
    {
      data: [120, 455, 100, 340],
      label: 'Account B'
    },
    {
      data: [45, 67, 800, 500],
      label: 'Account C'
    }
  ];
  chartOptions = {
    responsive: true,
  };
  //stactistic Page
  loadData(){
    console.log("Data Loading Start from Subscribe")
    this.dataservice.loadStastisticDate().subscribe(data=>{
      this.sourceData=null;
      this.sourceData=data;
      console.log(this.persons)
      this.vaccinatedWith=this.plotChart.vaccinatedwith(this.sourceData);
      this.vaccineAgeGroup=this.plotChart.vaccinationAgeGroup(this.sourceData);
      this.vaccinationStatus=this.plotChart.vaccinated(this.sourceData);
      //this.dataservice.StastisticPost(this.sourceData);
    })
  }
}
