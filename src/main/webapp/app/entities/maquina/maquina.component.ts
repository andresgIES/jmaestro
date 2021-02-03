import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Maquina } from './maquina.model';
import { MaquinaService } from './maquina.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-maquina',
    templateUrl: './maquina.component.html'
})
export class MaquinaComponent implements OnInit, OnDestroy {
maquinas: Maquina[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private maquinaService: MaquinaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.maquinaService.query().subscribe(
            (res: HttpResponse<Maquina[]>) => {
                this.maquinas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMaquinas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Maquina) {
        return item.id;
    }
    registerChangeInMaquinas() {
        this.eventSubscriber = this.eventManager.subscribe('maquinaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
