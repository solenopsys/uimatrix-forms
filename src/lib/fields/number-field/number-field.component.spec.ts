import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NumberFieldComponent} from './number-field.component';

describe('SNumberFieldComponent', () => {
  let component: NumberFieldComponent;
  let fixture: ComponentFixture<NumberFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumberFieldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
