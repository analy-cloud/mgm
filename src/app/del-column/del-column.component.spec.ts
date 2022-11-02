import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelColumnComponent } from './del-column.component';

describe('DelColumnComponent', () => {
  let component: DelColumnComponent;
  let fixture: ComponentFixture<DelColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelColumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
