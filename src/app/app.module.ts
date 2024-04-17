import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {AppComponent} from './app.component'
import {HeaderComponent} from './header/header.component'
import {HomepageComponent} from './homepage/homepage.component'
import {AboutUsComponent} from './about-us/about-us.component'
import {PortofolioComponent} from './portofolio/portofolio.component'
import {LiveMapComponent} from './live-map/live-map.component'
import {SearchResultsComponent} from './search-results/search-results.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field'
import {MatIconModule} from '@angular/material/icon'
import {ImpressumComponent} from './impressum/impressum.component'
import {FormsModule} from '@angular/forms'
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input'
import {MatLegacyOptionModule as MatOptionModule} from '@angular/material/legacy-core'
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from '@angular/material/legacy-autocomplete'
import {HttpClientModule} from '@angular/common/http'
import {CovidService} from './core/covid-19.service'
import {TopWerteComponent} from './top-werte/top-werte.component'
import {FooterComponent} from './footer/footer.component'
import {ChartComponent} from './chart/chart.component'
import {MatGridListModule} from '@angular/material/grid-list'
import {ChartsModule} from 'ng2-charts'
import {NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {MatLegacyTabsModule as MatTabsModule} from '@angular/material/legacy-tabs'
import {SortService} from './core/sort.service'
import {RouterModule, Routes} from "@angular/router";
import {rootingPath} from "./shared/rooting-path";


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/' + rootingPath.home},
  {
    path: rootingPath.home,
    loadComponent: () => import('./homepage/homepage.component')
      .then(module => module.HomepageComponent)
  },
  {
    path: rootingPath.search_results + '/:pillId',
    loadComponent: () => import('./search-results/search-results.component')
      .then(module => module.SearchResultsComponent)
  },
  {
    path: rootingPath.top_werte + '/:pillId',
    loadComponent: () => import('./top-werte/top-werte.component')
      .then(module => module.TopWerteComponent)
  },
  {
    path: rootingPath.about,
    loadComponent: () => import('./about-us/about-us.component')
      .then(module => module.AboutUsComponent)
  },
  {
    path: rootingPath.about + '/:pillId',
    loadComponent: () => import('./portofolio/portofolio.component')
      .then(module => module.PortofolioComponent)
  },
  {
    path: rootingPath.impressum,
    loadComponent: () => import('./impressum/impressum.component')
      .then(module => module.ImpressumComponent)
  },
]

@NgModule({
  declarations: [AppComponent],
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatTabsModule,
    NgbModule,
    NgbCarouselModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    RouterModule.forRoot(routes),
    HeaderComponent,
    HomepageComponent,
    AboutUsComponent,
    PortofolioComponent,
    LiveMapComponent,
    SearchResultsComponent,
    ImpressumComponent,
    TopWerteComponent,
    FooterComponent,
    ChartComponent
  ],
  providers: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatTabsModule,
    CovidService,
    SortService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
