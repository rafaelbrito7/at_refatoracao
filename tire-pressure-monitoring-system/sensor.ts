// The reading of the pressure value from the sensor is simulated in this implementation.
// Because the focus of the exercise is on the other class.

import SensorInterface from './sensor-inteface'

export default class Sensor implements SensorInterface {
    private offset() { return 16 }
    
    public popNextPressurePsiValue() {
        const pressureTelemetryValue = this.samplePressure()

        return this.offset() + pressureTelemetryValue
    }

    private samplePressure() {
        const pressureTelemetryValue = Math.floor(6 * Math.random() * Math.random())
        return pressureTelemetryValue
    }
}
