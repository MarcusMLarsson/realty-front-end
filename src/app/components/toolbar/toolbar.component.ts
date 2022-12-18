import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Properties } from 'src/app/models/Properties';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @ViewChild('search') public searchElementRef!: ElementRef;
  @Input() public rangeSliderForm: FormGroup;
  @Input() public properties: Properties[];

  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'angular',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/logo/angular.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'angular_white',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/logo/angular_white.svg'
      )
    );
  }
}
