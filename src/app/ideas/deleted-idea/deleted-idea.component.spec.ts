import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedIdeaComponent } from './deleted-idea.component';

describe('DeletedIdeaComponent', () => {
  let component: DeletedIdeaComponent;
  let fixture: ComponentFixture<DeletedIdeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedIdeaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
