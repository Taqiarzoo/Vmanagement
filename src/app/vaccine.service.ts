import { Injectable } from '@angular/core';
import { vaccineModel } from './vaccine.model';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  vaccine:vaccineModel[]=[
    new vaccineModel('BNT162 BioNTech-Pfizer-Fosun','BioNTech-Pfizer','With BNT162 RNA VaccinesThe most advanced vaccine projects worldwide in clinical development. The German biotechnology company BioNTech is working in cooperation with Pfizer and Fosun Pharma on developing its RNA vaccines BNT162, which entered a combined phase I/II clinical trial in early May and is currently in a phase II/III trial.'),
    new vaccineModel('ChAdOx1-S (CoviShild) AstraZeneca-Oxford','AstraZeneca-Oxford',`With ChAdOx1-S vaccine (another name AZD1222) The British-Swedish company AstraZeneca and the University of Oxford are developing a vaccine called ChAdOx1-S using viral vector technology.`),
    new vaccineModel('mRNA1273 Moderna','Moderna',`The U.S. biotechnology company Moderna is developing RNA vaccines in cooperation with NIAD and moved the first COVID-19 vaccine into a human clinical trial in March.`),
    new vaccineModel('COVAXIN Bharat Biotech','Bharat Biotech, ICMR and NIV',`COVAXIN is India’s 'first' indigenous COVID-19 vaccine, developed by Hyderabad-based Bharat Biotech in collaboration with the Indian Council of Medical Research (ICMR) and the National Institute of Virology (NIV).`)
  ];
  
}
