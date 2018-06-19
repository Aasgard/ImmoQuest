import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {IMarker} from '../../../models/marker.model';
import {AngularFireStorage} from 'angularfire2/storage';
import {UtilsService} from '../../../providers/utils/utils.service';
import {finalize} from 'rxjs/operators';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

    @Input() marker: IMarker;

    public uploadPourcentage: number = 0;
    public isUploading: boolean = false;

    constructor(private storage: AngularFireStorage, public activeModal: NgbActiveModal, private utils: UtilsService) {}

    /**
     * Event triggered when we changed the file in the document selector.
     * @param event
     */
    public onFileInputChanged(event: any): void {
        const uploadedFile = event.target.files[0];
        const uploadedFilePath = `uploads/${this.utils.generateGuid()}`;
        const uploadedFileRef = this.storage.ref(uploadedFilePath);
        const task = uploadedFileRef.put(uploadedFile);
        task.percentageChanges().subscribe((progression => {
            this.isUploading = progression !== 100;
            this.uploadPourcentage = progression;
        }));
    }
}
