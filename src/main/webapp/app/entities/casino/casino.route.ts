import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CasinoComponent } from './casino.component';
import { CasinoDetailComponent } from './casino-detail.component';
import { CasinoPopupComponent } from './casino-dialog.component';
import { CasinoDeletePopupComponent } from './casino-delete-dialog.component';

export const casinoRoute: Routes = [
    {
        path: 'casino',
        component: CasinoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Casinos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'casino/:id',
        component: CasinoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Casinos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const casinoPopupRoute: Routes = [
    {
        path: 'casino-new',
        component: CasinoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Casinos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'casino/:id/edit',
        component: CasinoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Casinos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'casino/:id/delete',
        component: CasinoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Casinos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
