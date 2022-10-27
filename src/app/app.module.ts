import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
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
  VirtualScrollService
} from '@syncfusion/ej2-angular-treegrid';

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { enableRipple } from '@syncfusion/ej2-base';
import { AddColumnComponent } from './add-column/add-column.component';
import { AppComponent } from './app.component';

enableRipple(true);

@NgModule({
  declarations: [AppComponent, AddColumnComponent],
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
