import {Component, OnInit} from '@angular/core'
import {Observable, Observer} from 'rxjs'
import {rootingPath} from '../shared/rooting-path'
import {CovidService} from '../core/covid-19.service'
import {SortService} from '../core/sort.service'
import {ActivatedRoute, ChildActivationEnd, Router} from '@angular/router'
import {CommunicationService} from '../core/communication.service'
import {MatTabChangeEvent} from '@angular/material/tabs'
import {filter, take} from 'rxjs/operators'
import {constFederalState} from '../shared/constante'
import {IFederalState} from '../model/federal-states-data.interface'
import {IFederalStatesData} from '../model/federal-state.interface'


@Component({
  selector: 'app-top-werte',
  templateUrl: './top-werte.component.html',
  styleUrls: ['./top-werte.component.css']
})
export class TopWerteComponent implements OnInit {
  readonly homePath: string
  readonly lvoPath: string

  federalStatesData: IFederalStatesData[] = []
  selectedFederalState: IFederalState = {} as IFederalState
  selectedFederalStateDatas: IFederalStatesData = {} as IFederalStatesData
  topValues: IFederalStatesData[] = []
  currentPillId: string = ''
  currentPath: string | undefined

  totalCase = 0
  incident = 0
  fallzahl7Tage = 0
  todesFaelle = 0
  sterben7 = 0
  chartWidth = 500
  asyncTabs: Observable<any[]> | undefined

  constructor(
    private covidService: CovidService,
    private sortService: SortService,
    private activatedRoute: ActivatedRoute,
    private comService: CommunicationService,
    private router: Router
  ) {
    this.homePath = '/' + rootingPath.home
    this.lvoPath = 'https://www.schleswig-holstein.de/DE/Schwerpunkte/Coronavirus/_documents/teaser_erlasse.html#doc6e00366d-8e07-4704-bced-88e5c28e9363bodyText1'


    // to get the current url
    this.router.events.pipe(
      filter(event => event instanceof ChildActivationEnd),
      take(1),
    ).subscribe(event => {
      // @ts-ignore
      this.currentPath = event.snapshot._routerState.url.replace('/', '')
      console.log(this.currentPath)
    })

    this.activatedRoute.params.subscribe((params: any) => this.currentPillId = params.pillId)
  }

  ngOnInit(): void {
    this.footerItemsInit()
    this.getDataByCountry()
  }

  onTabClicked(event: MatTabChangeEvent): void {
    this.asyncTabs?.subscribe(values => {
      console.log(values[event.index])
      this.selectedFederalState = constFederalState.values.filter(fedSt => fedSt.federalStateName === values[event.index].label)[0]
      this.comService.setFederalStateOrdinanceUrl(this.selectedFederalState.federalStateOrdinance)
      this.selectedFederalStateDatas = this.federalStatesData
        .filter(data => data.lAN_ew_GEN === this.selectedFederalState.federalStateName)[0]
      console.log(this.selectedFederalStateDatas)
    })
  }

  private getDataByCountry(): void {
    this.covidService.getforAllBundesland().subscribe(
      (results: any) => {
        if (results) {
          results.features.forEach((item: any): void => {
            const countryData: IFederalStatesData = {} as IFederalStatesData

            countryData.incident = parseFloat(item.attributes.cases7_bl_per_100k_txt.replace(',', '.'))
            countryData.aktualisierung = item.attributes.Aktualisierung
            countryData.death = item.attributes.Death
            countryData.fallzahl = item.attributes.Fallzahl
            countryData.lAN_ew_GEN = item.attributes.LAN_ew_GEN
            countryData.cases7_bl = item.attributes.cases7_bl
            countryData.death7_bl = item.attributes.death7_bl
            countryData.faelle = item.attributes.faelle_100000_EW

            this.federalStatesData.push(countryData)
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
    const labelNames = this.topValues.map((value: IFederalStatesData) => value.lAN_ew_GEN)
    this.setNavBarTabs(labelNames)
    if (labelNames?.length > 0) {
      this.getIncidenz()
    }
  }

  private fetchTopIncidence(sortASC: boolean): void {
    this.federalStatesData = this.sortService.sortObjects(this.federalStatesData, sortASC, 'incident')
    for (let i = 0; i < 10; i++) {
      this.topValues.push(this.federalStatesData[i])
    }
  }

  private getTopRisikogebiete(): void {
    this.fetchTopIncidence(false)
    const labelNames = this.topValues.map((value: IFederalStatesData) => value.lAN_ew_GEN)
    this.setNavBarTabs(labelNames)
  }

  private getIncidenz(): void {
    this.fetchTopIncidence(true)
    this.topValues.map((value: IFederalStatesData) => {
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
    this.comService.setFederalStateOrdinance(true)
  }

}
