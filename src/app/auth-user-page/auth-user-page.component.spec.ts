import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUserPageComponent } from './auth-user-page.component';

describe('AuthUserPageComponent', () => {
  let component: AuthUserPageComponent;
  let fixture: ComponentFixture<AuthUserPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthUserPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
