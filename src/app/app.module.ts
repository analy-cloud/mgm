import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';;
import { FilterService, FreezeService, SortService, ToolbarService, TreeGridAllModule, TreeGridModule, VirtualScrollService } from '@syncfusion/ej2-angular-treegrid';
import { enableRipple } from '@syncfusion/ej2-base';
import { AppComponent } from './app.component';

enableRipple(true);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TreeGridAllModule,
    TreeGridModule
  ],
  providers: [SortService, FilterService, ToolbarService, FreezeService, VirtualScrollService],
  bootstrap: [AppComponent]
})
export class AppModule { }
