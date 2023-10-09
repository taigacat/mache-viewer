import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftListCardComponent } from './gift-list-card.component';

describe('GiftListCardComponent', () => {
  let component: GiftListCardComponent;
  let fixture: ComponentFixture<GiftListCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GiftListCardComponent]
    });
    fixture = TestBed.createComponent(GiftListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
