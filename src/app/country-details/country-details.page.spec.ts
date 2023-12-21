import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryDetailsPage } from './country-details.page';

describe('CountryDetailsPage', () => {
  let component: CountryDetailsPage;
  let fixture: ComponentFixture<CountryDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CountryDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
