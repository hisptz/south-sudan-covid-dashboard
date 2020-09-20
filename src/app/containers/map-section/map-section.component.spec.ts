import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSectctionComponent } from './map-section.component';

describe('MapSectctionComponent', () => {
  let component: MapSectctionComponent;
  let fixture: ComponentFixture<MapSectctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSectctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSectctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
