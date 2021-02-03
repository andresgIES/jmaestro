import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Maquina } from './maquina.model';
import { MaquinaPopupService } from './maquina-popup.service';
import { MaquinaService } from './maquina.service';

@Component({
    selector: 'jhi-maquina-dialog',
    templateUrl: './maquina-dialog.component.html'
})
export class MaquinaDialogComponent implements OnInit {

    maquina: Maquina;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private maquinaService: MaquinaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.maquina.id !== undefined) {
            this.subscribeToSaveResponse(
                this.maquinaService.update(this.maquina));
        } else {
            this.subscribeToSaveResponse(
                this.maquinaService.create(this.maquina));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Maquina>>) {
        result.subscribe((res: HttpResponse<Maquina>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Maquina) {
        this.eventManager.broadcast({ name: 'maquinaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-maquina-popup',
    template: ''
})
export class MaquinaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private maquinaPopupService: MaquinaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.maquinaPopupService
                    .open(MaquinaDialogComponent as Component, params['id']);
            } else {
                this.maquinaPopupService
                    .open(MaquinaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
