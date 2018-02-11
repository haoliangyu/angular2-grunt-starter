import { Component, OnInit, Input } from "@angular/core";
import { MapService } from "../map.service";
import { GeocodingService } from "../geocoding.service";
import { Location } from "../location";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-navigator",
  templateUrl: "./navigator.component.html",
  styleUrls: ["./navigator.component.scss"]
})
export class NavigatorComponent implements OnInit {
  @Input() address: string;

  constructor(
    private mapService: MapService,
    private geocoder: GeocodingService,
    private snackBar: MatSnackBar
  ) {
    this.address = "";
  }

  ngOnInit() {
    this.mapService.disableMouseEvent("map-navigator");
  }

  goto(address: string) {
    if (!address) {
      return;
    }

    this.geocoder.geocode(address).subscribe(
      (location: Location) => {
        this.mapService.fitBounds(location.viewBounds);
        this.address = location.address;
      },
      err => {
        this.snackBar.open(err.message, "OK", {
          duration: 5000
        });
      }
    );
  }
}
