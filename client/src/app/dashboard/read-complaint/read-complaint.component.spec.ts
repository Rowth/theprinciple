import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadComplaintComponent } from './read-complaint.component';

describe('ReadComplaintComponent', () => {
  let component: ReadComplaintComponent;
  let fixture: ComponentFixture<ReadComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadComplaintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
