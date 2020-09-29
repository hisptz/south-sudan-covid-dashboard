import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfTetsPerLabComponent } from './type-of-tets-per-lab.component';

describe('TypeOfTetsPerLabComponent', () => {
  let component: TypeOfTetsPerLabComponent;
  let fixture: ComponentFixture<TypeOfTetsPerLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeOfTetsPerLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfTetsPerLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
