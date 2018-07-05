import {Component, ViewChild} from '@angular/core';
import {IMarker} from './models/marker.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {AgmMap} from '@agm/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import * as moment from 'moment';
import {UtilsService} from './providers/utils/utils.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from './components/shared/modal/modal.component';
import {AngularFireAuth} from 'angularfire2/auth';
import {auth} from 'firebase';
import {from} from 'rxjs';
import {LoginModalComponent} from './components/login-modal/login-modal.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {

    @ViewChild(AgmMap) mainMap: AgmMap;

    public zoom = 13;
    public lat = 48.118845;
    public lng = -1.651217;
    public connectedUser: any = null;

    public markers: IMarker[] = [];
    public mapStylerOptions = [
        {
            'featureType': 'poi',
            'stylers': [{'visibility': 'off'}]
        },
        {
            'featureType': 'transit',
            'stylers': [{'visibility': 'off'}]
        }
    ];

    constructor(private snackBar: MatSnackBar, private modalService: NgbModal, private afAuth: AngularFireAuth, private db: AngularFireDatabase, private dialog: MatDialog, private utils: UtilsService) {
        db.list('markers').snapshotChanges().subscribe((data: any) => {
            this.markers = data.map(data => {
                const record = Object.assign({}, data.payload.val());
                // const markerIcons = ['assets/markers/like.png', 'assets/markers/search.png'];
                record.id = data.payload.key;
                // record.markerIcon = markerIcons[Math.round(Math.random())];
                return record;
            });
        });
    }

    public ngOnInit(): void {
        this.afAuth.user.subscribe((user: any) => {
            this.connectedUser = user;
            if (this.connectedUser) {
                this.snackBar.open(`Utilisateur connecté : ${this.connectedUser.displayName}`, '', {duration: 3000});
            }
        });
    }

    /**
     * Event triggered when we click on the map
     * @param event
     */
    public onMapClicked(event: any): void {
        const modalRef = this.modalService.open(ModalComponent, {size: 'lg', centered: true});
        modalRef.componentInstance.marker = {lat: event.coords.lat, lng: event.coords.lng};
    }

    public onLoginButtonClicked(): void {
        if (!this.connectedUser) {
            // from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())).subscribe((response: any) => {
            //     if (response && response.user) {
            //         this.snackBar.open(response.user.displayName ? `Bonjour ${response.user.displayName}, bienvenue sur ImmoQuest !` : 'Bienvenue sur ImmoQuest !', '', {duration: 3000});
            //     }
            // });
            this.modalService.open(LoginModalComponent, {size: 'lg', centered: true});
        }
    }

    public onLogoutButtonClicked(): void {
        if (this.connectedUser) {
            this.afAuth.auth.signOut();
        }
    }

    /**
     * Event triggered when we right click on the map
     * @param event
     */
    public onMapRightClicked(event: any): void {
        if (event && event.coords) {
            this.lat = event.coords.lat;
            this.lng = event.coords.lng;
            alert(`Nouveau centre : [${this.lat},${this.lng}]`);
        }
    }

    /**
     * Event triggered when we click on a marker element
     * @param id
     */
    public onMarkerClicked(id: any): void {
        console.log(id);
        this.db.object(`markers/${id}`).remove();
    }
}
