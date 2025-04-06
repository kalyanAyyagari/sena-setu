import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubProductsComponent } from './view-sub-products.component';

describe('ViewSubProductsComponent', () => {
  let component: ViewSubProductsComponent;
  let fixture: ComponentFixture<ViewSubProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSubProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSubProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
