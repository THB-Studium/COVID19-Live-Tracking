import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core'
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts'
import {ChartOptions, ChartType} from 'chart.js'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() chartLabelName = ''
  @Input() positionLabel = 'top'
  @Input() caseValue: number | undefined
  @Input() totalValue: number | undefined
  @Input() chartWidth: number | undefined

  public pieChartOptions: ChartOptions = {responsive: true}
  public pieChartLabels: Label[] = []
  public pieChartData: SingleDataSet = []
  public pieChartType: ChartType = 'pie'
  public pieChartLegend = true
  public pieChartPlugins = []

  constructor() {
    monkeyPatchChartJsTooltip()
    monkeyPatchChartJsLegend()
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
    if (changes.caseValue?.currentValue !== 0 && changes.totalValue?.currentValue !== 0) {
      this.pieChartData = [this.caseValue, this.totalValue]
    }

    if (changes.chartLabelName?.currentValue !== '') {
      this.pieChartLabels = [[this.chartLabelName], ['Total']]
    }
  }

}

