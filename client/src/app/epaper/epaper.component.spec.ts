import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpaperComponent } from './epaper.component';

describe('EpaperComponent', () => {
  let component: EpaperComponent;
  let fixture: ComponentFixture<EpaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpaperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
