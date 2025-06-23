import { inject, Injectable } from "@angular/core";
import { PeriodicElementsStore } from "../store/periodic-elements.store";

@Injectable({
  providedIn: 'root'
})
export class PeriodicElementsResolver {

  private readonly _store = inject(PeriodicElementsStore);

  resolve(): void {
    this._store.loadAll();
  }
}