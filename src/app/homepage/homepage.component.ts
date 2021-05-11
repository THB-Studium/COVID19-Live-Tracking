import {Component, OnInit} from '@angular/core'
import {rootingPath} from '../shared/rooting-path'
import {Router} from '@angular/router'
import {CovidService} from '../core/covid-19.service'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  filteredList: Array<any> = []
  statesOfGermany: Array<any> = []
  // statesOfGermany: Array<any> = [
  //   'Aach (bei Trier)',
  //   'Aach (Hegau)',
  //   'Aachen',
  //   'Aalen',
  //   'Acht',
  //   'Achtelsbach',
  //   'Achterwehr',
  //   'Adenbüttel',
  //   'Adendorf',
  //   'Adlkofen',
  //   'Admannshagen-Bargeshagen',
  //   'Adorf/Vogtland',
  //   'Ahrenviöl',
  //   'Aichach',
  //   'Aachen',
  //   'Bergisch Gladbach',
  //   'Berlin',
  //   'Brandenburg',
  //   'Göttingen',
  //   'Gütersloh',
  //   'Hannover',
  //   'Hildesheim',
  //   'Moers',
  //   'Neuss',
  //   'Paderborn',
  //   'Recklinghausen',
  //   'Reutlingen',
  //   'Saarbrücken',
  //   'Siegen',
  // ]

  readonly topWertePath: string
  readonly topLinksPath: string

  constructor(
    private router: Router,
    private covidService: CovidService
  ) {
    this.topWertePath = '/' + rootingPath.top_werte
    this.topLinksPath = 'https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Risikogebiete_neu.html/'
  }

  ngOnInit(): void {
    this.getValues()
  }

  applyFilter(suchTerm: any): void {
    if (suchTerm?.value?.length >= 2) {
      this.filteredList = this.statesOfGermany.filter((res: any) => res.country.toLowerCase().includes(suchTerm.value.toLowerCase()))
    }
    if (suchTerm?.value?.length === 0) {
      this.filteredList = []
    }
  }

  navTo(pillId: string, topWerte?: boolean): void {
    topWerte
      ? this.router.navigate(['/' + rootingPath.top_werte + '/' + pillId.toLowerCase()])
      : this.router.navigate(['/' + rootingPath.search_results + '/' + pillId.toLowerCase()])
  }

  private getValues(): void {
    this.covidService.getAll().subscribe(
      (results: any) => {
        this.statesOfGermany = results.response
      },
      (error: any) => console.log('error in HomepageComponent.getValues()')
    )
  }

}
