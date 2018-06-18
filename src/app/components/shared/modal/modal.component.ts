import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {IMarker} from '../../../models/marker.model';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

    @Input() marker: IMarker;
    public panelOpenState: boolean = true;

    constructor(public activeModal: NgbActiveModal) {}
}
