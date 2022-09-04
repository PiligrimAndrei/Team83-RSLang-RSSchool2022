import { Component } from '../components';
import { Paragraph } from "../../components/paragraph/paragraph";
import { Image } from "../../components/image/image";
import { Span } from '../span/span';
import { WORD_POPUP_CORRECT_COUNT } from '../../constants/data';
import { WORD_POPUP_ERROR_COUNT } from '../../constants/data';
import './word.css'
import { IWord, IUserWord } from '../../interfaces/interfaces';
import { getWord, getWords } from '../../api/api';

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

    constructor( parentNode: HTMLElement , currentWord: IWord, learnedNumber: number, userWord?: IUserWord | null){
        super(parentNode, 'div', ['wordContainer'])

        this.wordImage = new Image(
            this.element,
            ['wordImage'],
            currentWord.image,
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
            ['learnTracker1','learnTracker'],
            ''
        )
        this.learnTracker2 = new Span(
            this.trackerContainer.element,
            ['learnTracker2','learnTracker'],
            ''
        )
        this.learnTracker3 = new Span(
            this.trackerContainer.element,
            ['learnTracker3','learnTracker'],
            ''
        )
        learnedNumber > 0 ? this.learnTracker1.element.classList.add('active') : null
        learnedNumber > 1 ? this.learnTracker2.element.classList.add('active') : null
        learnedNumber > 2 ? this.learnTracker3.element.classList.add('active') : null    
        if(userWord !== null) {
            userWord?.optional.learned! > 0 ? this.learnTracker1.element.classList.add('active') : null
            userWord?.optional.learned! > 1 ? this.learnTracker2.element.classList.add('active') : null
            userWord?.optional.learned! > 2 ? this.learnTracker3.element.classList.add('active') : null    
        }

        this.wordName = new Paragraph(
            this.element,
            ['wordName'],
            currentWord.word
        )
        
        this.wordPronunciationContainer = new Component(
            this.element,
            'div',
            ['wordPronunciationContainer']
        )

        this.wordTranscription = new Paragraph(
            this.wordPronunciationContainer.element,
            ['wordTranscription'],
            currentWord.transcription
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
            currentWord.wordTranslate
        )

        this.wordMeaning = new Paragraph(
            this.element,
            ['wordMeaning'],
            currentWord.textMeaning
        )

        this.wordMeaningTranslation = new Paragraph(
            this.element,
            ['wordMeaningTranslation'],
            currentWord.textMeaningTranslate
        )

        this.wordExampleTitle = new Paragraph(
            this.element,
            ['wordExampleTitle'],
            'Использование слова:'
        )

        this.wordExample = new Paragraph(
            this.element,
            ['wordExample'],
            currentWord.textExample
        )

        this.wordExampleTranslation = new Paragraph(
            this.element,
            ['wordExampleTranslation'],
            currentWord.textExampleTranslate
        )
    }

}

