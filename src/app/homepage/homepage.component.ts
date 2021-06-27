import {Component, OnInit} from '@angular/core'
import {rootingPath} from '../shared/rooting-path'
import {Router} from '@angular/router'
import {CovidService} from '../core/covid-19.service'
import {constFederalState} from '../shared/constante'
import {IFooterItem} from '../model/footer-item.interface'
import {CommunicationService} from '../core/communication.service'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  filteredList: Array<any> = []
  federalStatesName: Array<any> = []

  covid19GermanyValues: any
  totalPopulation = 0
  totalCase = 0
  neuInfiziert = 0
  genesungsrate = 0
  todesFaelle = 0
  sterberate = 0
  chartWidth = 250


  readonly topWertePath: string
  readonly topLinksPath: string

  constructor(
    private router: Router,
    private covidService: CovidService,
    private comService: CommunicationService
  ) {
    this.federalStatesName = constFederalState.values.map(federalState => federalState.BundeslandName)
    this.topWertePath = '/' + rootingPath.top_werte
    this.topLinksPath = 'https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Risikogebiete_neu.html/'
  }

  ngOnInit(): void {
    this.footerItemsInit()
    this.getAllCountriesValues()
  }

  applyFilter(suchTerm: any): void {
    suchTerm?.value?.length === 0
      ? this.filteredList = []
      : this.filteredList = this.federalStatesName.filter((name: any) => name.toLowerCase().startsWith(suchTerm.value.toLowerCase()))
  }

  navTo(pillId: string, topWerte?: boolean): void {
    topWerte
      ? this.router.navigate(['/' + rootingPath.top_werte + '/' + pillId.toLowerCase()])
      : this.router.navigate(['/' + rootingPath.search_results + '/' + pillId.toLowerCase()])
  }

  private footerItemsInit(): void {
    this.comService.resetAll()
    this.comService.setImpressum(true)
    this.comService.setAboutUs(true)
  }

  private getAllCountriesValues(): void {
    this.covidService.getAllCountriesValues().subscribe(
      (results: any) => {
        this.covid19GermanyValues = results.response.filter((resp: any) => resp.country === 'Germany')[0]

        if (this.covid19GermanyValues) {
          this.totalPopulation = this.covid19GermanyValues.population
          this.totalCase = this.covid19GermanyValues.cases.total
          if (this.covid19GermanyValues.cases?.new) {
            this.neuInfiziert = +this.covid19GermanyValues.cases.new.replace('+', '')
          }
          this.genesungsrate = this.covid19GermanyValues.cases.recovered
          this.todesFaelle = this.covid19GermanyValues.deaths.total
          this.sterberate = (this.todesFaelle * 100) / this.totalCase
        }
      },
      (error: any) => console.log('error in HomepageComponent.getAllCountriesValues()')
    )
  }

}
