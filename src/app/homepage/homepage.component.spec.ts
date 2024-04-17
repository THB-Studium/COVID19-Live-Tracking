import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HomepageComponent } from './homepage.component'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from '@angular/material/legacy-autocomplete'

describe('HomepageComponent', () => {
  let component: HomepageComponent
  let fixture: ComponentFixture<HomepageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule, RouterTestingModule, MatAutocompleteModule,
        HomepageComponent
    ]
})
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
