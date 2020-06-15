import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuborderlistComponent } from './suborderlist.component';

describe('SuborderlistComponent', () => {
  let component: SuborderlistComponent;
  let fixture: ComponentFixture<SuborderlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuborderlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuborderlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
