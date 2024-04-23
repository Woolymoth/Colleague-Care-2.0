import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateChoreComponent } from './tools/create-chore/create-chore.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HeaderComponent } from './header/header.component';
import { FirstPageComponent } from './pages/first-page/first-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DisplayPageComponent } from './pages/display-page/display-page.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { FooterComponent } from './footer/footer.component';
import { CreateEventComponent } from './tools/create-event/create-event.component';
import { RegisterUserComponent } from './tools/register-user/register-user.component';
import { WeekDisplayComponent } from './tools/week-display/week-display.component';
import { ChedualCreatorComponent } from './tools/chedual-creator/chedual-creator.component';
import { FetchEventsComponent } from './tools/fetch-events/fetch-events.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateChoreComponent,
    HeaderComponent,
    FirstPageComponent,
    LoginPageComponent,
    DisplayPageComponent,
    FormPageComponent,
    FooterComponent,
    CreateEventComponent,
    RegisterUserComponent,
    WeekDisplayComponent,
    ChedualCreatorComponent,
    FetchEventsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"colleague-care-961e7","appId":"1:146426847182:web:aa565e2303cff0981cd59f","storageBucket":"colleague-care-961e7.appspot.com","apiKey":"AIzaSyB9Z6cZoMv6ga-E1TY2EBY4fWbLC809Kx8","authDomain":"colleague-care-961e7.firebaseapp.com","messagingSenderId":"146426847182","measurementId":"G-MSLYFHL1M7"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
