import { ITelemetryClient } from "./telemetry-client";

const MAX_CONNECTION_ATTEMPTS = 3;
const DIAGNOSTIC_INFO_INITIAL = '';

export class TelemetryDiagnosticControls {
  private _telemetryClient: ITelemetryClient;
  private _diagnosticChannelConnectionString = '*111#';
  private _diagnosticInfo = '';

  constructor(telemetryClient: ITelemetryClient) {
    this._telemetryClient = telemetryClient;
  }

  checkTransmission(): void {
    this._diagnosticInfo = DIAGNOSTIC_INFO_INITIAL;
    this._telemetryClient.disconnect();

    let retryLeft = MAX_CONNECTION_ATTEMPTS;
    while (!this._telemetryClient.onlineStatus() && retryLeft > 0) {
      this._telemetryClient.connect(this._diagnosticChannelConnectionString);
      retryLeft -= 1;
    }

    if (!this._telemetryClient.onlineStatus()) {
      throw new Error('Unable to connect');
    }

    this._telemetryClient.send(this._telemetryClient.diagnosticMessage());
    this._diagnosticInfo = this._telemetryClient.receive();
  }
  
  readDiagnosticInfo(): string {
    return this._diagnosticInfo;
  }

  writeDiagnosticInfo(newValue: string): void {
    this._diagnosticInfo = newValue;
  }

}