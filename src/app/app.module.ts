import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DBService } from './db.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatPaginatorModule} from '@angular/material';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { MemberHomeComponent } from './components/member-home/member-home.component';

const routes: Routes = [
    { path: 'Register', component: RegisterComponent },
    { path: 'Home', component: HomeComponent },
    { path: 'Detail/:unid', component: BookDetailComponent},
    { path: 'Search', component: SearchComponent },
    { path: 'Member', component: MemberHomeComponent },
    { path: '', redirectTo: '/Home', pathMatch: 'full' }

];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SearchComponent,
        BookDetailComponent,
        RegisterComponent,
        MemberHomeComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        MatOptionModule,
        MatCardModule,
        MatTableModule,
        MatDividerModule,
        MatPaginatorModule,
        ReactiveFormsModule,
    ],
    providers: [DBService],
    bootstrap: [AppComponent]
})
export class AppModule { }
