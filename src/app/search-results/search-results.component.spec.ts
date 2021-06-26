import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SearchResultsComponent} from './search-results.component'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {SortService} from '../core/sort.service'
import {ChartComponent} from '../chart/chart.component'

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent
  let fixture: ComponentFixture<SearchResultsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
      declarations: [SearchResultsComponent, ChartComponent],
      providers: [SortService]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
