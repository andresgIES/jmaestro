import { Route } from '@angular/router';

import { TableComponent } from './';

export const TABLE_ROUTE: Route = {
    path: 'table',
    component: TableComponent,
    data: {
        authorities: [],
        pageTitle: 'Tabla'
    }
};
