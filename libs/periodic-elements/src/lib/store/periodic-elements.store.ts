import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { PeriodicElement } from "../models/periodic-element.model";
import { computed, inject } from '@angular/core';
import { PeriodicElementsService } from '../services/periodic-elements.service';
import { take } from 'rxjs';

export interface PeriodicElementsState {
  readonly periodicElements: PeriodicElement[];
  readonly isLoading: boolean;
  readonly filterBy: string;
}

const initialState: PeriodicElementsState = {
  periodicElements: [],
  isLoading: false,
  filterBy: ''
}

export const PeriodicElementsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ periodicElements, filterBy }) => ({
    periodicElements: computed(() => {
      return periodicElements().filter((element) => {
        const search = filterBy().toLowerCase();

        return Object.values(element).some((value) => {
          return value.toString().toLowerCase().includes(search);
        })
      })
    })
  })),
  withMethods((store, periodicElementsService: PeriodicElementsService = inject(PeriodicElementsService)) => ({
    loadAll() {
      patchState(store, {
        isLoading: true
      });

      periodicElementsService.getAll().pipe(
        take(1)
      ).subscribe({
        next: (periodicElements) => {
          patchState(store, {
            periodicElements,
            isLoading: false
          })
        }
      })
    },
    update(periodicElement: PeriodicElement) {
      patchState(store, {
        periodicElements: store.periodicElements().map((element) => {
          return element.position === periodicElement.position ? periodicElement : element
        })
      })
    },
    setLoading() {
      patchState(store, {
        isLoading: true
      })
    },
    filterBy(filterValue: string) {
      patchState(store, {
        filterBy: filterValue,
        isLoading: false
      })
    }
  }))
);