import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TreeGridAllModule, SortService, FilterService, ToolbarService, FreezeService } from '@syncfusion/ej2-angular-treegrid';
import { GridModule } from '@syncfusion/ej2-angular-grids';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TreeGridAllModule,
    GridModule
  ],
  providers: [SortService, FilterService, ToolbarService, FreezeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
