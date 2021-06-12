import {ComponentFixture, TestBed} from '@angular/core/testing'

import {TopWerteComponent} from './top-werte.component'

describe('TopWerteComponent', () => {
  let component: TopWerteComponent
  let fixture: ComponentFixture<TopWerteComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopWerteComponent]
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
