import { Chart, registerables } from "chart.js";
import { Component } from "../../components/components";
import { Paragraph } from '../../components/paragraph/paragraph';
import { STATISTIC_CONTENT } from '../../constants/data';
import './statistic.css'
import { Canvas } from '../../components/canvas/canvas';

export class Statistic extends Component{
    private statisticDay: Component;
    private titleStatisticDay: Paragraph;
    private contentStatisticDay: Component;
    private cardStatisticDay!: Component;
    private cardTitleStatisticDay!: Paragraph;
    private cardTitlesStatisticDay!: Component;
    private cardParamsStatisticDay!: Component;
    private ParametersStatisticDay!: Component;
    private Parameter1StatisticDay!: Paragraph;
    private Parameter2StatisticDay!: Paragraph;
    private Parameters3StatisticDay!: Paragraph;
    private countParametersStatisticDay: Component | undefined;
    private countParameter1StatisticDay: Paragraph | undefined;
    private countParameter2StatisticDay: Paragraph | undefined;
    private countParameters3StatisticDay: Paragraph | undefined;
    private statisticAllTime: Component;
    private titleStatisticAllTime: Paragraph;
    private contentStatisticAllTime: Component;
    private content2StatisticAllTime: Component;
    private graph: Canvas;
    chart: any;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
   

    
    constructor(parentNode: HTMLElement){
        super(parentNode, 'div', ['statistic']);

        this.statisticDay = new Component(
            this.element,
            'div',
            ['statisticDay']
        )
        this.titleStatisticDay = new Paragraph(
            this.statisticDay.element,
            ['titleStatisticDay'],
            'Статистика за день'
        )
        this.contentStatisticDay = new Component(
            this.statisticDay.element,
            'div',
            ['contentStatisticDay']
        )

        for(let i = 0; i < STATISTIC_CONTENT.length; i += 1){
            this.cardStatisticDay = new Component(
                this.contentStatisticDay.element,
                'div',
                ['cardStatisticDay']
            )
            this.cardTitleStatisticDay = new Paragraph(
                this.cardStatisticDay.element,
                ['cardTitleStatisticDay'],
                `${STATISTIC_CONTENT[i].title}`
            )

            this.ParametersStatisticDay = new Component(
                this.cardStatisticDay.element,
                'div',
                ['ParametersStatisticDay']
            )
            this.Parameter1StatisticDay = new Paragraph(
                this.ParametersStatisticDay.element,
                ['parameterOneStatisticDay'],
                `${STATISTIC_CONTENT[i].newWord}`
            )
            this.Parameter2StatisticDay = new Paragraph(
                this.ParametersStatisticDay.element,
                ['parameterTwoStatisticDay'],
                `${STATISTIC_CONTENT[i].currectAnswer}`
            )
            if(i === 2){
                this.Parameters3StatisticDay = new Paragraph(
                    this.ParametersStatisticDay.element,
                    ['parameterThreeStatisticDay'],
                    `${STATISTIC_CONTENT[i].learnedWord}`
                )
            } else {
                this.Parameters3StatisticDay = new Paragraph(
                    this.ParametersStatisticDay.element,
                    ['parameterThreeStatisticDay'],
                    `${STATISTIC_CONTENT[i].serie}`
                )
            }
        }

        this.statisticAllTime = new Component(
            this.element,
            'div',
            ['statisticAllTime']
        )
        this.titleStatisticAllTime = new Paragraph(
            this.statisticAllTime.element,
            ['titleStatisticAllTime'],
            'Статистика за все время'
        )
        this.contentStatisticAllTime = new Component(
            this.statisticAllTime.element,
            'div',
            ['contentStatisticAllTime']
        )
        this.graph = new Canvas(
            this.contentStatisticAllTime.element,
            'myChart'
        )
        Chart.register(...registerables);
        this.canvas = document.querySelector("#myChart") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D

        let data = [{x: '0', first: 0, second: 0}, {x: '1', first: 12, second: 12}, {x: '2', first: 25, second: 30}, {x: '3', first: 4, second: 55}];

        this.chart = new Chart(
            this.ctx,
            {   type: 'line',
                data: {
                    labels: [
                        '0',
                        '1',
                        '2',
                        '3',
                        '4',
                        '5',
                      ],
                    datasets: [{
                        label: 'Количество новых слов за каждый день изучения',
                        backgroundColor: '#000000',
                        borderColor: '#97D9E9',
                        data: data,
                        parsing: {
                            yAxisKey: 'first'
                        }
                    },
                    {
                        label: 'Общее количество изученных слов',
                        backgroundColor: '#000000',
                        borderColor: '#9747FF',
                        data: data,
                        parsing: {
                            yAxisKey: 'second'
                        }
                        }]
                },
                options: {}
        }

        )

        this.content2StatisticAllTime = new Component(
            this.statisticAllTime.element,
            'div',
            ['content2StatisticAllTime']
        )
       
    }
    
}