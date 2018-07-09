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
        if (this.loginForm.valid) {
            // this.afAuth.auth.createUserWithEmailAndPassword(this.emailAddressLogin, this.passwordLogin);
            this.afAuth.auth.signInWithEmailAndPassword(this.emailAddressLogin, this.passwordLogin).then((wsResult: any) => {
                alert(JSON.stringify(wsResult));
            }).catch((response: any) => {
                let message = '';
                switch (response.code) {
                    case 'auth/invalid-email': {
                        message = 'Erreur : adresse email est mal formée';
                        break;
                    }
                    case 'auth/user-disabled': {
                        message = 'Erreur : utilisateur désactivé';
                        break;
                    }
                    case 'auth/user-not-found': {
                        message = 'Erreur : utilisateur non retrouvé';
                        break;
                    }
                    case 'auth/wrong-password': {
                        message = 'Erreur : mot de passe utilisé incorrect';
                        break;
                    }
                    default: {
                        message = 'Erreur : merci de contacter l\'administrateur';
                        break;
                    }
                }
                this.snackBar.open(message, '', {duration: 5000});
            });
        } else {
            this.snackBar.open('Merci de remplir tous les champs', '', {duration: 5000});
        }
    }
}
