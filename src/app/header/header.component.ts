import { Component, OnInit } from '@angular/core'
import { rootingPath } from '../shared/rooting-path'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  readonly homePath: string

  constructor() {
    this.homePath = '/' + rootingPath.home
  }

  ngOnInit(): void {
  }

}
