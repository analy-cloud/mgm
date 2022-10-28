import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import {
  ContextMenuService,
  FilterSettingsModel,
  SortSettingsModel,
  TreeActionEventArgs,
  TreeGridComponent,
} from '@syncfusion/ej2-angular-treegrid';
import { Ajax } from '@syncfusion/ej2-base';
import { dataSource, sampleData } from './datasource';

import { SaveEventArgs } from '@syncfusion/ej2-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from './shared.service';
import { style } from '@angular/animations';

const SERVICE_URI = 'https://analy-data-center.vaasu.repl.co/api/tasks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ContextMenuService],
})
export class AppComponent implements OnInit {
  public data: Object[] = [];
  public treeGridColumns: any;
  public statusCode: number;
  @ViewChild('treegrid')
  public treeGrid: TreeGridComponent;
  public contextMenuItemsCol: Object[];
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  addColumnDialogVisible$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    if (this.sharedService.subsVar === undefined) {
      this.sharedService.subsVar =
        this.sharedService.addTreeGridColumnEvent.subscribe((data: object) => {
          // this.sharedService.treeGrids();
          this.addColumn(data);
          console.log({ __name: data });
        });
    }

    this.treeGridColumns = [
      {
        field: 'taskID',
        visible: true,
        headerText: 'Task ID',
        width: 120,
        type: 'number',
        showInColumnChooser: true,
        filter: { type: 'Menu' },
        isPrimaryKey: true,
      },
      {
        field: 'taskName',
        type: 'dropDownList',
        visible: true,
        headerText: 'Task Name',
        width: 120,
        showInColumnChooser: true,
        filter: { type: 'Menu' },
        isPrimaryKey: false,
      },

      {
        field: 'progress',
        type: 'string',
        visible: true,
        headerText: 'Progress',
        width: 120,
        showInColumnChooser: true,
        filter: { type: 'Menu' },
        isPrimaryKey: false,
      },
    ];

    this.data = sampleData;
    const ajax = new Ajax(SERVICE_URI, 'GET');
    ajax.send();
    ajax.onSuccess = (data: string, ajax: any) => {
      // this.treeGrid.dataSource = JSON.parse(data);
      this.statusCode = ajax.httpRequest.status;
    };
    this.contextMenuItemsCol = [
      {
        text: 'Add Col',
        id: 'AddCol',
        target: '.e-columnheader',
      },
      {
        text: 'Edit Col',
        id: 'EditCol',
        target: '.e-columnheader',
      },
      {
        text: 'View Col',
        id: 'ViewCol',
        target: '.e-columnheader',
      },
      {
        text: 'Del Col',
        id: 'DelCol',
        target: '.e-columnheader',
      },
      {
        text: 'Choose Col',
        id: 'ChooseCol',
        target: '.e-columnheader',
      },
      {
        text: 'Freeze Col',
        id: 'FreezeCol',
        target: '.e-columnheader',
      },
      {
        text: 'Filter Col',
        id: 'FilterCol',
        target: '.e-columnheader',
      },
      {
        text: 'Multi Sort',
        id: 'MultiSort',
        target: '.e-columnheader',
      },
      {
        text: 'Edit Row',
        id: 'EditRow',
        target: '.e-row',
      },
    ];
  }

  public parentTreeComponent: any;
  ngAfterViewInit(): void {
    this.parentTreeComponent = new BehaviorSubject<any>('');
  }

  private indexofCol = 0;

  addColumn(obj: object) {
    // const obj = {
    //   visible: true,
    //   headerText: 'this.treeGrid.columns.splice(this.indexofCol + 1, 0, obj as any); this.treeGrid.columns.splice(this.indexofCol + 1, 0, obj as any); this.treeGrid.columns.splice(this.indexofCol + 1, 0, obj as any);',
    //   showInColumnChooser: true,
    //   filter: { type: 'Menu' },
    //   isPrimaryKey: false,
    //   width: 150,
    //   BackgroundColor: 'red',
    //   allowTextWrap: true
    // };
    // alert(this.indexofCol);
    this.treeGrid.columns.splice(this.indexofCol + 1, 0, obj as any);
    this.treeGrid.refreshColumns();
  }

  actionBegin(args: SaveEventArgs): void {
    console.log(args);
    const { fontSize, wrap } = this.parentTreeComponent.value.childAttrs;
    Array.from(
      document.querySelectorAll(
        `[data-uniqueid='${this.parentTreeComponent.value.dataId}'] .e-headertext`
      )
    ).forEach((d: any) => (d.style.fontSize = fontSize()));
    const headercelldiv: any = document.querySelector(
      `[data-uniqueid='${this.parentTreeComponent.value.dataId}'] .e-headercelldiv`
    );
    Object.entries(wrap())?.map((d) => {
      headercelldiv.style[d[0]] = d[1];
    });
  }

  contextMenuClick(args: any): void {
    const {
      column: { index },
      item: {
        properties: { id: menuId },
      },
    } = args;

    if (menuId === 'AddCol') {
      this.addColumnDialogVisible$.next(true);
      this.indexofCol = index;
    }
  }
  beforeOpen(args: TreeActionEventArgs): void {
    console.log({
      args,
      __: this.treeGrid,
    });
  }
  contextMenuOpen(arg: TreeActionEventArgs): void {
    console.log('Hello');
  }
}

export interface IGridDataModel {
  TaskID?: Number;
  TaskName?: String;
  StartDate?: Date;
  EndDate?: Date;
}
