import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailogDeleteComponent } from './dailog-delete.component';

describe('DailogDeleteComponent', () => {
  let component: DailogDeleteComponent;
  let fixture: ComponentFixture<DailogDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailogDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
