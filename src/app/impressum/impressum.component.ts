import {Component, OnInit} from '@angular/core'
import {rootingPath} from '../shared/rooting-path'

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.css']
})
export class ImpressumComponent implements OnInit {

  readonly homePath: string

  constructor() {
    this.homePath = '/' + rootingPath.home
  }

  ngOnInit(): void {
  }

}
