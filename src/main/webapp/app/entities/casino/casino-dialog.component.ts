import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Casino } from './casino.model';
import { CasinoPopupService } from './casino-popup.service';
import { CasinoService } from './casino.service';
import { Maquina, MaquinaService } from '../maquina';

@Component({
    selector: 'jhi-casino-dialog',
    templateUrl: './casino-dialog.component.html'
})
export class CasinoDialogComponent implements OnInit {

    casino: Casino;
    isSaving: boolean;

    maquinas: Maquina[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private casinoService: CasinoService,
        private maquinaService: MaquinaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.maquinaService
            .query({filter: 'casino-is-null'})
            .subscribe((res: HttpResponse<Maquina[]>) => {
                if (!this.casino.maquina || !this.casino.maquina.id) {
                    this.maquinas = res.body;
                } else {
                    this.maquinaService
                        .find(this.casino.maquina.id)
                        .subscribe((subRes: HttpResponse<Maquina>) => {
                            this.maquinas = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.casino.id !== undefined) {
            this.subscribeToSaveResponse(
                this.casinoService.update(this.casino));
        } else {
            this.subscribeToSaveResponse(
                this.casinoService.create(this.casino));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Casino>>) {
        result.subscribe((res: HttpResponse<Casino>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Casino) {
        this.eventManager.broadcast({ name: 'casinoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMaquinaById(index: number, item: Maquina) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-casino-popup',
    template: ''
})
export class CasinoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private casinoPopupService: CasinoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.casinoPopupService
                    .open(CasinoDialogComponent as Component, params['id']);
            } else {
                this.casinoPopupService
                    .open(CasinoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
