import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  @Input() rangeSliderForm: FormGroup;

  formatLabel(value: number): string {
    if (value >= 1000000) {
      return '$' + Math.round(value / 1000000) + 'M';
    }
    if (value >= 1000) {
      return '$' + Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
}
