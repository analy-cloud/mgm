import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ContextMenuItem,
  ContextMenuService,
  EditSettingsModel,
  FilterSettingsModel,
  SortSettingsModel,
  TreeGridComponent,
} from '@syncfusion/ej2-angular-treegrid';
import { Ajax } from '@syncfusion/ej2-base';
import { dataSource, sampleData } from './datasource';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { SaveEventArgs } from '@syncfusion/ej2-grids';
// import {}

const SERVICE_URI = 'https://analy-data-center.vaasu.repl.co/api/tasks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ContextMenuService],
})
export class AppComponent implements OnInit {
  public localData: Object[];
  public sortSettings: SortSettingsModel;
  public filterSettings: FilterSettingsModel;
  public statusCode: number;
  public contextMenuItems: ContextMenuItem[] = [
    'SortAscending',
    'SortDescending',
    'Edit',
    'Delete',
    'Save',
    'Cancel',
  ];
  @ViewChild('treegrid')
  public treeGrid: TreeGridComponent;
  public editSettings: EditSettingsModel;
  public gridData: IGridDataModel;
  public targetElement: HTMLElement;


  ngOnInit(): void {
    // this.targetElement = this.container.nativeElement.parentElement;

    dataSource();
    this.localData = sampleData;
    this.sortSettings = {
      columns: [
        { field: 'taskID', direction: 'Descending' },
        { field: 'taskName', direction: 'Ascending' },
      ],
    };

    const ajax = new Ajax(SERVICE_URI, 'GET');
    ajax.send();
    ajax.onSuccess = (data: string, ajax: any) => {
      this.treeGrid.dataSource = JSON.parse(data);
      // this.treeGrid.dataSource = this.localData;
      this.statusCode = ajax.httpRequest.status;
    };

    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog',
    };
  }
  contextMenuClick(args?: MenuEventArgs): void {
    console.log(this.contextMenuItems);
    if (args) {
      console.log(args);
    }
  }
  actionBegin(args: SaveEventArgs): void {
    console.log(args);
  }
}
export interface IGridDataModel {
  TaskID?: Number
  TaskName?: String
  StartDate?: Date
  EndDate?: Date
}
