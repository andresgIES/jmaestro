import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JmasterClienteModule } from './cliente/cliente.module';
import { JmasterCasinoModule } from './casino/casino.module';
import { JmasterMaquinaModule } from './maquina/maquina.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JmasterClienteModule,
        JmasterCasinoModule,
        JmasterMaquinaModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JmasterEntityModule {}
