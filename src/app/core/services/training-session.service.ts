import { Injectable } from '@angular/core';
import { TrainingSession } from '../../shared/model/training-session.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingSessionService {
  private trainingSessions: TrainingSession[] = []; 

  constructor() { }

  addTrainingSession(session: TrainingSession): void {
    this.trainingSessions.push(session);
  }
  getTrainingSessions(): TrainingSession[] {
    return this.trainingSessions;
  }

  getTrainingByType(type: string): TrainingSession[] {
    return this.trainingSessions.filter(session => session.terrainType === type);
  }

  getStatistics(): { totalDistance: number, totalTime: number, averageSpeed: number } {
    const totalDistance = this.trainingSessions.reduce((sum, session) => sum + session.distance, 0);
    const totalTime = this.trainingSessions.reduce((sum, session) => sum + session.time, 0);
    const averageSpeed = totalTime > 0 ? parseFloat((totalDistance / totalTime).toFixed(2)) : 0;
    return {
      totalDistance,
      totalTime,
      averageSpeed
    };
  }

  getTrainingCountByType(): { [key: string]: number } {
    const typeCount: { [key: string]: number } = {};

    this.trainingSessions.forEach(session => {
      if (typeCount[session.terrainType]) {
        typeCount[session.terrainType]++;
      } else {
        typeCount[session.terrainType] = 1;
      }
    });

    return typeCount;
  }
}
