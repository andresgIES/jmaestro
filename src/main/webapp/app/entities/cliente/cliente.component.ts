import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Cliente } from './cliente.model';
import { ClienteService } from './cliente.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cliente',
    templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit, OnDestroy {
clientes: Cliente[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private clienteService: ClienteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.clienteService.query().subscribe(
            (res: HttpResponse<Cliente[]>) => {
                this.clientes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInClientes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Cliente) {
        return item.id;
    }
    registerChangeInClientes() {
        this.eventSubscriber = this.eventManager.subscribe('clienteListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
