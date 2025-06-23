import { AfterContentInit, Component, inject, input, InputSignal, output, OutputEmitterRef } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { PeriodicElement } from "../../models/periodic-element.model";
import { PeriodicElementsStore } from "../../store/periodic-elements.store";

@Component({
  selector: 'lib-update-periodic-element-popup-form',
  templateUrl: './update-periodic-element-popup-form.component.html',
  imports: [
    ReactiveFormsModule
  ]
})
export class UpdatePeriodicElementPopupFormComponent implements AfterContentInit {
  
  private readonly _store = inject(PeriodicElementsStore);

  readonly periodicElement: InputSignal<PeriodicElement | null> = input<PeriodicElement | null>(null);

  protected readonly closePopup: OutputEmitterRef<void> = output<void>();
  protected readonly periodicElementForm: FormGroup = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    }),
    weight: new FormControl(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(0)
      ]
    }),
    symbol: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(1)
      ]
    })
  })

  ngAfterContentInit(): void {
    this.periodicElementForm.setValue({ 
      name: this.periodicElement()?.name,
      weight: this.periodicElement()?.weight,
      symbol: this.periodicElement()?.symbol
    });
  }

  onSubmit(): void {
    const updatedPeriodicElement = {
      position: this.periodicElement()?.position,
      ...this.periodicElementForm.getRawValue()
    }

    this._store.update(updatedPeriodicElement);

    this.closePopup.emit();
  }
}