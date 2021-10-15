import { DeviceType } from "./device-type";

export type BreakpointDefinition = {
    device: DeviceType,
    mediaQuery: string
}