import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmitType } from '@syncfusion/ej2-base';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SharedService } from '../shared.service';

import {
  AnimationSettingsModel,
  DialogComponent,
} from '@syncfusion/ej2-angular-popups';
@Component({
  selector: 'app-add-row',
  templateUrl: './add-row.component.html',
  styleUrls: ['./add-row.component.scss']
})
export class AddRowComponent implements OnInit {
  @Input() addRowDialogVisible$: BehaviorSubject<boolean>;

  constructor() { }

  ngOnInit(): void {
  }

}
