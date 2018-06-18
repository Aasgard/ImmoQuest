import {Component, ViewChild} from '@angular/core';
import {IMarker} from './models/marker.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {AgmMap} from '@agm/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import * as moment from 'moment';
import {TestComponent} from './components/shared/test/test.component';
import {UtilsService} from './providers/utils/utils.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from './components/shared/modal/modal.component';


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

    constructor(private snackBar: MatSnackBar, private modalService: NgbModal, private db: AngularFireDatabase, private dialog: MatDialog, private utils: UtilsService) {
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

    /**
     * Event triggered when we click on the map
     * @param event
     */
    public onMapClicked(event: any): void {
        // this.db.list('markers').push({lat: event.coords.lat, lng: event.coords.lng, label: ''});
        // this.markers.push({lat: event.coords.lat, lng: event.coords.lng, label: ''});
        // this.db.list('markers').set(this.utils.generateGuid(), {
        //     lat: event.coords.lat,
        //     lng: event.coords.lng,
        //     label: '',
        //     createdDatetime: moment().format()
        // });
        const modalRef = this.modalService.open(ModalComponent, {size: 'lg', centered: true, windowClass: 'test'});
        modalRef.componentInstance.marker = {lat: event.coords.lat, lng: event.coords.lng};
        this.snackBar.open('Bien immobilier ajouté avec succès', '', {duration: 3000});
    }

    /**
     * Event triggered when we click on the Add Interest button
     */
    public onAddInterestButtonClicked(): void {
        let dialogRef = this.dialog.open(TestComponent, {
            hasBackdrop: true, data: {name: 'austin'}
        });
    }

    /**
     * Event triggered when we right click on the map
     * @param event
     */
    public onMapRightClicked(event: any): void {
        // const modalRef = this.modalService.open(ModalComponent, {size: "lg", centered: true});
        // modalRef.componentInstance.name = event;
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
