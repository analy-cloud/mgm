import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmitType } from '@syncfusion/ej2-base';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SharedService } from '../shared.service';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-sort-column',
  templateUrl: './sort-column.component.html',
  styleUrls: ['./sort-column.component.scss'],
})
export class SortColumnComponent implements OnInit {
  @ViewChild('templateAddColumn')
  public addColumnDialog: DialogComponent;
  @ViewChild('sortColumnForm')
  public sortColumnForm: FormGroup;
  public checkedValue: string[] = [];

  clickEventSubs: Subscription;
  constructor(private sharedService: SharedService) {}

  @Input() sortColumnDialogVisible$: BehaviorSubject<boolean>;
  @Input() parentTreeComponent: BehaviorSubject<any>;
  @Input() viewColumnDialogColumnData$: BehaviorSubject<any>;
  @Input() columnNameData$: BehaviorSubject<any>;
  @Input() sortColumnDialogData$: BehaviorSubject<any>;

  public hideDialog: EmitType<object> = () => {
    const component = this.viewColumnDialogColumnData$.value;
    // component.allowSorting = false;
    this.sortColumnForm.reset();
    this.sortColumnDialogVisible$.next(false);
  };

  ngOnInit(): void {}

  sortByColumnName() {
    const component = this.viewColumnDialogColumnData$.value;
    component.allowSorting = true;
    this.sharedService.sortTreeGridFn(this.checkedValue);
    this.sortColumnDialogVisible$.next(false);
  }
  onCheckboxChange(args: any) {
    if (args.checked === true) {
      this.checkedValue.push(args.event.target.value);
    } else if (args.checked === false) {
      this.checkedValue.splice(
        this.checkedValue.indexOf(args.event.target.value),
        1
      );
    }
  }
}
