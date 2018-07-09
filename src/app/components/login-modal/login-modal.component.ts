import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {from} from 'rxjs';
import {AngularFireAuth} from 'angularfire2/auth';
import {auth} from 'firebase';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {

    public emailAddressLogin = null;
    public passwordLogin = null;

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

    public onClassicConnectionButtonClicked(): void {
        console.log(this.emailAddressLogin);
        console.log(this.passwordLogin);
    }
}
