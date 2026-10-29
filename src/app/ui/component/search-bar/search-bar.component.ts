import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  inject,
  Input,
  Output,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { coerceObservable } from '@rx-angular/cdk/coercing';
import { rxState } from '@rx-angular/state';
import { rxActions } from '@rx-angular/state/actions';
import { rxEffects } from '@rx-angular/state/effects';
import { select } from '@rx-angular/state/selections';
import { RxLet } from '@rx-angular/template/let';
import {
  filter,
  fromEvent,
  map,
  merge,
  Observable,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs';

type UiActions = {
  searchChange: string;
  formClick: Event;
  outsideFormClick: Event;
  formSubmit: Event;
};

@Component({
  selector: 'ui-search-bar',
  template: `
    <form
      (submit)="ui.formSubmit($event)"
      #form
      class="form"
      (click)="ui.formClick($event)"
    >
      <button
        type="submit"
        class="magnifier-button"
        aria-label="Search for a movie"
      >
        <fast-svg name="search" size="1.125em"></fast-svg>
      </button>
      <input
        *rxLet="search$; let search"
        aria-label="Search Input"
        #searchInput
        [value]="search"
        (change)="ui.searchChange(searchInput.value)"
        placeholder="Search for a movie..."
        class="input"
      />
    </form>
  `,
  styleUrls: ['search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SearchBarComponent,
    },
  ],
  imports: [FastSvgComponent, RxLet],
})
export class SearchBarComponent implements ControlValueAccessor {
  inputRef = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  formRef = viewChild<ElementRef<HTMLFormElement>>('form');
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private document = inject(DOCUMENT);

  ui = rxActions<UiActions>(({ transforms }) => {
    transforms({
      formSubmit: (e: Event): Event => {
        e.preventDefault();
        return e;
      },
    });
  });

  private state = rxState<{ search: string; open: boolean }>(({ set }) => {
    set({ open: false, search: '' });
  });
  private effects = rxEffects();

  @Input()
  set query(v: string | Observable<string>) {
    this.state.connect('search', coerceObservable(v) as Observable<string>);
  }

  search$ = this.state.select('search');
  @Output() searchSubmit = this.ui.formSubmit$.pipe(
    withLatestFrom(this.state.select('search')),
    map(([_, search]) => search),
  );

  private onChange = (query: string) => {};

  private readonly closedFormClick$ = this.ui.formClick$.pipe(
    withLatestFrom(this.state.select('open')),
    filter(([_, opened]) => !opened),
  );

  private outsideClick(): Observable<Event> {
    // any click on the page (we can't use the option `once:true` as we might get multiple false trigger)
    return fromEvent(this.document, 'click').pipe(
      // forward if the form did NOT triggered the click
      // means we clicked somewhere else in the page but the form
      filter((e) => !this.formRef()!.nativeElement.contains(e.target as any)),
    );
  }

  /**
   * **🚀 Perf Tip for TBT, TTI:**
   *
   * We avoid `@HostListener('document')` as it would add an event listener on component bootstrap no matter if we need it or not.
   * This obviously will not scale.
   *
   * To avoid this we only listen to document click events after we clicked on the closed form.
   * If the needed event to close the form is received we stop listening to the document.
   *
   * This way we reduce the active event listeners to a minimum.
   */
  private readonly outsideOpenFormClick$ = this.closedFormClick$.pipe(
    switchMap(() => this.outsideClick().pipe(take(1))),
  );

  private readonly classList = this.elementRef.nativeElement.classList;

  constructor() {
    this.state.connect('search', this.ui.searchChange$);
    this.state.connect(
      'open',
      merge(this.ui.formSubmit$, this.outsideOpenFormClick$),
      () => false,
    );
    this.state.connect('open', this.closedFormClick$, () => true);

    this.effects.register(this.state.select('open'), this.setOpenedStyling);
    this.effects.register(this.closedFormClick$, this.focusInput);
    this.effects.register(this.state.$.pipe(select('search')), (search) => {
      this.onChange(search);
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState(isDisabled: boolean): void {}
  writeValue(obj: any): void {
    this.state.set({ search: obj || '' });
  }

  private readonly focusInput = () => {
    return this.inputRef()!.nativeElement.focus();
  };

  private readonly setOpenedStyling = (opened: boolean) => {
    opened ? this.classList.add('opened') : this.classList.remove('opened');
  };
}
