import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmitType } from '@syncfusion/ej2-base';
import { BehaviorSubject, Subscription } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { SharedService } from '../shared.service';


import {
  AnimationSettingsModel,
  DialogComponent
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
  public textAlignment: Array<string> = ['Left', 'Center', 'Right', 'Justify'];
  clickEventSubs: Subscription;
  constructor(private sharedService: SharedService) {}

  @Input() addColumnDialogVisible$: BehaviorSubject<boolean>;
  @Input() parentTreeComponent: BehaviorSubject<any>;

  public animationSettings: AnimationSettingsModel = { effect: 'FadeZoom' };
  public hideDialog: EmitType<object> = () => {
    this.addColumnForm.reset();
    this.addColumnDialogVisible$.next(false);
  };
  public fontColor: string = '#000000';
  public backgroundColor: string = '#FFFFFF';
  public selectedColor: string;
  ngOnInit(): void {}

  
  saveAddColumn() {
    const { value } = this.addColumnForm;
    const childAttrs = {
      wrap: () => {
        if (value.allowTextWrap === '' || value.allowTextWrap === 'false') {
          return false;
        }
        return {
          height: 'Auto',
          lineHeight: '18px',
          overflowWrap: 'break-word',
          textOverflow: 'clip',
          whiteSpace: 'normal',
          wordWrap: 'break-word',
        };
      },
      fontSize: () => {
        if (value.fontSize === null || value.fontSize === '') {
          return '12px';
        } else {
          return `${value.fontSize}px`;
        }
      },
    };

    const colunmData = {
      ...value,
      customAttributes: {
        'data-uniqueId': uuid(),
        style: {
          backgroundColor: this.addColumnForm.value.backgroundColor,
          color: this.addColumnForm.value.fontColor,
        },
      },
    };
    this.parentTreeComponent.next({
      dataId: colunmData.customAttributes['data-uniqueId'],
      childAttrs
    });
    // console.log(this.parentTreeComponent.value.element, 'fontsixe');
    this.sharedService.onAddTreeGridFn({ ...colunmData });
    this.addColumnDialogVisible$.next(false);
  }
}
