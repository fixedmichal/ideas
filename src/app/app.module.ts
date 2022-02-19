import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { StoreModule } from '@ngrx/store';
import { ideasReducer } from './ideas/store/ideas.reducer';

import { RandomColorClassDirective } from './shared/random-color-class.directive';
import { TypeColorClassDirective } from './shared/type-color-class.directive';
import { AuthGuard } from './auth/auth.guard';

import { AppComponent } from './app.component';
import { IdeasComponent } from './ideas/ideas.component';
import { IdeaComponent } from './ideas/idea/idea.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateIdeaComponent } from './ideas/create-idea/create-idea.component';
import { HomeComponent } from './home/home.component';
import { EditIdeaComponent } from './ideas/edit-idea/edit-idea.component';
import { IdeaDetailsComponent } from './ideas/idea-details/idea-details.component';
import { DeleteIdeaComponent } from './ideas/delete-idea/delete-idea.component';
import { DeletedIdeaComponent } from './ideas/deleted-idea/deleted-idea.component';
import { IdeaWrapperComponent } from './idea-wrapper/idea-wrapper.component';
import { IdeaDetailsMenuComponent } from './ideas/idea-details/idea-details-menu/idea-details-menu.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { FilterPipe } from './shared/filter.pipe';

const appRoutes : Routes = [{path: '', component: HomeComponent},
                            {path: 'auth', component: AuthComponent},
                            {path: 'create', component: CreateIdeaComponent, canActivate: [AuthGuard]},
                            {path: 'ideas', component: IdeasComponent, canActivate: [AuthGuard]},
                            {path: ':id/details', component: IdeaDetailsComponent, canActivate:[AuthGuard], children:
                             [{path: 'edit', component: EditIdeaComponent},
                             {path: 'delete', component: DeleteIdeaComponent},
                             {path: 'deleted', component: DeletedIdeaComponent}
                            ]},
                            
                            {path: '**', component: HomeComponent}
                            // {path: 'ideas/:id', component: IdeaDetailsComponent, children: [
                            //   {path: '', component: IdeaComponent}

                            // {path: '', component: IdeaWrapperComponent},
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
    TypeColorClassDirective,
    EditIdeaComponent,
    IdeaDetailsComponent,
    DeleteIdeaComponent,
    DeletedIdeaComponent,
    IdeaWrapperComponent,
    IdeaDetailsMenuComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({ideas: ideasReducer})
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptorService, 
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
