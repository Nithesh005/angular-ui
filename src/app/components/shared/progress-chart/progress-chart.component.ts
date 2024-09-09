import { Component, Input } from '@angular/core'
import { ApexOptions } from 'apexcharts'
import { ApexChart, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexStroke, NgApexchartsModule, AnnotationLabel, AnnotationStyle, ApexAnnotations, ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexTheme } from 'ng-apexcharts'

@Component({
  selector: 'app-progress-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './progress-chart.component.html'
})
export class ProgressChartComponent {
  @Input() series?: number
  chartSeries: ApexNonAxisChartSeries = []
  chartOptions: ApexChart = {
    type: 'radialBar',
    width: '45%',
    height: 140,
    sparkline: {
      enabled: false
    }
  }
  legendOptions: ApexLegend = {
    show: false
  }
  strokeOptions: ApexStroke = {
    lineCap: 'round'
  }
  plotOptions: ApexPlotOptions = {
    radialBar: {
      track: {
        background: '#EBECEF'
      },
      dataLabels: {
        value: {
          show: false
        },
        name: {
          offsetY: 5,
        }
      },
      hollow: {
        size: '55%'
      }
    }
  }
  ngOnInit() {
    this.chartSeries = [this.series?this.series:58.5]
  }
}
