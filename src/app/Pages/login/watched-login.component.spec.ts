import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WatchedLoginComponent } from './watched-login.component';

describe('LoginComponent', () =>
{
	let component: WatchedLoginComponent;
	let fixture: ComponentFixture<WatchedLoginComponent>;

	beforeEach(waitForAsync(() =>
	{
		TestBed.configureTestingModule({
			declarations: [WatchedLoginComponent],
		})
			.compileComponents();
	}));

	beforeEach(() =>
	{
		fixture = TestBed.createComponent(WatchedLoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () =>
	{
		expect(component).toBeTruthy();
	});
});
