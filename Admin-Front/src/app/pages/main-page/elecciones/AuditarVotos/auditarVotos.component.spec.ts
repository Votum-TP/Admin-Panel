/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AuditarVotosComponent } from './auditarVotos.component';

describe('AuditarVotosComponent', () => {
  let component: AuditarVotosComponent;
  let fixture: ComponentFixture<AuditarVotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditarVotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditarVotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
