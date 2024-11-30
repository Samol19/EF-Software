import { Component,OnInit } from '@angular/core';
import { TrainingSessionService } from '../../core/services/training-session.service';
import { Chart, registerables } from 'chart.js'; 
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-training-session-reports',
  standalone: true,
  imports: [MatCardModule,CommonModule],
  templateUrl: './training-session-reports.component.html',
  styleUrl: './training-session-reports.component.css'
})

export class TrainingSessionReportsComponent implements OnInit{
  public chart: any;  

  constructor(private trainingService: TrainingSessionService) {
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    this.generateChart();  
  }
  generateChart(): void {
    const trainingCountByType = this.trainingService.getTrainingCountByType();
    const labels = Object.keys(trainingCountByType);
    const data = Object.values(trainingCountByType);

    this.chart = new Chart('trainingChart', {
      type: 'bar',  //barras
      data: {
        labels: labels, 
        datasets: [{
          label: 'Reporte de entrenamiento',
          data: data,
          backgroundColor: 'rgba(63,81,181,0.6)',
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Tipo de Terreno'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Cantidad de Entrenamientos'
            },
            beginAtZero: true 
          }
        }
      }
    });
  }
}