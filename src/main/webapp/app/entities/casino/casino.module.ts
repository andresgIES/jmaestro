import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JmasterSharedModule } from '../../shared';
import {
    CasinoService,
    CasinoPopupService,
    CasinoComponent,
    CasinoDetailComponent,
    CasinoDialogComponent,
    CasinoPopupComponent,
    CasinoDeletePopupComponent,
    CasinoDeleteDialogComponent,
    casinoRoute,
    casinoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...casinoRoute,
    ...casinoPopupRoute,
];

@NgModule({
    imports: [
        JmasterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CasinoComponent,
        CasinoDetailComponent,
        CasinoDialogComponent,
        CasinoDeleteDialogComponent,
        CasinoPopupComponent,
        CasinoDeletePopupComponent,
    ],
    entryComponents: [
        CasinoComponent,
        CasinoDialogComponent,
        CasinoPopupComponent,
        CasinoDeleteDialogComponent,
        CasinoDeletePopupComponent,
    ],
    providers: [
        CasinoService,
        CasinoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JmasterCasinoModule {}
