import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductFormComponent } from './dashboard-product-form.component';

describe('DashboardProductFormComponent', () => {
  let component: DashboardProductFormComponent;
  let fixture: ComponentFixture<DashboardProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardProductFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
