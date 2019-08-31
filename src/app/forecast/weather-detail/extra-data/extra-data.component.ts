import { Component, Input, OnChanges } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-extra-data',
  templateUrl: './extra-data.component.html',
  styleUrls: ['./extra-data.component.scss']
})
export class ExtraDataComponent implements OnChanges {
  @Input() extraData: Map<any, any>;
  barChartPlugins = [pluginDataLabels];
  chartType: ChartType = 'line';
  lineChartData: Array<number>;
  lineChartLabels: Array<string>;
  yMaxValue = 50;

  dataset: ChartDataSets[] = [
    { data: this.lineChartData,
      borderColor: '#ffe168',
      backgroundColor: '#fff5cc'
    }
  ];

  lineChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    },
    scales : {
      yAxes: [{
        gridLines: {
          drawBorder: false,
          display: false
        },
        ticks: {
          display: false,
          max: this.yMaxValue + 100,
          min : 0,
        }
      }],
      xAxes: [{
        gridLines: {
          drawBorder: false,
          display: false
        }
      }],
    },
    plugins: {
      datalabels: {
        display: true,
        align: 'top',
        anchor: 'end',
        color: '#222',
        font: {
          family: 'FontAwesome',
          size: 14
        },
      },
      deferred: false
    },
  };
  constructor() { }

  ngOnChanges() {
    this.lineChartLabels = Array.from(this.extraData.keys());
    this.dataset[0].data = Array.from(this.extraData.values());
    this.yMaxValue = Math.max(...this.extraData.values());
  }

}
