import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubProductsComponent } from './add-sub-products.component';

describe('AddSubProductsComponent', () => {
  let component: AddSubProductsComponent;
  let fixture: ComponentFixture<AddSubProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSubProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
