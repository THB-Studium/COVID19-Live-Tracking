import {Component, OnInit} from '@angular/core'
import {rootingPath} from '../shared/rooting-path'
import {ActivatedRoute} from '@angular/router'
import {constTeamMember} from '../shared/constante'

@Component({
  selector: 'app-portofolio',
  templateUrl: './portofolio.component.html',
  styleUrls: ['./portofolio.component.css']
})
export class PortofolioComponent implements OnInit {
  currentTeamMember: any
  readonly homePath: string

  constructor(private activeRoute: ActivatedRoute) {
    this.homePath = '/' + rootingPath.home
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params: any) => {
        this.currentTeamMember = constTeamMember.values
          .filter((member: any) => member.name.toLowerCase() === params.pillId.replace('_', ' '))[0]
        console.log(this.currentTeamMember)
      }
    )
  }

}
