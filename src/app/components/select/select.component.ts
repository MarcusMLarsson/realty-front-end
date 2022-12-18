import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() public label: string;
  @Input() public options: string[];
  @Input() form: FormGroup;
}
