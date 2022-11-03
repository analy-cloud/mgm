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
import { BehaviorSubject, timer } from 'rxjs';
import { SharedService } from './shared.service';

const SERVICE_URI = 'https://analy-data-center.vaasu.repl.co/api/tasks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ContextMenuService],
})
export class AppComponent implements OnInit {
  public infiniteScrollSettings: Object;

  public data: Object[] = [];
  public treeGridColumns: any;
  public statusCode: number;
  @ViewChild('treegrid')
  public treeGrid: TreeGridComponent | any;
  public contextMenuItemsCol: Object[];
  @ViewChild('ejDialog') ejDialog: DialogComponent;

  addColumnDialogVisible$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  editColumnDialogVisible$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  editColumnData$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  viewColumnDialogVisible$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  viewColumnDialogColumnData$: BehaviorSubject<any> = new BehaviorSubject<any>(
    {}
  );
  deleteColumnDialogVisible$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    if (this.sharedService.subsVar === undefined) {
      this.sharedService.subsVar =
        this.sharedService.addTreeGridColumnEvent.subscribe((data: object) => {
          this.addColumn(data);
        });
      this.sharedService.editTreeGridColumnEvent.subscribe((data: object) => {
        this.editColumn(data);
      });
      this.sharedService.viewTreeGridColumnEvent.subscribe((data: object) => {
        this.viewAndUpdateColumn(data);
      });
    }

    this.infiniteScrollSettings = { enableCache: true };

    this.treeGridColumns = [
      {
        field: 'taskID',
        visible: true,
        headerText: 'Task ID',
        width: 70,
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
  private rgb2hex = (c: any) =>
    '#' +
    c.match(/\d+/g).map((x: any) => (+x).toString(16).padStart(2, '0')).join``;

  private indexofCol = 0;
  private menuId: string;

  addColumn(obj: object) {
    this.treeGrid.columns.splice(this.indexofCol + 1, 0, obj as any);
    this.treeGrid.refreshColumns();
  }

  editColumn(obj: any) {
    Object.entries(obj)?.map((d) => {
      this.treeGrid.columns[this.indexofCol][d[0]] = d[1];
    });
    this.treeGrid.refreshColumns();
  }
  viewAndUpdateColumn(obj: any) {
    this.treeGrid.refreshColumns();
  }

  actionBegin(args: SaveEventArgs): void {
    if (this.menuId === 'AddCol') {
    }
    switch (this.menuId) {
      case 'AddCol':
        const { fontSize, wrap } = this.parentTreeComponent.value.childAttrs;
        Array.from(
          document.querySelectorAll(
            `[data-uniqueid='${this.parentTreeComponent.value.dataId}'] .e-headertext`
          )
        ).forEach((d: any) => (d.style.fontSize = fontSize()));
        const headercelldiv: any = document.querySelector(
          `[data-uniqueid='${this.parentTreeComponent.value.dataId}'] .e-headercell`
        );
        Object.entries(wrap())?.map((d) => {
          headercelldiv.style[d[0]] = d[1];
        });
        break;
      case 'EditCol':
        const { value } = this.parentTreeComponent;
        Array.from(document.querySelectorAll(`.e-headertext`)).forEach(
          (d: any, i: number) => {
            if (i === this.indexofCol) {
              d.style.color = value.fontColor;
            }
            console.log(value);
          }
        );
        Array.from(
          document.querySelectorAll<HTMLElement>('.e-headercell')
        ).forEach((d: any, i: number) => {
          if (i === this.indexofCol) {
            d.style.backgroundColor = value.backgroundColor;
          }
        });
        break;

      default:
        break;
    }
  }

  contextMenuClick(args: any): void {
    const {
      column: { index, field },
      item: {
        properties: { id: menuId },
      },
    } = args;

    this.indexofCol = index;
    this.menuId = menuId;

    if (menuId === 'AddCol') {
      this.addColumnDialogVisible$.next(true);
    }
    if (menuId === 'EditCol') {
      console.log({
        __docu: args.rowInfo.target,
      });
      this.editColumnDialogVisible$.next(true);
      const editColData = {
        treeData: this.treeGrid.columns[index],
        fontSize: window.getComputedStyle(
          args.rowInfo.target.querySelector('.e-headertext')
        ).fontSize,
        backgroundColor: this.rgb2hex(
          window.getComputedStyle(args.rowInfo.target).backgroundColor
        ),
        color: this.rgb2hex(window.getComputedStyle(args.rowInfo.target).color),
        textAlign: window.getComputedStyle(args.rowInfo.target).textAlign,
      };

      this.editColumnData$.next({ ...editColData });

      // this.treeGrid.columns.map((d:any) => {
      //   console.log(d)
      // })
      // this.treeGrid.columns.splice(this.indexofCol + 1, 0, obj as any);
      // this.treeGrid.refreshColumns();

      // this.addColumnDialogVisible$.next(true);
      // this.indexofCol = index;
    }
    if (menuId === 'ViewCol') {
      this.viewColumnDialogVisible$.next(true);
      this.viewColumnDialogColumnData$.next(this.treeGrid);
    }
    if (menuId === 'DelCol') {
      this.deleteColumnDialogVisible$.next(true);
      this.viewColumnDialogColumnData$.next({
        component: this.treeGrid,
        field,
      });
    }
    if (menuId === 'ChooseCol') {
      this.treeGrid.showColumnChooser = true;
      setTimeout(() => {
        this.treeGrid.columnChooserModule?.openColumnChooser();
      }, 0);
    }
    if (menuId === 'FreezeCol') {
      this.treeGrid.frozenColumns = true;
      setTimeout(() => {
        this.treeGrid.frozenColumns = this.indexofCol + 1;
      }, 0);
    }
    if (menuId === 'FilterCol') {
      alert('In progress');
      alert(
        'https://github.com/syncfusion/ej2-angular-samples/blob/master/src/app/treegrid/filter.component.ts'
      );
      // this.treeGrid.allowfiltering = true;
      // setTimeout(() => {
      //   this.treeGrid.filterModule.isHierarchyFilter = true;
      //   this.treeGrid.filterModule.isHierarchyFilter = true;
      //   // this.treeGrid.filterModule?.openFilterMenu();
      //   this.treeGrid.filterSettings.type = 'Menu'
      //   this.treeGrid.filterSettings.hierarchyMode ='Both'
      // }, 0);
      // console.log((this.treeGrid.filterSettings));
    }
    if (menuId === 'MultiSort') {
      this.treeGrid.allowSorting = true;
      setTimeout(() => {}, 0);
      console.log(
        (this.treeGrid.sortSettings.columns = [
          { field: 'taskID', direction: 'Ascending' },
        ])
      );
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
