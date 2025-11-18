import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Menuitem } from './menuitem';

describe('Menuitem', () => {
  let component: Menuitem;
  let fixture: ComponentFixture<Menuitem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menuitem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Menuitem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
