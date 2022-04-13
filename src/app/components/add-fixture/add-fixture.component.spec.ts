import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFixtureComponent } from './add-fixture.component';

describe('AddFixtureComponent', () => {
  let component: AddFixtureComponent;
  let fixture: ComponentFixture<AddFixtureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFixtureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFixtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
