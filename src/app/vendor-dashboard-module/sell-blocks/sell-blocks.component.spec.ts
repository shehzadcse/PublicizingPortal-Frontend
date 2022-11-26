import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellBlocksComponent } from './sell-blocks.component';

describe('SellBlocksComponent', () => {
  let component: SellBlocksComponent;
  let fixture: ComponentFixture<SellBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellBlocksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
