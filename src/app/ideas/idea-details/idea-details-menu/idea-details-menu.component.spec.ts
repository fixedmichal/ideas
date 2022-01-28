import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaDetailsMenuComponent } from './idea-details-menu.component';

describe('IdeaDetailsMenuComponent', () => {
  let component: IdeaDetailsMenuComponent;
  let fixture: ComponentFixture<IdeaDetailsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeaDetailsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaDetailsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
