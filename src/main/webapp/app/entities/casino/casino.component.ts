import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Casino } from './casino.model';
import { CasinoService } from './casino.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-casino',
    templateUrl: './casino.component.html'
})
export class CasinoComponent implements OnInit, OnDestroy {
casinos: Casino[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private casinoService: CasinoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.casinoService.query().subscribe(
            (res: HttpResponse<Casino[]>) => {
                this.casinos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCasinos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Casino) {
        return item.id;
    }
    registerChangeInCasinos() {
        this.eventSubscriber = this.eventManager.subscribe('casinoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
