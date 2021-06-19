import {Component, OnInit} from '@angular/core'
import {rootingPath} from '../shared/rooting-path'
import {Router} from '@angular/router'
import {constTeamMember} from '../shared/constante'

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  readonly homePath: string
  private teamMembers: Array<any>

  constructor(
    private router: Router,
  ) {
    this.teamMembers = constTeamMember.values
    this.homePath = '/' + rootingPath.home
  }

  ngOnInit(): void {
  }

  navTo(personName: string): void {
    this.router.navigate(['/' + rootingPath.about + '/' + personName.toLowerCase().replace(' ', '_')])
  }

}
