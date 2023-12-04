import { expect } from 'chai'
import 'mocha'
import HtmlTextConverter from '../text-converter/html-text-converter'
import TextReader from '../text-converter/text-reader'
import { convertedText } from './convertedHtml'

import * as path from 'path'

// - [x] read correct file name
// - [x] convert from text to html correctly

describe('Html Text Converter', () => {
    let filePath: string;
    let textReader: TextReader;

    beforeEach(() => {
    filePath = path.resolve(__dirname, 'simpleText.txt')
    textReader = new TextReader(filePath)
    })

    it('TextReader gets correct file name', () => {
        expect(textReader.getFilename()).to.equal(filePath)
    })

    it('TextReader gives correct text', () => {
        const expectedText = "Matéria: Refatoração\nProfessor: Rafael Cruz\nAluno: Rafael Brito"
        expect(textReader.getText()).to.equal(expectedText)
    })

    it('Return text converted correctly', () => {
        const converter = new HtmlTextConverter()
        const convertedHtml = converter.convertToHtml(textReader.getText())
        expect(convertedHtml).to.equal(convertedText)
    })
})
