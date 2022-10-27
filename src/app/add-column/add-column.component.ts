import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { EmitType } from '@syncfusion/ej2-base';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  NgForm,
} from '@angular/forms';
import { Subscription, BehaviorSubject } from 'rxjs';
import { DropDownTreeComponent } from '@syncfusion/ej2-angular-dropdowns';
import { SharedService } from '../shared.service';

import {
  DialogComponent,
  AnimationSettingsModel,
} from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-add-column',
  templateUrl: './add-column.component.html',
  styleUrls: ['./add-column.component.scss'],
})
export class AddColumnComponent implements OnInit {
  @ViewChild('templateAddColumn')
  public addColumnDialog: DialogComponent;
  @ViewChild('addColumnForm')
  public addColumnForm: FormGroup;
  public dataType: Array<string> = [
    'Text',
    'Number',
    'Boolean',
    'DropDownList',
  ];
  clickEventSubs: Subscription;
  constructor(private sharedService: SharedService) {
  }

  @Input() addColumnDialogVisible$: BehaviorSubject<boolean>;

  // addColumnData$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  public animationSettings: AnimationSettingsModel = { effect: 'FadeZoom' };
  public hideDialog: EmitType<object> = () => {
    this.addColumnForm.reset();
    this.addColumnDialogVisible$.next(false);
  };
  ngOnInit(): void {}
  saveAddColumn() {
    this.sharedService.onAddTreeGridFn(this.addColumnForm.value);
  }
}
