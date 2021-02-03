import { BaseEntity } from './../../shared';

export class Maquina implements BaseEntity {
    constructor(
        public id?: number,
        public modelo?: string,
        public cantidadJuegos?: number,
    ) {
    }
}
