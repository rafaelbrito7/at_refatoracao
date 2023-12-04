import SensorInterface from './sensor-inteface'

export default class Alarm {
    private highPressureThreshold: number
    private lowPressureThreshold: number

    /*
    Extração de Interfaces.
    Foi criada uma interface para que outras classes podem herdar os métodos da Classe Sensor   
    */
    private sensor: SensorInterface
    private alarmOn: boolean

    constructor(sensor: SensorInterface) {
        this.lowPressureThreshold = 17
        this.highPressureThreshold = 21
        this.sensor = sensor
        this.alarmOn = false
    }

    public check() {
        const psiPressureValue = this.sensor.popNextPressurePsiValue()
        /* Operador Ternário - O IF anterior tinha apenas para decidir qual atribuição realizar. */
        psiPressureValue < this.lowPressureThreshold || this.highPressureThreshold < psiPressureValue ? this.alarmOn = true : this.alarmOn = false
    }

    public isAlarmOn() {
        return this.alarmOn
    }
}
