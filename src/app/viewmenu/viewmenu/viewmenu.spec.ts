import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewmenu } from './viewmenu';

describe('Viewmenu', () => {
  let component: Viewmenu;
  let fixture: ComponentFixture<Viewmenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewmenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewmenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
