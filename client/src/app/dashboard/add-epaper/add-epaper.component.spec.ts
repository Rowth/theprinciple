import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEpaperComponent } from './add-epaper.component';

describe('AddEpaperComponent', () => {
  let component: AddEpaperComponent;
  let fixture: ComponentFixture<AddEpaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEpaperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
