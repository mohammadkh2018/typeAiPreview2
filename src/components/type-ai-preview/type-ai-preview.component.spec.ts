import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAiPreviewComponent } from './type-ai-preview.component';

describe('TypeAiPreviewComponent', () => {
  let component: TypeAiPreviewComponent;
  let fixture: ComponentFixture<TypeAiPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeAiPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeAiPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
