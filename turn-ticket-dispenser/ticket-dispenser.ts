import TurnNumberSequenceInterface from './turn-number-sequence-interface'
import TurnTicket from './turn-ticket'

/* 
    Extrair interface
    Inversão de dependência por Interface
    A classe TicketDispenser deve receber uma abstração da implementação que ela irá utilizar, através de uma interface TurnNumberSequenceInterface. 
*/
export default class TicketDispenser {
    private TurnNumberSequence: TurnNumberSequenceInterface
    
    constructor(TurnNumberSequence: TurnNumberSequenceInterface) {
        this.TurnNumberSequence = TurnNumberSequence
    }

    public getTurnTicket() {
        const newTurnNumber = this.TurnNumberSequence.getNextTurnNumber()
        const newTurnTicket = new TurnTicket(newTurnNumber)

        return newTurnTicket
    }
}
