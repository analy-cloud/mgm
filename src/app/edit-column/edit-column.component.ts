import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmitType } from '@syncfusion/ej2-base';
import { BehaviorSubject, Subscription } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { SharedService } from '../shared.service';

import {
  AnimationSettingsModel,
  DialogComponent,
} from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-edit-column',
  templateUrl: './edit-column.component.html',
  styleUrls: ['./edit-column.component.scss'],
})
export class EditColumnComponent implements OnInit {
  @ViewChild('templateAddColumn')
  public addColumnDialog: DialogComponent;
  @ViewChild('editColumnForm')
  public editColumnForm: FormGroup;
  public dataType: Array<string> = [
    'string',
    'number',
    'boolean',
    'dropdownlist',
  ];
  public textAlignment: Array<string> = ['left', 'center', 'right', 'justify'];
  clickEventSubs: Subscription;
  constructor(private sharedService: SharedService) {}

  @Input() editColumnDialogVisible$: BehaviorSubject<boolean>;
  @Input() parentTreeComponent: BehaviorSubject<any>;
  @Input() editColumnData$: BehaviorSubject<any>;

  public animationSettings: AnimationSettingsModel = { effect: 'FadeZoom' };
  public hideDialog: EmitType<object> = () => {
    this.editColumnForm.reset();
    this.editColumnDialogVisible$.next(false);
  };
  public selectedColor: string;

  ngOnInit(): void {}

  saveEditColumn() {
    const { value } = this.editColumnForm;
    this.parentTreeComponent.next({ ...value });
    this.sharedService.onEditTreeGridFn({ ...value });
    this.hideDialog();
  }
}
