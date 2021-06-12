import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {rootingPath} from '../shared/rooting-path'
import {CovidService} from '../core/covid-19.service'
import {constFederalState} from '../shared/constante'

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  mapWidth = 300
  onMapClick = false
  readonly homePath: string
  bundesLandName = ''
  bundeslandWerte: any

  constructor(
    private activeRoute: ActivatedRoute,
    private covidService: CovidService
  ) {
    this.homePath = '/' + rootingPath.home
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params: any) => {
        this.bundesLandName = params.pillId
        const bundesLandId = constFederalState.values.filter(
          fedSt => fedSt.BundeslandName.toLowerCase() === this.bundesLandName.toLowerCase())[0].BundeslandId
        if (bundesLandId) {
          this.getDataByCountryId(bundesLandId)
        }
      }
    )
  }


  changeImageSize(): void {
    this.onMapClick ? this.mapWidth = 100 : this.mapWidth = 400
    this.onMapClick = !this.onMapClick
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

}
