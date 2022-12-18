import { Component, Input } from '@angular/core';
import { Properties } from 'src/app/models/Properties';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() public property: Properties;
}
