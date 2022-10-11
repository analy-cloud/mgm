import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ContextMenuItem,
  ContextMenuService, EditSettingsModel, FilterSettingsModel,
  SortSettingsModel,
  TreeGridComponent
} from '@syncfusion/ej2-angular-treegrid';
import { Ajax } from '@syncfusion/ej2-base';
import { dataSource, sampleData } from './datasource';
// import { sampleData } from './sample.data';

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
    'FirstPage',
    'PrevPage',
    'LastPage',
    'NextPage',
  ];
  @ViewChild('treegrid')
  public grid: TreeGridComponent;
  public editing: EditSettingsModel = {
    allowEditing: true,
    allowDeleting: true,
  };

  ngOnInit(): void {
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
      this.grid.dataSource = JSON.parse(data);
      // this.grid.dataSource = this.localData;
      this.statusCode = ajax.httpRequest.status;
    };
  }
}
