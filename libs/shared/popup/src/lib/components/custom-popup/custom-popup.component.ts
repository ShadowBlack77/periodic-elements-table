import { Component, input, InputSignal, output, OutputEmitterRef } from "@angular/core";

@Component({
  selector: 'lib-custom-popup',
  templateUrl: './custom-popup.component.html'
})
export class CustomPopupComponent {

  readonly popupTitle: InputSignal<string> = input.required();

  protected readonly closeEmitter: OutputEmitterRef<void> = output<void>();
}