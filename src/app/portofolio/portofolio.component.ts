import {Component, OnInit, ViewChild} from '@angular/core'
import {rootingPath} from '../shared/rooting-path'
import {ActivatedRoute, Router} from '@angular/router'
import {constTeamMember} from '../shared/constante'
import {IMember} from '../model/member.interface'
import {NgbCarousel, NgbSlideEvent} from '@ng-bootstrap/ng-bootstrap'
import {CommunicationService} from '../core/communication.service'

@Component({
  selector: 'app-portofolio',
  templateUrl: './portofolio.component.html',
  styleUrls: ['./portofolio.component.css']
})
export class PortofolioComponent implements OnInit {
  @ViewChild('carousel', {static: true}) myCarousel: NgbCarousel | undefined
  teamMembers: IMember[] = []
  currentTeamMember: IMember = {} as IMember
  readonly homePath: string

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private comService: CommunicationService
  ) {
    this.teamMembers = constTeamMember.values
    this.currentTeamMember = this.teamMembers[0]
    this.homePath = '/' + rootingPath.home
  }

  ngOnInit(): void {
    this.footerItemsInit()
    this.myCarousel?.pause()
    this.activeRoute.params.subscribe(
      (params: any) => {
        if (params?.pillId) {
          this.currentTeamMember = constTeamMember.values
            .filter((member: any) => member.name.toLowerCase() === params.pillId.split('_').join(' '))[0]

          if (this.currentTeamMember?.name !== '') {
            switch (this.currentTeamMember.name) {
              case 'Mistra Forest':
                this.myCarousel?.select('0')
                break
              case 'Bertin Jr Wagueu':
                this.myCarousel?.select('1')
                break
              case 'Steve Ngalamo':
                this.myCarousel?.select('2')
                break
            }
          }
        }
      }
    )
  }

  onSlide(slideEvent: NgbSlideEvent): void {
    this.currentTeamMember = this.teamMembers[+slideEvent.current.replace('ngb-slide-', '')]
    const rootingUrl = '/' + rootingPath.about + '/' + this.currentTeamMember.name.toLowerCase().split(' ').join('_')
    this.router.navigate([rootingUrl])
  }

  navToTHBWebsite(): void {
    window.open('https://www.th-brandenburg.de', '_blank')
  }

  private footerItemsInit(): void {
    this.comService.resetAll()
    this.comService.setImpressum(true)
    this.comService.setAboutUs(true)
  }

}
