import {Component, ViewChild} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material';
import {NgForm} from '@angular/forms';
import {auth} from 'firebase';
import {from} from 'rxjs';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {

    @ViewChild('loginForm') public loginForm: NgForm;

    public emailAddressLogin = '';
    public passwordLogin = '';

    constructor(public activeModal: NgbActiveModal, private afAuth: AngularFireAuth, private snackBar: MatSnackBar) {

    }

    public onLoginWithGoogleButtonClicked(): void {
        from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())).subscribe((response: any) => {
            if (response && response.user) {
                this.activeModal.dismiss();
                this.snackBar.open(response.user.displayName ? `Bonjour ${response.user.displayName}, bienvenue sur ImmoQuest !` : 'Bienvenue sur ImmoQuest !', '', {duration: 3000});
            }
        });
    }

    public onLoginFormSubmit(): void {
        console.log(this.loginForm);
        console.log(this.emailAddressLogin);
        console.log(this.passwordLogin);

        this.afAuth.auth.createUserWithEmailAndPassword(this.emailAddressLogin, this.passwordLogin);
    }
}
