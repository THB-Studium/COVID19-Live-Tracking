import {Component, OnInit} from '@angular/core'
import {rootingPath} from '../shared/rooting-path'
import {Router, RouterLink} from '@angular/router'
import {CovidService} from '../core/covid-19.service'
import {constFederalState, constTopLinks} from '../shared/constante'
import {CommunicationService} from '../core/communication.service'
import {ITopLink} from '../model/top-link.interface'
import {IFederalState} from '../model/federal-states-data.interface'
import {ChartComponent} from '../chart/chart.component';
import {MatLegacyOptionModule} from '@angular/material/legacy-core';
import {NgFor} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyAutocompleteModule} from '@angular/material/legacy-autocomplete';
import {MatLegacyInputModule} from '@angular/material/legacy-input';
import {MatLegacyFormFieldModule} from '@angular/material/legacy-form-field';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  standalone: true,
  imports: [RouterLink, MatIconModule, NgFor, ChartComponent, MatFormFieldModule, MatAutocompleteModule, MatInputModule]
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
  chartWidth = 230
  positionLabel = 'bottom'


  readonly homePath: string
  readonly topWertePath: string
  readonly topLinks: Array<ITopLink> = []

  constructor(
    private router: Router,
    private covidService: CovidService,
    private comService: CommunicationService
  ) {
    this.federalStatesName = constFederalState.values.map(federalState => federalState.federalStateName)
    this.topWertePath = '/' + rootingPath.top_werte
    this.topLinks = constTopLinks.values
    this.homePath = '/' + rootingPath.home
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

  navTo(pillId: string, topValues?: boolean): void {
    const selectedFederalState: IFederalState = constFederalState.values.filter(fedStat => fedStat.federalStateName === pillId)[0]
    topValues
      ? this.router.navigate(['/' + rootingPath.top_werte + '/' + pillId.toLowerCase()])
      : (this.router.navigate(['/' + rootingPath.search_results + '/' + pillId.toLowerCase()]),
        this.comService.setFederalStateOrdinanceUrl(selectedFederalState.federalStateOrdinance))
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
