import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpaperListComponent } from './epaper-list.component';

describe('EpaperListComponent', () => {
  let component: EpaperListComponent;
  let fixture: ComponentFixture<EpaperListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpaperListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpaperListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
