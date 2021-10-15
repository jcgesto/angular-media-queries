import { BreakpointState } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { DeviceType } from '../models/device-type';
import { LayoutChangesService } from './layout-changes.service';

describe('LayoutChangesService', () => {

  it('should return the current device type', () => {
    const breakpointObserverMock = {
      isMatched: (mediaQuery: string): boolean => {
        if (mediaQuery === '(min-width: 1441px)') {
          return true;
        }
        return false;
      },
      observe: () => new Observable()
    }
    const layoutChangesService = new LayoutChangesService(breakpointObserverMock as any);
    expect(layoutChangesService.getActualDeviceType()).toBe(DeviceType.Desktop);
  });

  it('should notify the device type when a new media query is matched', (done) => {
    const subject = new Subject<BreakpointState>();
    const breakpointObserverMock = {
      observe: (): Observable<BreakpointState> => {
        return subject.asObservable();
      }
    }
    const layoutChangesService = new LayoutChangesService(breakpointObserverMock as any);
    layoutChangesService.layoutChanges?.subscribe(deviceType => {
      expect(deviceType).toBe(DeviceType.Desktop);
      done();
    })
    const breakpointState: BreakpointState = {
      matches: true,
      breakpoints: {
        '(min-width: 1441px)': true
      }
    }
    subject.next(breakpointState)
  })
});
