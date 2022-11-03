import { EventEmitter, Injectable } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  addTreeGridColumnEvent = new EventEmitter();
  editTreeGridColumnEvent = new EventEmitter();
  viewTreeGridColumnEvent = new EventEmitter();
  treeGrids: Subscription;
  subsVar: Subscription;

  constructor() {}

  onAddTreeGridFn(data: any) {
    this.addTreeGridColumnEvent.emit(data);
  }
  onEditTreeGridFn(data: any) {
    this.editTreeGridColumnEvent.emit(data);
  }
  onViewTreeGridFn(data: any) {
    this.viewTreeGridColumnEvent.emit(data);
  }
}
