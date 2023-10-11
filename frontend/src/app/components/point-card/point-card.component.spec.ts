import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointCardComponent } from './point-card.component';

describe('PointCardComponent', () => {
  let component: PointCardComponent;
  let fixture: ComponentFixture<PointCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointCardComponent],
    });
    fixture = TestBed.createComponent(PointCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
