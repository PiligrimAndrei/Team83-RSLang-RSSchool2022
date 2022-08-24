import { Component } from '../components';
import { Paragraph } from "../../components/paragraph/paragraph";
import { Image } from "../../components/image/image";
import { Span } from '../span/span';
import { WORD_POPUP_CORRECT_COUNT } from '../../constants/data';
import { WORD_POPUP_ERROR_COUNT } from '../../constants/data';
import './word.css'

export class Word extends Component {
    private wordImage: Image;
    private trackerContainer: Component;
    private learnTracker1: Span;
    private learnTracker2: Span;
    private learnTracker3: Span;
    private wordName: Paragraph;
    private wordPronunciationContainer: Component;
    private wordTranscription: Paragraph;
    private wordPronunciationImage: Image;
    private wordNameTranslation: Paragraph;
    private wordMeaning: Paragraph;
    private wordMeaningTranslation: Paragraph;
    private wordExampleTitle: Paragraph;
    private wordExample: Paragraph;
    private wordExampleTranslation: Paragraph;
    private popupРintContainer: Component;
    private popupTitle: Paragraph;
    private popupCorrectCount: Paragraph;
    private popupErrorCount: Paragraph;

    constructor( parentNode: HTMLElement ){
        super(parentNode, 'div', ['wordContainer'])

        this.wordImage = new Image(
            this.element,
            ['wordImage'],
            '',
            'wordImage'
        )
        
        this.popupРintContainer = new Component(
            this.element,
            'div',
            ['popupРintContainer']
        )

        this.popupTitle = new Paragraph(
            this.popupРintContainer.element,
            ['popupTitle'],
            ''
        )

        this.popupCorrectCount = new Paragraph(
            this.popupРintContainer.element,
            ['popupCorrectCount'],
            `Правильно угадано: ${WORD_POPUP_CORRECT_COUNT}`
        )
        
        this.popupErrorCount = new Paragraph(
            this.popupРintContainer.element,
            ['popupErrorCount'],
            `Ошибок: ${WORD_POPUP_ERROR_COUNT}`
        )

        this.trackerContainer = new Component(
            this.element,
            'div',
            ['trackerContainer']
        )

        this.learnTracker1 = new Span(
            this.trackerContainer.element,
            ['learnTracker1'],
            ''
        )
        this.learnTracker2 = new Span(
            this.trackerContainer.element,
            ['learnTracker2'],
            ''
        )
        this.learnTracker3 = new Span(
            this.trackerContainer.element,
            ['learnTracker3'],
            ''
        )

        this.wordName = new Paragraph(
            this.element,
            ['wordName'],
            '111'
        )
        
        this.wordPronunciationContainer = new Component(
            this.element,
            'div',
            ['wordPronunciationContainer']
        )

        this.wordTranscription = new Paragraph(
            this.wordPronunciationContainer.element,
            ['wordTranscription'],
            '[111]'
        )

        this.wordPronunciationImage = new Image(
            this.wordPronunciationContainer.element,
            ['wordPronunciationImage'],
            './assets/wordPronunciation.svg',
            'wordPronunciation'
        )

        this.wordNameTranslation = new Paragraph(
            this.element,
            ['wordNameTranslation'],
            '111'
        )

        this.wordMeaning = new Paragraph(
            this.element,
            ['wordMeaning'],
            '11'
        )

        this.wordMeaningTranslation = new Paragraph(
            this.element,
            ['wordMeaningTranslation'],
            '11'
        )

        this.wordExampleTitle = new Paragraph(
            this.element,
            ['wordExampleTitle'],
            'Использование слова:'
        )

        this.wordExample = new Paragraph(
            this.element,
            ['wordExample'],
            '1'
        )

        this.wordExampleTranslation = new Paragraph(
            this.element,
            ['wordExampleTranslation'],
            '1'
        )
    }
}