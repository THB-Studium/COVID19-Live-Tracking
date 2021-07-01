import {Component, OnInit} from '@angular/core'
import {rootingPath} from '../shared/rooting-path'
import {CommunicationService} from '../core/communication.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  onImpressum: boolean | undefined
  onAboutUs: boolean | undefined
  onCountryOrdinance: boolean | undefined
  onOtherMeasure: boolean | undefined

  readonly impressumPath: string
  readonly aboutUsPath: string
  readonly countryOrdinancePath: string
  readonly otherMeasurePath: string

  constructor(private comService: CommunicationService) {
    this.impressumPath = '/' + rootingPath.impressum,
    this.aboutUsPath = '/' + rootingPath.about,
    this.countryOrdinancePath = '',
    this.otherMeasurePath = ''
  }

  ngOnInit(): void {
    this.comService.getImpressum().subscribe((value: boolean) => this.onImpressum = value)
    this.comService.getAboutUs().subscribe((value: boolean) => this.onAboutUs = value)
    this.comService.getCountryOrdinance().subscribe((value: boolean) => this.onCountryOrdinance = value)
    this.comService.getOtherMeasure().subscribe((value: boolean) => this.onOtherMeasure = value)
  }

}
