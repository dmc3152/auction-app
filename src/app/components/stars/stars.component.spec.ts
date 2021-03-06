import { TestBed, async} from '@angular/core/testing';
import { StarsComponent } from './stars.component';

describe('StarsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ StarsComponent ]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents();
  }));

  it('is successfully injected', () => {
    let component = TestBed.createComponent(StarsComponent).componentInstance;
    expect(component instanceof StarsComponent).toEqual(true);
  });

  it('readOnly property is true by default', () => {
    let component = TestBed.createComponent(StarsComponent).componentInstance;
    expect(component.readOnly).toEqual(true);
  });

  it('all stars are empty', () => {
    let fixture = TestBed.createComponent(StarsComponent);
    let element = fixture.nativeElement;
    let cmp = fixture.componentInstance;
    cmp.rating = 0;

    fixture.detectChanges();

    let selector = '.far';
    expect(element.querySelectorAll(selector).length).toBe(5);
  });

  it('all stars are filled', () => {
    let fixture = TestBed.createComponent(StarsComponent);
    let element = fixture.nativeElement;
    let cmp = fixture.componentInstance;
    cmp.rating = 5;

    fixture.detectChanges();

    let selector = '.fas';
    expect(element.querySelectorAll(selector).length).toBe(5);
  });

  it('emits rating change event when readOnly is false', async(() => {
    let component = TestBed.createComponent(StarsComponent).componentInstance;
    component.ratingChange.subscribe(r => {
      expect(r).toBe(3);
    });
    component.readOnly = false;
    component.fillStarsWithColor(2);
  }));
});
