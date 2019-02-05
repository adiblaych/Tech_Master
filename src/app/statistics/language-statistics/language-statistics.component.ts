import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'services/statistics.service';

declare const Chart;

@Component({
  selector: 'language-statistics',
  templateUrl: './language-statistics.component.html',
  styleUrls: ['./language-statistics.component.scss']
})
export class LanguageStatisticsComponent implements OnInit {

  colors: String[] = ['#F47F09', '#0CF517', '#0CF1F5', '#F50CF5', '#F50C4C', '#0C6FF5', '#E8EF0D', '#960DEF'];

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.statisticsService.getLanguageStatistics().subscribe(res => {
      this.createPieChart(res);
    })
  }

  createPieChart(data) {
    new Chart('piechart', {
      type: 'doughnut',
        data: {
          labels: data.languages,
          datasets: [{
            data: data.values,
            backgroundColor: this.colors
          }]
        },
        options: {
          legend: {
            display: true,
            position: 'bottom'
          },
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Languages',
            position: 'bottom',
            fontSize: 16
          }
      }
    })
  }
}
