import {ComponentFixture, TestBed} from '@angular/core/testing'

import {AboutUsComponent} from './about-us.component'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {RouterTestingModule} from '@angular/router/testing'

describe('AboutUsComponent', () => {
  let component: AboutUsComponent
  let fixture: ComponentFixture<AboutUsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, RouterTestingModule,
        AboutUsComponent
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
