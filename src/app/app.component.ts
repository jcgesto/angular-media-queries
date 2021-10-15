import { Component, OnInit } from '@angular/core';
import { DeviceType } from './models/device-type';
import { LayoutChangesService } from './services/layout-changes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  deviceType: DeviceType | undefined = DeviceType.Mobile;

  constructor(private readonly layoutChangesService: LayoutChangesService) {}
  
  ngOnInit(): void {
    this.deviceType = this.layoutChangesService.getActualDeviceType();
    this.layoutChangesService.layoutChanges?.subscribe(deviceType => {
      this.deviceType = deviceType;
    });
  }
}
