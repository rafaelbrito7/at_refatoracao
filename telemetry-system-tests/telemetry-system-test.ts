import { expect } from 'chai';
import { mock, when, instance } from 'ts-mockito';
import { IConnectionEventSimulator } from '../telemetry-system/connectionEventSimulator';
import { ITelemetryClient, TelemetryClient } from '../telemetry-system/telemetry-client';

describe('TelemetryClient', () => {
    let telemetryClient: ITelemetryClient;
    let mockedConnectionSimulator: IConnectionEventSimulator;

    beforeEach(() => {
        mockedConnectionSimulator = mock<IConnectionEventSimulator>();
        telemetryClient = new TelemetryClient(instance(mockedConnectionSimulator));
    });

    it('should throw an error when trying to connect with an empty connection string', () => {
        expect(() => telemetryClient.connect('')).to.throw('missing telemetryServerConnectionString parameter');
    });

    it('should be disconnected by default', () => {
        expect(telemetryClient.onlineStatus()).to.be.false;
    });

    it('should be able to connect', () => {
        when(mockedConnectionSimulator.simulate(1, 10)).thenReturn(8);
        telemetryClient.connect('valid.connection.string');
        expect(telemetryClient.onlineStatus()).to.be.true;
    });

    it('should disconnect', () => {
        when(mockedConnectionSimulator.simulate(1, 10)).thenReturn(8);
        telemetryClient.connect('valid.connection.string');
        telemetryClient.disconnect();
        expect(telemetryClient.onlineStatus()).to.be.false;
    });

    it('should throw an error when sending an empty message', () => {
        expect(() => telemetryClient.send('')).to.throw('missing message parameter');
    });

    it('should receive a diagnostic message when sent', () => {
        telemetryClient.send(telemetryClient.diagnosticMessage());
        const received = telemetryClient.receive();
        expect(received).to.include('LAST TX rate................ 100 MBPS');
    });

    it('should receive a random message string when no diagnostic message is set', () => {
        when(mockedConnectionSimulator.simulate(50, 110)).thenReturn(80); // Random number for the message length
        const received = telemetryClient.receive();
        expect(received).to.not.be.empty;
    });
});
