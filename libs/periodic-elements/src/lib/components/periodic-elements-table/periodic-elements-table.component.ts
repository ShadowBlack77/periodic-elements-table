import { Component, effect, inject, OnDestroy, output, OutputEmitterRef, signal, Signal, WritableSignal } from "@angular/core";
import { PeriodicElementsStore } from "../../store/periodic-elements.store";
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, Subject, takeUntil, tap } from "rxjs";
import { PeriodicElement } from "../../models/periodic-element.model";

@Component({
  selector: 'lib-periodic-elements-table',
  templateUrl: './periodic-elements-table.component.html',
  imports: [
    MatTableModule,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule, 
    MatIconModule,
  ]
})
export class PeriodicElementsTableComponent implements OnDestroy {

  private readonly _destroy$: Subject<void> = new Subject<void>();

  protected readonly store = inject(PeriodicElementsStore);

  protected readonly displayedColumns: Signal<string[]> = signal(['position', 'name', 'weight', 'symbol', 'actions']);
  protected readonly filterValue: WritableSignal<string> = signal('');

  protected readonly updatePeriodicElement: OutputEmitterRef<PeriodicElement> = output<PeriodicElement>();

  constructor() {
    toObservable(this.filterValue).pipe(
      takeUntil(this._destroy$),
      tap(() => {
        this.store.setLoading();
      }),
      debounceTime(2000)
    ).subscribe((value) => {
      this.store.filterBy(value);
    })
  }

  updatePeriod(periodNumber: PeriodicElement): void {
    this.updatePeriodicElement.emit(periodNumber);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}