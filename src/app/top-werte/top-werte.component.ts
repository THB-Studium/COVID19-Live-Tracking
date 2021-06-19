import {Component, OnInit} from '@angular/core'
import {Observable, Observer} from 'rxjs'
import {rootingPath} from '../shared/rooting-path'
import {CovidService} from '../core/covid-19.service'



@Component({
  selector: 'app-top-werte',
  templateUrl: './top-werte.component.html',
  styleUrls: ['./top-werte.component.css']
})
export class TopWerteComponent implements OnInit {

  readonly homePath: string
  readonly lvoPath: string

  totalPopulation = 0
  totalCase = 780
  neuInfiziert = 950
  genesungsrate = 150
  todesFaelle = 230
  sterberate = 560
  chartWidth = 500
  asyncTabs: Observable<any[]>

  constructor(private covidService: CovidService) {
    this.homePath = '/' + rootingPath.home
    this.lvoPath = 'https://www.schleswig-holstein.de/DE/Schwerpunkte/Coronavirus/_documents/teaser_erlasse.html#doc6e00366d-8e07-4704-bced-88e5c28e9363bodyText1'
    this.asyncTabs = new Observable((observer: Observer<any[]>) => {
      setTimeout(() => {
        observer.next([
          {label: 'First'},
          {label: 'Second'},
          {label: 'Third'},
          {label: 'Fourth'},
          {label: 'Fifth'}
        ])
      }, 1000)
    })
  }

  ngOnInit(): void {
    this.getDataByCountry()
  }

  private getDataByCountry(): void {
    this.covidService.getforAllBundesland().subscribe(
      (results: any) => {
        console.log(results)
      },
      (error: any) => console.log('error in TopWerteComponent.getDataByCountry()')
    )
  }

}
