import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Casino } from './casino.model';
import { CasinoService } from './casino.service';

@Component({
    selector: 'jhi-casino-detail',
    templateUrl: './casino-detail.component.html'
})
export class CasinoDetailComponent implements OnInit, OnDestroy {

    casino: Casino;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private casinoService: CasinoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCasinos();
    }

    load(id) {
        this.casinoService.find(id)
            .subscribe((casinoResponse: HttpResponse<Casino>) => {
                this.casino = casinoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCasinos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'casinoListModification',
            (response) => this.load(this.casino.id)
        );
    }
}
