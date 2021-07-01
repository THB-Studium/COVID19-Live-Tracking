import {Component, OnInit} from '@angular/core'
import {rootingPath} from '../shared/rooting-path'
import {CommunicationService} from '../core/communication.service'

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.css']
})
export class ImpressumComponent implements OnInit {
  readonly homePath: string

  constructor(private comService: CommunicationService) {
    this.homePath = '/' + rootingPath.home
  }

  ngOnInit(): void {
    // to set the footer hyperlinks paths
    this.comService.resetAll()
    this.comService.setAboutUs(true)
  }

}
