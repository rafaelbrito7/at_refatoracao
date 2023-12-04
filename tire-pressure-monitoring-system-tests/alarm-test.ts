import { expect } from 'chai'
import Alarm from '../tire-pressure-monitoring-system/alarm'
import SensorInterface from '../tire-pressure-monitoring-system/sensor-inteface'
import { mock, when, instance } from 'ts-mockito'

// - [x] Tests alarm for normal, high and low pressure

describe('Tire Pressure Monitoring System', () => {
    describe('Alarm ', () => {
        it('default is OFF', () => {
            const dummySensor: SensorInterface = mock<SensorInterface>()

            const alarm = new Alarm(dummySensor)
            expect(alarm.isAlarmOn()).to.equal(false)
        })

        it('is ON when high pressure (>21)', () => {
            const mockedSensor: SensorInterface = mock<SensorInterface>()

            when(mockedSensor.popNextPressurePsiValue()).thenReturn(22)

            const alarm = new Alarm(instance(mockedSensor))
            alarm.check()
            expect(alarm.isAlarmOn()).to.equal(true)
        })

        it('is ON when low pressure (<17)', () => {
            const mockedSensor: SensorInterface = mock<SensorInterface>()

            when(mockedSensor.popNextPressurePsiValue()).thenReturn(16)

            const alarm = new Alarm(instance(mockedSensor))
            alarm.check()
            expect(alarm.isAlarmOn()).to.equal(true)
        })

        it('is OFF when allowed pressure', () => {
            const mockedSensor: SensorInterface = mock<SensorInterface>()

            when(mockedSensor.popNextPressurePsiValue()).thenReturn(20)

            const alarm = new Alarm(instance(mockedSensor))
            alarm.check()
            expect(alarm.isAlarmOn()).to.equal(false)
        })
    })
})
