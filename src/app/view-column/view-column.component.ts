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
  selector: 'app-view-column',
  templateUrl: './view-column.component.html',
  styleUrls: ['./view-column.component.scss'],
})
export class ViewColumnComponent implements OnInit {
  constructor(private sharedService: SharedService) {}

  @Input() viewColumnDialogVisible$: BehaviorSubject<boolean>;
  @Input() parentTreeComponent: BehaviorSubject<any>;
  @Input() viewColumnDialogColumnData$: BehaviorSubject<any>;

  public buttons: Object = [
    {
      click: () => {
        this.listOrderChanged.bind(this);
        this.hideDialog();
      },
      buttonModel: {
        content: 'Apply',
        isPrimary: true,
      },
    },
    // {
    //   click: this.onCloseDialog.bind(this),
    //   buttonModel: {
    //     content: 'Cancel',
    //   },
    // },
  ];

  listOrderChanged(newSortedData: any) {
    return this.sharedService.onViewTreeGridFn(newSortedData);
  }
  public hideDialog: EmitType<object> = () => {
    this.viewColumnDialogVisible$.next(false);
  };
  public animationSettings: AnimationSettingsModel = { effect: 'FadeZoom' };

  ngOnInit(): void {}

  beforeOpen(): void {}

  onCloseDialog() {
    this.hideDialog();
    console.log({ ___:   this.viewColumnDialogColumnData$.value.reorderModule.parent.childColumns});
    return this.sharedService.onViewTreeGridFn(this.viewColumnDialogColumnData$.value.reorderModule.parent.childColumns.list);
  }
}
