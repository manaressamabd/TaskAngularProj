import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestformComponent } from './requestform.component';

describe('RequestformComponent', () => {
  let component: RequestformComponent;
  let fixture: ComponentFixture<RequestformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
