import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import {AuthenticationService} from "../service/auth.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [ReactiveFormsModule, FormsModule,RouterTestingModule,HttpClientTestingModule],
    providers: [AuthenticationService],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
