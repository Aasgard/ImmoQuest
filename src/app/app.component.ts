import {Component} from '@angular/core';
import {IMarker} from './models/marker.model';

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

    public onMapClicked(event: any) {
        this.markers = [];
        this.markers.push({lat: event.coords.lat, lng: event.coords.lng, label: '♥'});
    }

    public onMapRightClicked(event: any) {
        alert('Modal de gestion pour le clic droit');
    }
}
