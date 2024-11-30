import { Component } from '@angular/core';
import { TrainingSessionService } from '../../core/services/training-session.service';
import { TrainingSession } from '../../shared/model/training-session.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-training-session-form',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,MatSelectModule,
    MatButtonModule,MatTableModule,
    ReactiveFormsModule, CommonModule, MatCardModule],
  templateUrl: './training-session-form.component.html',
  styleUrl: './training-session-form.component.css'
})
export class TrainingSessionFormComponent {
  trainingForm: FormGroup;
  filterForm: FormGroup;
  displayedColumns: string[] = ['date', 'distance', 'time', 'averagePace', 'terrainType'];
  dataSource: MatTableDataSource<TrainingSession> = new MatTableDataSource<TrainingSession>();
  terrainTypes = ['Asfalto', 'Montaña', 'Pista'];
  selectedTerrainType: string = '';

  statistics: { totalDistance: number, totalTime: number, averageSpeed: number } | null = null;


  constructor(
    private fb: FormBuilder,
    private trainingService: TrainingSessionService
  ) {
    //VALIDACIONES
    this.trainingForm = this.fb.group({
      date: ['', Validators.required],
      distance: ['', [Validators.required, Validators.min(0.1)]],
      time: ['', [Validators.required, Validators.min(1)]],
      terrainType: ['', Validators.required]
    });

    this.filterForm = this.fb.group({
      terrainTypeFilter: ['']
    });
  }

  onSubmit(): void {
    if (this.trainingForm.valid) {
      const formValue = this.trainingForm.value;
      const newSession: TrainingSession = {
        date: new Date(formValue.date),
        distance: formValue.distance,
        time: formValue.time,
        averagePace: formValue.time > 0 ? parseFloat((formValue.distance / (formValue.time / 60)).toFixed(2)) : 0,
        terrainType: formValue.terrainType
      };

      this.trainingService.addTrainingSession(newSession);
      this.trainingForm.reset();
      this.loadTrainings();
    }
  }

  loadTrainings(): void {
    const trainingSessions = this.trainingService.getTrainingSessions();
    this.dataSource.data = trainingSessions;
    this.updateStatistics();
  }
  updateStatistics(): void {
    this.statistics = this.trainingService.getStatistics();
  }

  onFilterChange(): void {
    const terrainType = this.filterForm.get('terrainTypeFilter')?.value;
    if (terrainType) {
      const filteredSessions = this.trainingService.getTrainingByType(terrainType);
      this.dataSource.data = filteredSessions; 
    } else {
      this.loadTrainings(); 
    }
  }
}