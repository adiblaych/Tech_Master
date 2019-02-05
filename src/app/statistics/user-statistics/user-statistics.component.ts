import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'services/statistics.service';
declare const Chart;

@Component({
  selector: 'user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.scss']
})
export class UserStatisticsComponent implements OnInit {

    colors: String[] = ['#F47F09', '#0CF517', '#0CF1F5', '#F50CF5', '#F50C4C', '#0C6FF5', '#E8EF0D', '#960DEF'];

    constructor(private statisticsService: StatisticsService) { }

    ngOnInit() {
        this.statisticsService.getLanguageStatistics().subscribe(res => {
            this.createBarChart(res);
        })
    }

    createBarChart(data) {
        new Chart('barchart', {
            type: 'bar',
            data: {
                labels: data.languages,
                datasets: [
                    {
                        backgroundColor: this.colors,
                        data: data.values,
                        fill: 'true'
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'User',
                    position: 'bottom',
                    fontSize: 16
                }
            }
        })
    }
}
