class chartDatas{
    data:number[]=[];
    label:string='';
}
export class chartDataSet{
  chartTypeV:string;
    chartLabels:string[] = [];
      chartGraphicDataData:chartDatas[]=[new chartDatas(),new chartDatas()];
      chartOptions = {
        responsive: true,
      };
      chartColors: Array<any> = [
        { // first color
          backgroundColor: 'rgba(225,10,24,0.2)',
          borderColor: 'rgba(225,10,24,0.2)',
          pointBackgroundColor: 'rgba(225,10,24,0.2)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(225,10,24,0.2)'
        },
        { // second color
          backgroundColor: 'rgba(225,10,24,0.2)',
          borderColor: 'rgba(225,10,24,0.2)',
          pointBackgroundColor: 'rgba(225,10,24,0.2)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(225,10,24,0.2)'
        }];
      
}