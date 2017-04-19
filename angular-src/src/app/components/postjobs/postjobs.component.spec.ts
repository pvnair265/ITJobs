import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostjobsComponent } from './postjobs.component';

describe('PostjobsComponent', () => {
  let component: PostjobsComponent;
  let fixture: ComponentFixture<PostjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
