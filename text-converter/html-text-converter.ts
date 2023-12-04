/* Extração de Classes, Mover responsabilidades
  A classe html-text-converter estava fazendo um trabalho (leitura do arquivo) que poderia ser feito por outra classe.  
  Foi criada a classe que trabalha somente com a leitura do arquivo
  Retirado o aclopameto da função anterior
*/
export default class HtmlTextConverter {

    public convertToHtml(string: string): string {
        return HtmlEscapeUtils.prototype.escape(string)
    }
}

/* 
Renomear método ou variável
A método stashNextCharacterAndAdvanceThePointer() foi substituido pela classe HTMLEscapeUtils

Switch
Substituição de Condicional por Polimorfismo. O switch foi trocado por uma classe que 

Extrair interface
implementa a interface StringEscapeUtils das string de escape.
*/

class HtmlEscapeUtils implements StringEscapeUtils {
    public escape(input: string): string {
        let output = input
        output = output.replace(/&/g, '&amp;')
        output = output.replace(/</g, '&lt;')
        output = output.replace(/>/g, '&gt;')
        output = output.replace(/\n/g, '<br />')
        return output
    }
}

/*
Extração de Interfaces.
Foi criada uma interface para que outras classes possam herdar os métodos da Classe    
*/

interface StringEscapeUtils {
    escape(input: string): string
}
