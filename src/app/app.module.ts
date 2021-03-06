import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AgmCoreModule} from '@agm/core';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule, MatProgressBarModule, MatSnackBarModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {TestComponent} from './components/shared/test/test.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/shared/modal/modal.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {FormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { LoginModalComponent } from './components/login-modal/login-modal.component';


@NgModule({
    declarations: [
        AppComponent,
        TestComponent,
        ModalComponent,
        LoginModalComponent
    ],
    entryComponents: [
        TestComponent,
        ModalComponent,
        LoginModalComponent
    ],
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        MatToolbarModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatInputModule,
        MatDialogModule,
        MatIconModule,
        MatProgressBarModule,
        AngularFireStorageModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDOSn5kyr3PBRT03oZ8L7rxHx8LsSd-oQk'
        })
    ],
    providers: [AngularFireDatabase],
    bootstrap: [AppComponent]
})
export class AppModule {
}
