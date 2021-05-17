import { Injectable } from '@angular/core';
import { Chart} from 'chart.js';
//import { Chart,  } from `chart.js`

import { statisticData } from '../sheared/statisticData.model';
import { HttpClient } from 'selenium-webdriver/http';
import { chartDataSet } from '../sheared/chartDataSet.model';


@Injectable({
  providedIn: 'root'
})
export class plotChartService {
  
  chart:Chart;
  
  constructor() { }
  /*
  0: "BNT162 BioNTech-Pfizer-Fosun"
1: "ChAdOx1-S (CoviShild) AstraZeneca-Oxford"
2: "mRNA1273 Moderna"
3: "COVAXIN Bharat Bio
  */
  vaccinated(sourceData:statisticData):chartDataSet
  {
    let chartDataG:chartDataSet=new chartDataSet();
    chartDataG.chartTypeV="bar";
    chartDataG.chartLabels[0]="Vaccinated";
    chartDataG.chartLabels[1]="Un Vaccinated";
    chartDataG.chartLabels[2]="Only First Dose";
    //chartDataG.chartGraphicDataData[0].data[0]=sourceData.vaccinated;
    //for testing Dummy Value
    chartDataG.chartGraphicDataData[0].data[0]=150
    chartDataG.chartGraphicDataData[0].data[1]=(sourceData.total-sourceData.vaccinated);
    chartDataG.chartGraphicDataData[0].data[2]=sourceData.firstDose;
    chartDataG.chartGraphicDataData[0].label="Persons";
    
    return chartDataG;
  }
  vaccinationRate(sourceData:statisticData):chartDataSet
  {


    return null;
  }
  vaccinationAgeGroup(sourceData:statisticData):chartDataSet
  {
    let chartDataG:chartDataSet=new chartDataSet();
    chartDataG.chartTypeV="bar";
    chartDataG.chartLabels[0]="Bellow Twinty";
    chartDataG.chartLabels[1]="Twinty To Fourty";
    chartDataG.chartLabels[2]="fourty To Sixty";
    chartDataG.chartLabels[3]="Sixty Above";
    chartDataG.chartGraphicDataData[0].data[0]=0;
    chartDataG.chartGraphicDataData[0].data[1]=sourceData.twintyToFourty;
    chartDataG.chartGraphicDataData[0].data[2]=sourceData.fourtyToSixty;
    chartDataG.chartGraphicDataData[0].data[3]=sourceData.sixtyToAbove;
    chartDataG.chartGraphicDataData[0].label="Vaccinated";
    //second Data Set
    chartDataG.chartGraphicDataData[1].data[0]=sourceData.bellowTwinty;
    chartDataG.chartGraphicDataData[1].data[1]=sourceData.uTwintyToFourty-sourceData.twintyToFourty;
    chartDataG.chartGraphicDataData[1].data[2]=sourceData.uFourtyToSixty-sourceData.fourtyToSixty;
    chartDataG.chartGraphicDataData[1].data[3]=sourceData.uSixtyToAbove-sourceData.sixtyToAbove;
    chartDataG.chartGraphicDataData[1].label="Un Vaccinated";

    return chartDataG;
  }
  vaccinatedwith(sourceData:statisticData):chartDataSet
  {
    let chartDataG:chartDataSet=new chartDataSet();
    chartDataG.chartTypeV="bar";
    chartDataG.chartLabels[0]="Pfizer";
    chartDataG.chartLabels[1]="CoviShild";
    chartDataG.chartLabels[2]="Moderna";
    chartDataG.chartLabels[3]="COVAXIN";
    chartDataG.chartGraphicDataData[0].data[0]=sourceData.Pfizer;
    chartDataG.chartGraphicDataData[0].data[1]=sourceData.CoviShild;
    //chartDataG.chartGraphicDataData[0].data[1]=100;
    chartDataG.chartGraphicDataData[0].data[2]=sourceData.Moderna;
    chartDataG.chartGraphicDataData[0].data[3]=sourceData.COVAXIN;
    //chartDataG.chartGraphicDataData[0].data[3]=201;
    chartDataG.chartGraphicDataData[0].label="Vaccine Used";
    //second Data Set
    chartDataG.chartGraphicDataData[1].data[0]=100;
    chartDataG.chartGraphicDataData[1].data[1]=300;
    chartDataG.chartGraphicDataData[1].data[2]=20;
    chartDataG.chartGraphicDataData[1].data[3]=350;
    chartDataG.chartGraphicDataData[1].label="Total Purchased";


    return chartDataG;
  }
  
}

