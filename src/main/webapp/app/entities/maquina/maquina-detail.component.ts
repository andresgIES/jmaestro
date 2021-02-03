import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Maquina } from './maquina.model';
import { MaquinaService } from './maquina.service';

@Component({
    selector: 'jhi-maquina-detail',
    templateUrl: './maquina-detail.component.html'
})
export class MaquinaDetailComponent implements OnInit, OnDestroy {

    maquina: Maquina;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private maquinaService: MaquinaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMaquinas();
    }

    load(id) {
        this.maquinaService.find(id)
            .subscribe((maquinaResponse: HttpResponse<Maquina>) => {
                this.maquina = maquinaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMaquinas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'maquinaListModification',
            (response) => this.load(this.maquina.id)
        );
    }
}
