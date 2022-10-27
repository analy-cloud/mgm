import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  addTreeGridColumnEvent = new EventEmitter();    
  subsVar: Subscription;    
    
  constructor() { }    
    
  onAddTreeGridFn(data:any) {    
    this.addTreeGridColumnEvent.emit(data);
  } 
  // private subject = new Subject<any>();
  // sendClickEvent(valu:any) {
  //   this.subject.next(valu);
  // }
  // getClickEvent(): Observable<any> {
  //   return this.subject.asObservable();
  // }
}
