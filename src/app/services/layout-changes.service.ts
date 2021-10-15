import { Injectable } from "@angular/core";
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { DeviceType } from "../models/device-type";
import { BreakpointDefinition } from "../models/breakpoint-definition";

@Injectable({
  providedIn: 'root'
})
export class LayoutChangesService {

  private readonly breakpointsDefinition: BreakpointDefinition[] = [
    { device: DeviceType.Mobile, mediaQuery: '(max-width: 580px)' },
    { device: DeviceType.BigMobile, mediaQuery: '(min-width: 581px) and (max-width: 768px)' },
    { device: DeviceType.TabletPortrait, mediaQuery: '(min-width: 769px) and (max-width: 1024px)' },
    { device: DeviceType.TabletLandscape, mediaQuery: '(min-width: 1025px) and (max-width: 1280px)' },
    { device: DeviceType.Laptop, mediaQuery: '(min-width: 1281px) and (max-width: 1440px)' },
    { device: DeviceType.Desktop, mediaQuery: '(min-width: 1441px)' }
  ];

  layoutChanges: Observable<DeviceType | undefined> | undefined;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.init();
  }

  init(): void {
    const mediaQueries = this.breakpointsDefinition.map(breakpointDefinition => breakpointDefinition.mediaQuery);
    this.layoutChanges = this.breakpointObserver.observe(mediaQueries).pipe(map(this.getBreakpointStateDevice.bind(this)));
  }

  getActualDeviceType(): DeviceType | undefined {
    return this.breakpointsDefinition.find(breakpointDefinition => this.breakpointObserver.isMatched(breakpointDefinition.mediaQuery))?.device;
  }

  private getBreakpointStateDevice(breakpointState: BreakpointState): DeviceType | undefined {
    const mediaQueryActive = Object.keys(breakpointState.breakpoints).find(breakpointKey => breakpointState.breakpoints[breakpointKey]);
    return this.breakpointsDefinition.find(breakpointDefinition => breakpointDefinition.mediaQuery === mediaQueryActive)?.device;
  }
}