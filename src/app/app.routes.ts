import {Routes} from "@angular/router";
import {rootingPath} from "./shared/rooting-path";

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: rootingPath.home},
  {
    path: rootingPath.home,
    title: "Home",
    loadComponent: () => import("./homepage/homepage.component")
      .then(module => module.HomepageComponent)
  },
  {
    path: rootingPath.search_results + '/:pillId',
    loadComponent: () => import("./search-results/search-results.component")
      .then(module => module.SearchResultsComponent)
  },
  {
    path: rootingPath.top_werte + '/:pillId',
    loadComponent: () => import("./top-werte/top-werte.component")
      .then(module => module.TopWerteComponent)
  },
  {
    path: rootingPath.about,
    title: "About Us",
    loadComponent: () => import("./about-us/about-us.component")
      .then(module => module.AboutUsComponent)
  },
  {
    path: rootingPath.about + '/:pillId',
    loadComponent: () => import("./portofolio/portofolio.component")
      .then(module => module.PortofolioComponent)
  },
  {
    path: rootingPath.impressum,
    title: "Impressum",
    loadComponent: () => import("./impressum/impressum.component")
      .then(module => module.ImpressumComponent)
  },
];
