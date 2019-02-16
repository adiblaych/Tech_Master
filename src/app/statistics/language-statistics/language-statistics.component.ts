import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'services/statistics.service';
import { Langueges } from 'services/models/langueges';

declare const Chart;

@Component({
  selector: 'language-statistics',
  templateUrl: './language-statistics.component.html',
  styleUrls: ['./language-statistics.component.scss']
})
export class LanguageStatisticsComponent implements OnInit {
  PlangList: Langueges[];
  nameLang: string[];
  uses: number[];
  colors: String[] = ['#F47F09', '#0CF517', '#0CF1F5', '#F50CF5', '#F50C4C', '#0C6FF5', '#E8EF0D', '#960DEF'];

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.statisticsService.getLanguageStatistics().
    subscribe(data => {
        this.PlangList = data
        this.PlangList.forEach(lang => {
              this.nameLang.push(lang.subLangueges);
              this.uses.push(lang.numOfUses);
       });
       this.createPieChart(this.nameLang, this.uses);
   }, error => { console.log(error) });
  }

  createPieChart(languages, values) {
    new Chart('piechart', {
      type: 'doughnut',
        data: {
          labels: languages,
          datasets: [{
            data: values,
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
