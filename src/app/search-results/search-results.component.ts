import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { rootingPath } from "../shared/rooting-path"

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  mapWidth: number = 300
  onMapClick: boolean = false
  readonly homePath: string
  bundesLandName: string = ""

  constructor(
    private activeRoute: ActivatedRoute
    ) { 
      this.homePath = '/' + rootingPath.home
    }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params: any) => this.bundesLandName = params["pillId"]
    )
    console.log(this.bundesLandName)
  }

  
  changeImageSize(): void {
    this.onMapClick ? this.mapWidth = 100 : this.mapWidth = 400
    //document.getElementById("bundesLandMap").style.width=width
    this.onMapClick = !this.onMapClick
  }

}