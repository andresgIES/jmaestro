import { BaseEntity } from './../../shared';

export class Casino implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public direccion?: string,
        public cantidadMaquinas?: number,
        public maquina?: BaseEntity,
    ) {
    }
}
