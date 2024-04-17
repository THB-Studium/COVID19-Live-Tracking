import {Component, OnInit} from '@angular/core'
import {rootingPath} from '../shared/rooting-path'
import {CommunicationService} from '../core/communication.service'
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.css'],
  standalone: true,
  imports: [RouterLink]
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
