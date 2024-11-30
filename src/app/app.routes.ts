import { Routes } from '@angular/router';
import { TrainingSessionFormComponent } from './pages/training-session-form/training-session-form.component';
import { TrainingSessionReportsComponent } from './pages/training-session-reports/training-session-reports.component';

export const routes: Routes = [
{path: 'register', component:TrainingSessionFormComponent},
{path:'reports', component:TrainingSessionReportsComponent},
{path:'',redirectTo:'/register', pathMatch:'full'},
{path:'**', redirectTo: '/register'}

];
