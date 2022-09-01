import { Component, OnInit } from '@angular/core';
import { SortSettingsModel, FilterSettingsModel, Toolbar } from '@syncfusion/ej2-angular-treegrid';
import { data } from './datasource';
import { DataManager, WebApiAdaptor, UrlAdaptor } from '@syncfusion/ej2-data';
import { io } from "socket.io-client";


const SERVICE_URI = 'https://ej2services.syncfusion.com/production/web-services/api/SelfReferenceData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public data: Object[];
  public sortSettings: SortSettingsModel;
  public filterSettings: FilterSettingsModel;
  public remoteData: DataManager;
  public toolbar: Toolbar;
  public validationrules: Object;

  title = `mgm's task`;

  ngOnInit(): void {
    this.data = data;
    this.sortSettings = {
      // columns: [
      //   { field: 'id', direction: 'Ascending' },
      //   { field: 'name', direction: 'Descending' },
      // ]
    };
    this.filterSettings = { ignoreAccent: true, immediateModeDelay: 500, mode: "Immediate" };
    this.remoteData = new DataManager({ url: SERVICE_URI, adaptor: new WebApiAdaptor, crossDomain: false });
    this.validationrules = { required: true };

    // this.toolbar;

    console.log(this.remoteData)
  }
}
