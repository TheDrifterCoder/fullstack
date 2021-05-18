import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsUpdateComponent } from './students-update.component';

describe('StudentsUpdateComponent', () => {
  let component: StudentsUpdateComponent;
  let fixture: ComponentFixture<StudentsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
