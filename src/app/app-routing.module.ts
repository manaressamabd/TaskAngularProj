import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { RequestformComponent } from './requestform/requestform.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    pathMatch:"full"
  },
  {
    path:'request',
    component:RequestformComponent
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
