import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpoPrincipalComponent } from './corpo-principal.component';

describe('CorpoPrincipalComponent', () => {
  let component: CorpoPrincipalComponent;
  let fixture: ComponentFixture<CorpoPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpoPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpoPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
