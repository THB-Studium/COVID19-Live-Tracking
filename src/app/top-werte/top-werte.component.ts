import {Component, OnInit} from '@angular/core'
import {Observable, Observer} from 'rxjs'
import {rootingPath} from '../shared/rooting-path'
import {CovidService} from '../core/covid-19.service'
import {SortService} from '../core/sort.service'
import {IFederalCountry} from '../model/federal-country.interface'
import {ActivatedRoute} from '@angular/router'
import {CommunicationService} from '../core/communication.service'


@Component({
  selector: 'app-top-werte',
  templateUrl: './top-werte.component.html',
  styleUrls: ['./top-werte.component.css']
})
export class TopWerteComponent implements OnInit {
  readonly homePath: string
  readonly lvoPath: string

  federalContriesData: IFederalCountry[] = []
  topValues: IFederalCountry[] = []
  currentPillId = ''


  totalPopulation = 0
  totalCase = 780
  incident = 950
  fallzahl7Tage = 150
  todesFaelle = 230
  sterben7 = 560
  chartWidth = 500
  asyncTabs: Observable<any[]> | undefined

  constructor(
    private covidService: CovidService,
    private sortService: SortService,
    private activatedRoute: ActivatedRoute,
    private comService: CommunicationService
  ) {
    this.homePath = '/' + rootingPath.home
    this.lvoPath = 'https://www.schleswig-holstein.de/DE/Schwerpunkte/Coronavirus/_documents/teaser_erlasse.html#doc6e00366d-8e07-4704-bced-88e5c28e9363bodyText1'

    this.activatedRoute.params.subscribe((params: any) =>  this.currentPillId = params.pillId)
  }

  ngOnInit(): void {
    this.footerItemsInit()
    this.getDataByCountry()
  }

  private getDataByCountry(): void {
    this.covidService.getforAllBundesland().subscribe(
      (results: any) => {
        if (results) {
          results.features.forEach((item: any) => {
            const countryData: IFederalCountry = {} as IFederalCountry

            countryData.incident = parseFloat(item.attributes.cases7_bl_per_100k_txt.replace(',', '.'))
            countryData.aktualisierung = item.attributes.Aktualisierung
            countryData.death = item.attributes.Death
            countryData.fallzahl = item.attributes.Fallzahl
            countryData.lAN_ew_GEN = item.attributes.LAN_ew_GEN
            countryData.cases7_bl = item.attributes.cases7_bl
            countryData.death7_bl = item.attributes.death7_bl
            countryData.faelle = item.attributes.faelle_100000_EW

            this.federalContriesData.push(countryData)
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
    this.fetchTopIncidence(true)
    const labelNames = this.topValues.map((value: IFederalCountry) => value.lAN_ew_GEN)
    this.setNavBarTabs(labelNames)
   /* labelNames.forEach(() => {
      this.getIncidenz()
    })*/
    if (labelNames?.length > 0) {
      this.getIncidenz()
    }
  }

  private fetchTopIncidence(sortASC: boolean): void {
    this.federalContriesData = this.sortService.sortObjects(this.federalContriesData, sortASC, 'incident')
    for (let i = 0; i < 10; i++) {
      this.topValues.push(this.federalContriesData[i])
    }
  }

  private getTopRisikogebiete(): void {
    this.fetchTopIncidence(false)
    const labelNames = this.topValues.map((value: IFederalCountry) => value.lAN_ew_GEN)
    this.setNavBarTabs(labelNames)
    console.log(this.topValues)
  }

  private getIncidenz(): void {
    this.fetchTopIncidence(true)
    this.topValues.map((value: IFederalCountry) => {
      this.incident = value.incident
      this.todesFaelle = value.death
      this.totalCase = value.fallzahl
      this.sterben7 = value.death7_bl
      this.fallzahl7Tage = value.cases7_bl
    })

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

  private footerItemsInit(): void {
    this.comService.resetAll()
    this.comService.setImpressum(true)
    this.comService.setAboutUs(true)
    this.comService.setCountryOrdinance(true)
  }

}
