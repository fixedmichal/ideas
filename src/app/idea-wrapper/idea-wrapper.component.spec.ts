import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaWrapperComponent } from './idea-wrapper.component';

describe('IdeaWrapperComponent', () => {
  let component: IdeaWrapperComponent;
  let fixture: ComponentFixture<IdeaWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeaWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
