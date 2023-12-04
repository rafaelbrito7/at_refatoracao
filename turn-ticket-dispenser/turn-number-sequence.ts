import TurnNumberSequenceInterface from './turn-number-sequence-interface'

/* 
    Extrair interface
    Inversão de dependência por Interface
    A classe TicketDispenser deve receber uma abstração da implementação que ela irá utilizar, através de uma interface TurnNumberSequenceInterface. 
*/
export default class TurnNumberSequence implements TurnNumberSequenceInterface {
    private turnNumber: number

    constructor() {
        this.turnNumber = 0
    }

    public getNextTurnNumber() {
        return this.turnNumber++
    }
}
