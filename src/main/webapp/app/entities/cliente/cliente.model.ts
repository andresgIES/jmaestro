import { BaseEntity } from './../../shared';

export class Cliente implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public direccion?: string,
        public tieneCasinos?: boolean,
        public casino?: BaseEntity,
    ) {
        this.tieneCasinos = false;
    }
}
