import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { PropertyService } from './services/property.service';
import { LoaderService } from './services/loader.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { debounceTime, Subscription } from 'rxjs';
import { Properties } from './models/Properties';
import { MarkerPositions } from './models/MarkerPositions';
import { PHOTOS } from './utils/constants';
import { PriceRange } from './models/PriceRange';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  title = 'realty';
  public markerPositions: MarkerPositions[];
  public properties: Properties[];
  public filteredProperties: Properties[];
  @ViewChild(ToolbarComponent) sub: ToolbarComponent;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;

  public searchElementRef!: ElementRef;
  public center: google.maps.LatLngLiteral;
  public latitude: number;
  public longitude: number;
  public topRight: google.maps.LatLng;
  public bottomLeft: google.maps.LatLng;
  public bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
  public rangeSliderForm: FormGroup;
  public place: google.maps.places.PlaceResult;
  public photos: string[];
  public idNumber: number;
  private subscr: Subscription;

  constructor(
    public propertyService: PropertyService,
    private ngZone: NgZone,
    public loaderService: LoaderService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.rangeSliderForm = this.fb.group<PriceRange>({
      minPrice: 0,
      maxPrice: 1000000,
    });

    this.subscr = this.rangeSliderForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((priceRange: PriceRange) => {
        this.markerPositions = [];
        this.filteredProperties = this.properties?.filter(
          (prop: Properties) => {
            return priceRange.maxPrice || priceRange.maxPrice
              ? prop.unformattedPrice >= priceRange.minPrice &&
                  prop.unformattedPrice <= priceRange.maxPrice
              : null;
          }
        );

        this.addMarker(this.filteredProperties);
        this.zoomToMarkers(this.markerPositions);
      });
  }

  ngAfterViewInit() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.sub.searchElementRef.nativeElement
    );

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        this.place = autocomplete.getPlace();

        if (this.place.geometry === undefined || this.place.geometry === null) {
          return;
        }

        this.latitude = this.place.geometry.location?.lat() || 38.685516;
        this.longitude = this.place.geometry.location?.lng() || -101.073324;

        this.center = {
          lat: this.latitude,
          lng: this.longitude,
        };

        if (this.place.geometry.viewport) {
          this.topRight = this.place.geometry.viewport.getNorthEast();
          this.bottomLeft = this.place.geometry.viewport.getSouthWest();
        }

        this.getProperties(this.topRight, this.bottomLeft);
      });
      this.photos = this.getPhotos(this.place);
    });
  }

  public getProperties(
    topRight: google.maps.LatLng,
    bottomLeft: google.maps.LatLng
  ) {
    this.markerPositions = [];
    this.rangeSliderForm?.reset();

    this.propertyService
      .property(JSON.stringify(topRight), JSON.stringify(bottomLeft))
      .subscribe((prop: Properties[]) => {
        this.properties = this.filteredProperties = prop;

        this.addMarker(this.properties);
        this.zoomToMarkers(this.markerPositions);
      });
  }

  public addMarker(prop: Properties[]) {
    prop?.filter((prop: Properties) =>
      this.markerPositions.push({
        id: prop.id,
        latLng: { lat: prop.latitude, lng: prop.longitude },
      })
    );
  }

  public getPhotos(places: google.maps.places.PlaceResult): string[] {
    const photos: string[] = places.photos
      ? places.photos.map((photos) => {
          const photo = photos.getUrl();
          return photo;
        })
      : PHOTOS;
    return photos;
  }

  public zoomToMarkers(markerPositions: MarkerPositions[]) {
    const boundsLatLng = new google.maps.LatLngBounds();

    markerPositions.filter((markerPosition) => {
      boundsLatLng.extend(markerPosition.latLng);
    });

    if (!boundsLatLng.isEmpty()) {
      this.bounds = boundsLatLng;
    }
  }

  public id(event: number) {
    this.idNumber = event;
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }
}
