import {Injectable} from '@angular/core'
import {Observable, Subject} from 'rxjs'


@Injectable({providedIn: 'root'})
export class CommunicationService {

  private impressum: Subject<boolean> = new Subject<boolean>()
  private aboutUs: Subject<boolean> = new Subject<boolean>()
  private federalStateOrdinance: Subject<boolean> = new Subject<boolean>()
  private federalStateOrdinanceUrl: Subject<string> = new Subject<string>()
  private otherMeasure: Subject<boolean> = new Subject<boolean>()


  constructor() { }


  /*** Impressum ***/
  setImpressum(value: boolean): void {
    this.impressum.next(value)
  }

  getImpressum(): Observable<boolean> {
    return this.impressum.asObservable()
  }

  /*** About us ***/
  setAboutUs(value: boolean): void {
    this.aboutUs.next(value)
  }

  getAboutUs(): Observable<boolean> {
    return this.aboutUs.asObservable()
  }

  /*** Federal state ordinance ***/
  setFederalStateOrdinance(value: boolean): void {
    this.federalStateOrdinance.next(value)
  }

  getFederalStateOrdinance(): Observable<boolean> {
    return this.federalStateOrdinance.asObservable()
  }

  /*** Federal state ordinance url ***/
  setFederalStateOrdinanceUrl(value: string): void {
    this.federalStateOrdinanceUrl.next(value)
  }

  getFederalStateOrdinanceUrl(): Observable<string> {
    return this.federalStateOrdinanceUrl.asObservable()
  }

  /*** Other measure ***/
  setOtherMeasure(value: boolean): void {
    this.otherMeasure.next(value)
  }

  getOtherMeasure(): Observable<boolean> {
    return this.otherMeasure.asObservable()
  }

  /*** to reset all observables ***/
  resetAll(): void {
    this.setImpressum(false)
    this.setAboutUs(false)
    this.setFederalStateOrdinance(false)
    this.setOtherMeasure(false)
  }

}
