import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { RandomColorClassDirective } from './shared/random-color-class.directive';
import { AppComponent } from './app.component';
import { IdeasComponent } from './ideas/ideas.component';
import { IdeaComponent } from './ideas/idea/idea.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateIdeaComponent } from './ideas/create-idea/create-idea.component';
import { HomeComponent } from './home/home.component';
import { EditIdeaComponent } from './ideas/edit-idea/edit-idea.component';
import { IdeaDetailsComponent } from './ideas/idea-details/idea-details.component';
import { DeleteIdeaComponent } from './ideas/delete-idea/delete-idea.component';

const appRoutes : Routes = [{path: '', component: HomeComponent},
                            {path: 'create', component: CreateIdeaComponent},
                            {path: 'ideas', component: IdeasComponent, children: [
                              {path: 'create', component: CreateIdeaComponent},
                              {path: ':id/edit', component: EditIdeaComponent},
                              {path: ':id/delete', component: DeleteIdeaComponent}
                            ]},
                            {path: '**', component: HomeComponent}
                            // {path: 'ideas/:id', component: IdeaDetailsComponent, children: [
                            //   {path: '', component: IdeaComponent}


];
@NgModule({
  declarations: [
    AppComponent,
    IdeasComponent,
    IdeaComponent,
    NavbarComponent,
    CreateIdeaComponent,
    HomeComponent,
    RandomColorClassDirective,
    EditIdeaComponent,
    IdeaDetailsComponent,
    DeleteIdeaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }