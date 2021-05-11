import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { rootingPath } from './shared/rooting-path'
import { HomepageComponent } from './homepage/homepage.component'
import { SearchResultsComponent } from './search-results/search-results.component'
import { AboutUsComponent } from './about-us/about-us.component'
import { ImpressumComponent } from './impressum/impressum.component'
import { PortofolioComponent } from './portofolio/portofolio.component'

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/' + rootingPath.home},
  {path: rootingPath.home, component: HomepageComponent},
  {path: rootingPath.search_results + '/:pillId', component: SearchResultsComponent},
  {path: rootingPath.about, component: AboutUsComponent},
  {path: rootingPath.about + '/:pillId', component: PortofolioComponent},
  {path: rootingPath.impressum, component: ImpressumComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
