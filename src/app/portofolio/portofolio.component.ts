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
  @ViewChild('carousel', {static: true}) carousel: NgbCarousel | undefined
  teamMembers: IMember[] = []
  currentTeamMember: IMember = {} as IMember
  readonly homePath: string

  slideIndex = 1

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
    // this.showSlides(this.slideIndex)
    this.footerItemsInit()
    this.carousel?.pause()
    this.activeRoute.params.subscribe(
      (params: any) => {
        if (params?.pillId) {
          this.currentTeamMember = constTeamMember.values
            .filter((member: any) => member.name.toLowerCase() === params.pillId.split('_').join(' '))[0]
          console.log(this.currentTeamMember)
        }
        }
      }
    )
  }

  onSlide(slideEvent: NgbSlideEvent): void {
    console.log(slideEvent)
    this.currentTeamMember = this.teamMembers[+slideEvent.current.replace('ngb-slide-', '')]
  }

  navToTHBWebsite(): void {
    window.open('https://www.th-brandenburg.de', '_blank')
  }

  // plusSlides(n: any): void {
  //   this.showSlides(this.slideIndex += n)
  // }
  //
  // currentSlide(n: any): void {
  //   this.showSlides(this.slideIndex = n)
  // }

  // showSlides(n: any): void {
  //   let i
  //   const slides: HTMLCollectionOf<any> = document.getElementsByClassName('mySlides')
  //   const dots: HTMLCollectionOf<any> = document.getElementsByClassName('dot')
  //   if (n > slides.length) {
  //     this.slideIndex = 1
  //   }
  //   if (n < 1) {
  //     this.slideIndex = slides.length
  //   }
  //   for (i = 0; i < slides.length; i++) {
  //     slides[i].style.display = 'none'
  //   }
  //   for (i = 0; i < dots.length; i++) {
  //     dots[i].className = dots[i].className.replace(' active', '')
  //   }
  //   if (slides[this.slideIndex - 1]) {
  //     slides[this.slideIndex - 1].style.display = 'block'
  //   }
  //   if (dots[this.slideIndex - 1]) {
  //     dots[this.slideIndex - 1].className += ' active'
  //   }
  // }

  private footerItemsInit(): void {
    this.comService.resetAll()
    this.comService.setImpressum(true)
    this.comService.setAboutUs(true)
  }

}
