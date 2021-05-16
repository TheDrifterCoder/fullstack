import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogsCrudHeaderComponent } from './catalogs-crud-header.component';

describe('CatalogsCrudHeaderComponent', () => {
  let component: CatalogsCrudHeaderComponent;
  let fixture: ComponentFixture<CatalogsCrudHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogsCrudHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsCrudHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
