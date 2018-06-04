import {Component} from '@angular/core';
import {IMarker} from './models/marker.model';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {

    zoom = 13;
    lat = 48.118845;
    lng = -1.651217;
    public markers: IMarker[] = [];

    public items: Observable<any>;

    constructor(db: AngularFireDatabase) {
        this.items = db.list('markers').valueChanges();
        this.items.subscribe(data => {
          if (data && data.length > 0) {
            this.markers = data;
          }
        });
    }

    public onMapClicked(event: any): void {
        this.markers = [];
        this.markers.push({lat: event.coords.lat, lng: event.coords.lng, label: ''});
    }

    public onMapRightClicked(event: any): void {
        alert('Modal de gestion pour le clic droit');
    }
}
