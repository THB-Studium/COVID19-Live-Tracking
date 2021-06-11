import {Component, OnInit} from '@angular/core'
import {rootingPath} from '../shared/rooting-path'
import {Router} from '@angular/router'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  filteredList: Array<string> = []
  readonly statesOfGermany: Array<string> = [
    'Aach (bei Trier)',
    'Aach (Hegau)',
    'Aachen',
    'Aalen',
    'Acht',
    'Achtelsbach',
    'Achterwehr',
    'Adenbüttel',
    'Adendorf',
    'Adlkofen',
    'Admannshagen-Bargeshagen',
    'Adorf/Vogtland',
    'Ahrenviöl',
    'Aichach',
    'Aachen',
    'Bergisch Gladbach',
    'Berlin',
    'Brandenburg',
    'Göttingen',
    'Gütersloh',
    'Hannover',
    'Hildesheim',
    'Moers',
    'Neuss',
    'Paderborn',
    'Recklinghausen',
    'Reutlingen',
    'Saarbrücken',
    'Siegen',
  ]

  readonly aboutUsPath: string
  readonly impressumPath: string

  constructor(
    private router: Router
  ) {
    this.aboutUsPath = '/' + rootingPath.about
    this.impressumPath = '/' + rootingPath.impressum
  }

  ngOnInit(): void {
  }

  applyFilter(suchTerm: any): void {
    if (suchTerm?.value?.length >= 2) {
      this.filteredList = this.statesOfGermany.filter((state: string) => state.toLowerCase().includes(suchTerm.value.toLowerCase()))
    }
    if (suchTerm?.value?.length === 0) {
      this.filteredList = []
    }
  }

  onSelectedState(state: string): void {
    this.router.navigate(['/' + rootingPath.search_results + '/' + state.toLowerCase()])
  }

}
