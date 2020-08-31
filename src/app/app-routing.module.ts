import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainersComponent } from './containers/containers.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./containers/containers.module').then((m) => m.ContainersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
