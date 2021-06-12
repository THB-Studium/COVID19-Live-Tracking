import {Component, OnInit} from '@angular/core'
import {rootingPath} from '../shared/rooting-path'
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  readonly homePath: string
  memberName = ''

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.homePath = '/' + rootingPath.home
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params: any) => this.memberName = params.pillId
    )
  }

  navTo(personName: string): void {
    this.router.navigate(['/' + rootingPath.about + '/' + personName.toLowerCase()])
  }

}
