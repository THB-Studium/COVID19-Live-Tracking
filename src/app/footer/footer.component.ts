import {Component, Input, OnInit} from '@angular/core'
import {rootingPath} from '../shared/rooting-path'
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  onAboutUs = true
  onImpressum = true

  readonly aboutUsPath: string
  readonly impressumPath: string

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {
    this.aboutUsPath = '/' + rootingPath.about,
      this.impressumPath = '/' + rootingPath.impressum
  }

  ngOnInit(): void {
    // console.log(this.activeRoute)
    // console.log(this.activeRoute['_routerState'].url)
    // this.activeRoute.params.subscribe(params => {
    //   console.log(params)
    //   // if (params['pillId'] = )
    // })
  }

}
