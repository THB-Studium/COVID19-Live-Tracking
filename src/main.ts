import {enableProdMode, importProvidersFrom} from '@angular/core'


import {environment} from './environments/environment'
import {AppComponent} from './app/app.component';
import {provideRouter} from '@angular/router';
import {ChartsModule} from 'ng2-charts';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {provideAnimations} from '@angular/platform-browser/animations';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from "@angular/material/tabs";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {routes} from "./app/app.routes";


const angularMaterialModules = [
  MatFormFieldModule, MatIconModule, MatInputModule, MatGridListModule, MatOptionModule, MatAutocompleteModule,
  MatTabsModule
]


if (environment.production) {
  enableProdMode()
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(angularMaterialModules, NgbModule, NgbCarouselModule, BrowserModule, FormsModule, ChartsModule),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes)
  ]
})
  .catch(err => console.error(err))
