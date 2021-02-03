import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JmasterSharedModule } from '../../shared';
import {
    MaquinaService,
    MaquinaPopupService,
    MaquinaComponent,
    MaquinaDetailComponent,
    MaquinaDialogComponent,
    MaquinaPopupComponent,
    MaquinaDeletePopupComponent,
    MaquinaDeleteDialogComponent,
    maquinaRoute,
    maquinaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...maquinaRoute,
    ...maquinaPopupRoute,
];

@NgModule({
    imports: [
        JmasterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MaquinaComponent,
        MaquinaDetailComponent,
        MaquinaDialogComponent,
        MaquinaDeleteDialogComponent,
        MaquinaPopupComponent,
        MaquinaDeletePopupComponent,
    ],
    entryComponents: [
        MaquinaComponent,
        MaquinaDialogComponent,
        MaquinaPopupComponent,
        MaquinaDeleteDialogComponent,
        MaquinaDeletePopupComponent,
    ],
    providers: [
        MaquinaService,
        MaquinaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JmasterMaquinaModule {}
