import {Component, OnInit} from '@angular/core'
import {rootingPath} from '../shared/rooting-path'
import { Router, RouterLink } from '@angular/router'
import {constTeamMember} from '../shared/constante'
import {IMember} from '../model/member.interface'
import {CommunicationService} from '../core/communication.service'
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.css'],
    standalone: true,
    imports: [RouterLink, NgFor]
})
export class AboutUsComponent implements OnInit {
  readonly homePath: string
  readonly teamMembers: Array<IMember>

  constructor(
    private router: Router,
    private comService: CommunicationService
  ) {
    this.teamMembers = constTeamMember.values
    this.homePath = '/' + rootingPath.home
  }

  ngOnInit(): void {
    this.footerItemsInit()
  }

  navTo(personName: string): void {
    this.router.navigate(['./' + rootingPath.about + '/' + personName.toLowerCase().split(' ').join('_')])
  }

  private footerItemsInit(): void {
    this.comService.resetAll()
    this.comService.setImpressum(true)
  }

}
