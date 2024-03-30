import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDesktopComponent } from './new-desktop.component';

describe('NewDesktopComponent', () => {
  let component: NewDesktopComponent;
  let fixture: ComponentFixture<NewDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDesktopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
