import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUnitsComponent } from './view-units.component';

describe('ViewUnitsComponent', () => {
  let component: ViewUnitsComponent;
  let fixture: ComponentFixture<ViewUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUnitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
