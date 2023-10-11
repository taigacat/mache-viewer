import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcasterSelectorComponent } from './broadcaster-selector.component';

describe('BroadcasterSelectorComponent', () => {
  let component: BroadcasterSelectorComponent;
  let fixture: ComponentFixture<BroadcasterSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BroadcasterSelectorComponent],
    });
    fixture = TestBed.createComponent(BroadcasterSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
