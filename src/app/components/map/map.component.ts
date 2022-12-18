import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { MarkerPositions } from 'src/app/models/MarkerPositions';
import { DEFAULT_MAP_OPTIONS } from 'src/app/utils/constants';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges, OnInit {
  @Input() public markerPositions: MarkerPositions[];
  @Input() public center: google.maps.LatLngLiteral;
  @Input() public bounds:
    | google.maps.LatLngBounds
    | google.maps.LatLngBoundsLiteral;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild('search') public searchElementRef!: ElementRef;
  @Output() public id = new EventEmitter<number>();

  public options: google.maps.MapOptions = {
    scrollwheel: DEFAULT_MAP_OPTIONS.scrollwheel,
    mapTypeControl: DEFAULT_MAP_OPTIONS.mapTypeControl,
    streetViewControl: DEFAULT_MAP_OPTIONS.streetViewControl,
    disableDoubleClickZoom: DEFAULT_MAP_OPTIONS.disableDoubleClickZoom,
    maxZoom: DEFAULT_MAP_OPTIONS.maxZoom,
    minZoom: DEFAULT_MAP_OPTIONS.minZoom,
  };

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  ngOnChanges() {
    if (this.bounds) {
      this.map.fitBounds(this.bounds);
    }
  }

  public openInfo(marker: MapMarker, id: number) {
    this.id.emit(id);
  }
}
