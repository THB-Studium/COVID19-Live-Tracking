import {ComponentFixture, TestBed} from '@angular/core/testing'

import {TopWerteComponent} from './top-werte.component'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {SortService} from '../core/sort.service'
import {RouterTestingModule} from '@angular/router/testing'

describe('TopWerteComponent', () => {
  let component: TopWerteComponent
  let fixture: ComponentFixture<TopWerteComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule, RouterTestingModule,
        TopWerteComponent
    ],
    providers: [
        SortService
    ]
})
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TopWerteComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
