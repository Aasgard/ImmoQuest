///<reference path="../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, ViewChild} from '@angular/core';
import {IMarker} from './models/marker.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {AgmMap} from '@agm/core';
import {MatDialog} from '@angular/material';
import * as moment from 'moment';
import {TestComponent} from './components/shared/test/test.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  @ViewChild(AgmMap) mainMap: AgmMap;

  zoom = 13;
  lat = 48.118845;
  lng = -1.651217;
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

  constructor(private db: AngularFireDatabase, private dialog: MatDialog) {
    db.list('markers').snapshotChanges().subscribe((data: any) => {
      this.markers = data.map(data => {
        const record = Object.assign({}, data.payload.val());
        record.id = data.payload.key;
        return record;
      });
    });
  }

  public onMapClicked(event: any): void {
    // this.db.list('markers').push({lat: event.coords.lat, lng: event.coords.lng, label: ''});
    // this.markers.push({lat: event.coords.lat, lng: event.coords.lng, label: ''});
    this.db.list('markers').set(this.generateGuid(), {
      lat: event.coords.lat,
      lng: event.coords.lng,
      label: '',
      createdDatetime: moment().format()
    });
  }

  public onAddInterestButtonClicked(): void {
    let dialogRef = this.dialog.open(TestComponent, {
      width: '250px', hasBackdrop: true
    });
  }

  public onMapRightClicked(event: any): void {
    alert('Modal de gestion pour le clic droit');
  }

  public onMarkerClicked(id: any): void {
    console.log(id);
    this.db.object(`markers/${id}`).remove();
  }

  // TODO : move that function away in an utils class
  private generateGuid(): string {
    return (this.S4() + this.S4() + '-' + this.S4() + '-4' + this.S4().substr(0, 3) + '-' + this.S4() + '-' + this.S4() + this.S4() + this.S4()).toLowerCase();
  }

  // TODO : move that function away in an utils class
  private S4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
}
