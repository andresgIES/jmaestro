import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TABLE_ROUTE, TableComponent} from './';

@NgModule({
    imports: [
        RouterModule.forChild([ TABLE_ROUTE ])
    ],
    declarations: [
        TableComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JmasterTableModule {}
