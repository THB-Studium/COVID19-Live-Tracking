import {Component, OnInit} from '@angular/core'
import {Observable, Observer} from 'rxjs'
import {rootingPath} from '../shared/rooting-path'
import {CovidService} from '../core/covid-19.service'
import {SortService} from '../core/sort.service'
import {IFederalCountry} from '../model/federal-country.interface'
import {ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-top-werte',
  templateUrl: './top-werte.component.html',
  styleUrls: ['./top-werte.component.css']
})
export class TopWerteComponent implements OnInit {
  readonly homePath: string
  readonly lvoPath: string

  federalContriesDatas: IFederalCountry[] = []
  topValues: IFederalCountry[] = []
  currentPillId = ''


  totalPopulation = 0
  totalCase = 780
  neuInfiziert = 950
  genesungsrate = 150
  todesFaelle = 230
  sterberate = 560
  chartWidth = 500
  asyncTabs: Observable<any[]> | undefined

  constructor(
    private covidService: CovidService,
    private sortService: SortService,
    private activatedRoute: ActivatedRoute
  ) {
    this.homePath = '/' + rootingPath.home
    this.lvoPath = 'https://www.schleswig-holstein.de/DE/Schwerpunkte/Coronavirus/_documents/teaser_erlasse.html#doc6e00366d-8e07-4704-bced-88e5c28e9363bodyText1'

    this.activatedRoute.params.subscribe((params: any) =>  this.currentPillId = params.pillId)
  }

  ngOnInit(): void {
    this.getDataByCountry()
  }

  private getDataByCountry(): void {
    this.covidService.getforAllBundesland().subscribe(
      (results: any) => {
        if (results) {
          results.features.forEach((item: any) => {
            const counstryData: IFederalCountry = {} as IFederalCountry

            counstryData.incident = parseFloat(item.attributes.cases7_bl_per_100k_txt)
            counstryData.aktualisierung = item.attributes.Aktualisierung
            counstryData.death = item.attributes.Death
            counstryData.fallzahl = item.attributes.Fallzahl
            counstryData.lAN_ew_GEN = item.attributes.LAN_ew_GEN
            counstryData.cases7_bl = item.attributes.cases7_bl
            counstryData.death7_bl = item.attributes.death7_bl
            counstryData.faelle = item.attributes.faelle_100000_EW

            this.federalContriesDatas.push(counstryData)
          })

          if (this.currentPillId === 'top_niedrigste_inzidenz' || this.currentPillId === 'top_urlaubsorte') {
            this.getTopLowIncidentCountries()
          }
          if (this.currentPillId === 'risikogebiete') {
              this.getTopRisikogebiete()
          }
        }
      },
      (error: any) => console.log('error in TopWerteComponent.getDataByCountry()')
    )
  }

  private getTopLowIncidentCountries(): void {
    this.federalContriesDatas = this.sortService.sortObjects(this.federalContriesDatas, true, 'incident')
    for (let i = 0; i < 10; i++) {
      this.topValues.push(this.federalContriesDatas[i])
    }
    const labelNames = this.topValues.map((value: IFederalCountry) => value.lAN_ew_GEN)
    this.setNavBarTabs(labelNames)
    console.log(this.topValues)
  }

  private getTopRisikogebiete(): void {
    this.federalContriesDatas = this.sortService.sortObjects(this.federalContriesDatas, false, 'incident')
    for (let i = 0; i < 10; i++) {
      this.topValues.push(this.federalContriesDatas[i])
    }
    const labelNames = this.topValues.map((value: IFederalCountry) => value.lAN_ew_GEN)
    this.setNavBarTabs(labelNames)
    console.log(this.topValues)
  }

  private setNavBarTabs(names: string[]): void {
    const labelNames: any[] = []
    names.forEach((name: string) => labelNames.push({label: name}))
    this.asyncTabs = new Observable((observer: Observer<any[]>) => {
      setTimeout(() => {
        observer.next(labelNames)
      }, 1000)
    })
  }

}
