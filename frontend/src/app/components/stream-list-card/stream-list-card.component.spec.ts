import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamListCardComponent } from './stream-list-card.component';

describe('StreamListCardComponent', () => {
  let component: StreamListCardComponent;
  let fixture: ComponentFixture<StreamListCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StreamListCardComponent],
    });
    fixture = TestBed.createComponent(StreamListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
