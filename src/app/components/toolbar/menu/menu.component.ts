import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Properties } from 'src/app/models/Properties';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() public rangeSliderForm: FormGroup;
  @Input() public properties: Properties[];
}
