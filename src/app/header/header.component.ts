import {Component, OnInit} from '@angular/core'
import {rootingPath} from '../shared/rooting-path'
import {ChildActivationEnd, Router} from '@angular/router'
import {filter, take} from 'rxjs/operators'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  readonly homePath: string
  currentPath: string | undefined

  constructor(
    private router: Router
  ) {
    this.homePath = './' + rootingPath.home
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof ChildActivationEnd),
      take(1),
    ).subscribe(event => {
      // @ts-ignore
      this.currentPath = event.snapshot._routerState.url.replace('/', '')
    })
  }

}
