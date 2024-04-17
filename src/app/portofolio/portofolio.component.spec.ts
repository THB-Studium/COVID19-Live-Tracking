import {ComponentFixture, TestBed} from '@angular/core/testing'

import {PortofolioComponent} from './portofolio.component'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'

describe('PortofolioComponent', () => {
  let component: PortofolioComponent
  let fixture: ComponentFixture<PortofolioComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, RouterTestingModule, NgbModule,
        PortofolioComponent
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PortofolioComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
