import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor() {
    }

    /**
     * Returns the generated GUID
     * @returns {string}
     */
    public generateGuid(): string {
        return (this.generateGuidChunk() + this.generateGuidChunk() + '-' + this.generateGuidChunk() + '-4' + this.generateGuidChunk().substr(0, 3) + '-' + this.generateGuidChunk() + '-' + this.generateGuidChunk() + this.generateGuidChunk() + this.generateGuidChunk()).toLowerCase();
    }

    /**
     * Returns a chunk for the GUID composition
     * @returns {string}
     */
    public generateGuidChunk(): string {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

}
