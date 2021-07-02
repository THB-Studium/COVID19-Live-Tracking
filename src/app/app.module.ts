import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {HeaderComponent} from './header/header.component'
import {HomepageComponent} from './homepage/homepage.component'
import {AboutUsComponent} from './about-us/about-us.component'
import {PortofolioComponent} from './portofolio/portofolio.component'
import {LiveMapComponent} from './live-map/live-map.component'
import {SearchResultsComponent} from './search-results/search-results.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon'
import {ImpressumComponent} from './impressum/impressum.component'
import {FormsModule} from '@angular/forms'
import {MatInputModule} from '@angular/material/input'
import {MatOptionModule} from '@angular/material/core'
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {AuthInterceptor} from './core/auth.Interceptor'
import {CovidService} from './core/covid-19.service'
import {TopWerteComponent} from './top-werte/top-werte.component'
import {FooterComponent} from './footer/footer.component'
import {ChartComponent} from './chart/chart.component'
import {MatGridListModule} from '@angular/material/grid-list'
import {ChartsModule} from 'ng2-charts'
import {NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {MatTabsModule} from '@angular/material/tabs'
import {SortService} from './core/sort.service'


const angularMaterialModules = [
  MatFormFieldModule, MatIconModule, MatInputModule, MatGridListModule,
  MatOptionModule, MatAutocompleteModule, MatTabsModule
]

const bootstrapModules = [NgbModule, NgbCarouselModule]

@NgModule({
  declarations: [
    AppComponent,
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
  imports: [
    angularMaterialModules,
    bootstrapModules,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    angularMaterialModules,
    CovidService,
    SortService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
