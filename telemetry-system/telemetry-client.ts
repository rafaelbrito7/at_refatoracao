import { IConnectionEventSimulator } from "./connectionEventSimulator";
import { DIAGNOSTIC_MESSAGE, diagnosticMessageResult } from "./diagnosticMessages";

export interface ITelemetryClient {
  onlineStatus(): boolean;
  connect(telemetryServerConnectionString: string): void;
  disconnect(): void;
  send(message: string): void;
  receive(): string;
  diagnosticMessage(): string;
}

export class TelemetryClient implements ITelemetryClient {
  private _onlineStatus = false;
  private _diagnosticMessageResult = '';
  private _connectionSimulator: IConnectionEventSimulator;

  constructor(connectionSimulator: IConnectionEventSimulator) {
    this._connectionSimulator = connectionSimulator;
  }

  onlineStatus(): boolean {
    return this._onlineStatus;
  }

  connect(telemetryServerConnectionString: string): void {
    if (!telemetryServerConnectionString) {
      throw new Error('missing telemetryServerConnectionString parameter');
    }

    const success = this._connectionSimulator.simulate(1, 10) <= 8;
    this._onlineStatus = success;
  }

  disconnect(): void {
    this._onlineStatus = false;
  }

  send(message: string): void {
    if (!message) {
      throw new Error('missing message parameter');
    }

    if (message === DIAGNOSTIC_MESSAGE) {
      this._diagnosticMessageResult = diagnosticMessageResult;
    }
  }

  receive(): string {
    let message: string;

    if (!this._diagnosticMessageResult) {
      message = '';
      const messageLength = this._connectionSimulator.simulate(50, 110);
      for (let i = messageLength; i >= 0; --i) {
        message += this._connectionSimulator.simulate(40, 126);
      }
    } else {
      message = this._diagnosticMessageResult;
      this._diagnosticMessageResult = '';
    }

    return message;
  }

  diagnosticMessage(): string {
    return DIAGNOSTIC_MESSAGE
  }
}
