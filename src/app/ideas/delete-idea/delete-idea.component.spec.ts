import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIdeaComponent } from './delete-idea.component';

describe('DeleteIdeaComponent', () => {
  let component: DeleteIdeaComponent;
  let fixture: ComponentFixture<DeleteIdeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteIdeaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
