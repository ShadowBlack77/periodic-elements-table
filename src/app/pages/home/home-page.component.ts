import { Component, signal, WritableSignal } from "@angular/core";
import { PeriodicElementsTableComponent, UpdatePeriodicElementPopupFormComponent } from "@lib/periodic-elements";
import { CustomPopupComponent } from "@lib/shared/popup";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [
    PeriodicElementsTableComponent,
    UpdatePeriodicElementPopupFormComponent,
    CustomPopupComponent,
  ]
})
export class HomePageComponent {

  protected readonly showPopup: WritableSignal<boolean> = signal(false);
  protected readonly periodicElement: WritableSignal<any> = signal(null);

  handlePeriodElementUpdate(event: any): void {
    this.periodicElement.set(event);
    this.showPopup.set(true);
  }

  handlePopupClose(): void {
    this.showPopup.set(false);
  }
}