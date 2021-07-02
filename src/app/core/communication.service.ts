import {Injectable} from '@angular/core'
import {Observable, Subject} from 'rxjs'


@Injectable({providedIn: 'root'})
export class CommunicationService {

  private impressum: Subject<boolean> = new Subject<boolean>()
  private aboutUs: Subject<boolean> = new Subject<boolean>()
  private countryOrdinance: Subject<boolean> = new Subject<boolean>()
  private countryOrdinanceUrl: Subject<string> = new Subject<string>()
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

  /*** Country ordinance ***/
  setCountryOrdinance(value: boolean): void {
    this.countryOrdinance.next(value)
  }

  getCountryOrdinance(): Observable<boolean> {
    return this.countryOrdinance.asObservable()
  }

  /*** Country ordinance url ***/
  setCountryOrdinanceUrl(value: string): void {
    this.countryOrdinanceUrl.next(value)
  }

  getCountryOrdinanceUrl(): Observable<string> {
    return this.countryOrdinanceUrl.asObservable()
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
    this.setCountryOrdinance(false)
    this.setOtherMeasure(false)
  }

}
