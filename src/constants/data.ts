import { IUserWord } from "../interfaces/interfaces"

export const DEVELOPERS = [
  {
    'fullname': 'Анастасия Халмаматова',
    'github': 'https://github.com/ansiahalm',
    'image' : './assets/ansiahalm.jpg',
    'alt' : 'ansiahalm',
    'about' : 'Перспективный Junior-FE разработчик, с опытом работы над проектами разных уровней сложности и огромным дизайнерский бэкграундом',
  },
  {
    'fullname': 'Андрей Красько',
    'github': 'https://github.com/piligrimandrei',
    'image' : './assets/piligrimandrei.png',
    'alt' : 'piligrimandrei',
    'about' : 'about',
  },
  {
    'fullname': 'Данила Халмаматов',
    'github': 'https://github.com/danilahalm',
    'image' : './assets/danilahalm.jpg',
    'alt' : 'danilahalm',
    'about' : 'Уверенный Junior-FE разработчик, с большим потенциалом и не меньшим желанием изучать данную профессиюю. 30 лет',
  },
]

export const ADVANTAGES_CARDS_CONTENT = [
  {
    heading: "Учебник",
    text: "Слова разбиты на разделы по уровню подготовки.",
    src: "./assets/bookIco.png",
    alt: "bookIco",
  },
  {
    heading: "Игры",
    text: "Изучая новые слова в игре, вы на ходу освоите синтаксис и грамматику.",
    src: "./assets/gamesIco.png",
    alt: "gamesIco",
  },
  {
    heading: "Статистика",
    text: "Отслеживайте свой прогресс и узнавайте, сколько новых слов вы выучили.",
    src: "./assets/statisticsIco.png",
    alt: "statisticsIco",
  },
]


export let WORD_POPUP_CORRECT_COUNT = 0

export let WORD_POPUP_ERROR_COUNT = 0

export const MAX_CARDS_ON_PAGE = 20

export const DIFFICULTIES = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] 

export const MAX_CARDS_ON_AUDIOGAME = 5 

export const MAX_DESCRIPTION_FIELDS_ON_CARD = 3

export const STATISTIC_CONTENT = [
  {
    title: "Аудиовызов",
    newWord: "Новых слов: ",
    currectAnswer: "Правильных<br>ответов:",
    serie: "Самая длинная<br>серия:",
  },
  {
    title: "Спринт",
    newWord: "Новых слов: ",
    currectAnswer: "Правильных<br>ответов:",
    serie: "Самая длинная<br>серия:",
  },
  {
    title: "Итог за день",
    newWord: "Новых слов: ",
    currectAnswer: "Правильных<br>ответов:",
    learnedWord: "Изученных<br>слов:",
  },
]

export let commonUserWord: IUserWord = {
  difficulty: "easy", 
  optional: {
    learned: 0,
    countUse: 0,
    counteCorrect: 0,
    countUseSprint: 0,
    countCorrectSprint: 0,
    countUseAudiocall: 0,
    countCorrectAudiocall: 0,
  }
}
