import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Properties } from 'src/app/models/Properties';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnChanges {
  @Input() public filteredProperties: Properties[];
  @Input() public idNumber: number;
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  imgPath = 'assets/logo/hawaii.jpg';
  @Input() public photos: string[];

  ngOnChanges() {
    const selectedIndex: number = this.filteredProperties?.findIndex(
      (prop: Properties) => prop.id === this.idNumber
    );

    if (selectedIndex > -1) {
      this.viewPort.scrollToIndex(selectedIndex);
    }
  }
}
