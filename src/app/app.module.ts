import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  RadioButtonModule,
  CheckBoxModule,
} from '@syncfusion/ej2-angular-buttons';
import { ColorPickerAllModule } from '@syncfusion/ej2-angular-inputs';
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from '@syncfusion/ej2-angular-popups';

import {
  EditService,
  FilterService,
  FreezeService,
  SortService,
  ToolbarService,
  TreeGridAllModule,
  TreeGridModule,
  VirtualScrollService,
} from '@syncfusion/ej2-angular-treegrid';

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { enableRipple } from '@syncfusion/ej2-base';
import { AddColumnComponent } from './add-column/add-column.component';
import { AppComponent } from './app.component';
import { EditColumnComponent } from './edit-column/edit-column.component';
import { ViewColumnComponent } from './view-column/view-column.component';
import { NgxSortableModule } from 'ngx-sortable';
import { DelColumnComponent } from './del-column/del-column.component';
import { SortColumnComponent } from './sort-column/sort-column.component';
import { AddRowComponent } from './add-row/add-row.component';

enableRipple(true);

@NgModule({
  declarations: [
    AppComponent,
    AddColumnComponent,
    EditColumnComponent,
    ViewColumnComponent,
    DelColumnComponent,
    SortColumnComponent,
    AddRowComponent,
  ],
  imports: [
    BrowserModule,
    TreeGridAllModule,
    TreeGridModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ContextMenuModule,
    DropDownListModule,
    ColorPickerAllModule,
    RadioButtonModule,
    CheckBoxModule,
    NgxSortableModule,
  ],
  providers: [
    SortService,
    FilterService,
    ToolbarService,
    FreezeService,
    VirtualScrollService,
    EditService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
