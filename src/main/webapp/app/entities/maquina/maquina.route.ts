import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MaquinaComponent } from './maquina.component';
import { MaquinaDetailComponent } from './maquina-detail.component';
import { MaquinaPopupComponent } from './maquina-dialog.component';
import { MaquinaDeletePopupComponent } from './maquina-delete-dialog.component';

export const maquinaRoute: Routes = [
    {
        path: 'maquina',
        component: MaquinaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Maquinas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'maquina/:id',
        component: MaquinaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Maquinas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const maquinaPopupRoute: Routes = [
    {
        path: 'maquina-new',
        component: MaquinaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Maquinas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'maquina/:id/edit',
        component: MaquinaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Maquinas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'maquina/:id/delete',
        component: MaquinaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Maquinas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
