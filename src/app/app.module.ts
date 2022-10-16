import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { FormsModule } from '@angular/forms';
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

import { enableRipple } from '@syncfusion/ej2-base';
import { AppComponent } from './app.component';

enableRipple(true);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TreeGridAllModule,
    TreeGridModule,
    DialogModule,
    FormsModule,
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
