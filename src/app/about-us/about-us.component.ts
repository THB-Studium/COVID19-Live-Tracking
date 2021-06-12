import { Component, OnInit } from '@angular/core'
import {rootingPath} from '../shared/rooting-path'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  readonly homePath: string
  memberName: string = ''

  constructor(private  activeRoute: ActivatedRoute) {
    this.homePath = '/' + rootingPath.home
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params: any ) => this.memberName = params['pillId']
    )
  }

}
