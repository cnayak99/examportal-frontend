import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './pages/signup/signup.component'; // Import the standalone component
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { SidebarComponent as UserSideBar } from './pages/user/sidebar/sidebar.component';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterModule,
    RouterOutlet,
    MatInputModule,
    MatFormFieldModule,
    NavbarComponent,
    CommonModule,
    HttpClientModule,
    SignupComponent,
    MatSnackBarModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    UserSideBar,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
