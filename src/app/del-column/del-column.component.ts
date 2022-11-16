import { Component, Input, OnInit } from '@angular/core';
import { EmitType } from '@syncfusion/ej2-base';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from '../shared.service';

import { AnimationSettingsModel } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-del-column',
  templateUrl: './del-column.component.html',
  styleUrls: ['./del-column.component.scss'],
})
export class DelColumnComponent implements OnInit {
  constructor(private sharedService: SharedService) {}
  @Input() viewColumnDialogColumnData$: BehaviorSubject<any>;
  @Input() deleteColumnDialogVisible$: BehaviorSubject<boolean>;
  public deleteButtons: Object = [
    {
      click: this.onDelete.bind(this),
      buttonModel: {
        content: 'Delete',
        isPrimary: true,
      },
    },
    {
      click: this.onDeleteCancel.bind(this),
      buttonModel: {
        content: 'Cancel',
      },
    },
  ];
  public animationSettings: AnimationSettingsModel = { effect: 'FadeZoom' };
  public hideDialog: EmitType<object> = () => {
    this.deleteColumnDialogVisible$.next(false);
  };
  public isPrimaryKey: boolean = false;
  public deleteContent: string;

  ngOnInit(): void {}

  onDeleteCancel() {
    this.hideDialog();
    console.log(this.viewColumnDialogColumnData$.value.component.columns);
  }
  onDelete() {
    const { component, field } = this.viewColumnDialogColumnData$.value;
    component.columns.map((col: any, indx: number) => {
      if (col.field === field) {
        if (component.columns[indx].isPrimaryKey) {
          this.isPrimaryKey = true;
          this.deleteContent = `<strong>Primary ID</strong> cannot be deletable`;
          setTimeout(() => {
            this.hideDialog();
          }, 3000);
          return;
        } else {
          this.isPrimaryKey = false;
          component.columns.splice(indx, 1);
          this.hideDialog();
        }
      }
    });
    component.refreshColumns();
  }

  beforeOpen() {
    const { component, field } = this.viewColumnDialogColumnData$.value;
    const { headerText } = component.columns.find(
      (col: any) => col.field === field
    );

    this.deleteContent = `Do you want to delete <strong>${headerText}</strong>?`;
  }
}
