import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, RouterLink} from '@angular/router'
import {rootingPath} from '../shared/rooting-path'
import {CovidService} from '../core/covid-19.service'
import {constFederalState} from '../shared/constante'
import {CommunicationService} from '../core/communication.service'
import {ChartComponent} from '../chart/chart.component';
import {NgIf, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  standalone: true,
  imports: [RouterLink, NgIf, ChartComponent, TitleCasePipe]
})
export class SearchResultsComponent implements OnInit {
  mapWidth = 100
  isVisible: boolean = true
  readonly homePath: string
  bundesLandName: string = ''
  bundeslandWerte: any

  filteredList: Array<any> = []
  federalStatesName: Array<any> = []
  // ]

  covid19GermanyValues: any
  totalPopulation = 1000
  totalCase = 299
  neuInfiziert = 134
  genesungsrate = 23
  todesFaelle = 35
  sterberate = 46
  chartWidth = 250

  constructor(
    private activeRoute: ActivatedRoute,
    private covidService: CovidService,
    private comService: CommunicationService
  ) {
    this.homePath = '/' + rootingPath.home
  }

  ngOnInit(): void {
    this.footerItemsInit()
    this.activeRoute.params.subscribe(
      (params: any) => {
        if (params.pillId) {
          this.bundesLandName = params.pillId
          const bundesLandId = constFederalState.values.filter(
            fedSt => fedSt.federalStateName.toLowerCase() === this.bundesLandName.toLowerCase())[0].federalStateId
          if (bundesLandId) {
            this.getDataByCountryId(bundesLandId)
          }
        }
      }
    )
  }

  changeImageSize(): void {
    this.isVisible = !this.isVisible
  }

  private getDataByCountryId(bundesLandId: number): void {
    this.covidService.getProBundesland(bundesLandId).subscribe(
      (results: any) => {
        this.bundeslandWerte = results.features[0].attributes
        console.log(this.bundeslandWerte)
      },
      (error: any) => console.log('error in SearchResultsComponent.getDataByCountryId()')
    )
  }

  private footerItemsInit(): void {
    this.comService.resetAll()
    this.comService.setImpressum(true)
    this.comService.setAboutUs(true)
    this.comService.setFederalStateOrdinance(true)
    this.comService.setOtherMeasure(true)
  }

}
