import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Maquina } from './maquina.model';
import { MaquinaPopupService } from './maquina-popup.service';
import { MaquinaService } from './maquina.service';

@Component({
    selector: 'jhi-maquina-delete-dialog',
    templateUrl: './maquina-delete-dialog.component.html'
})
export class MaquinaDeleteDialogComponent {

    maquina: Maquina;

    constructor(
        private maquinaService: MaquinaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.maquinaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'maquinaListModification',
                content: 'Deleted an maquina'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-maquina-delete-popup',
    template: ''
})
export class MaquinaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private maquinaPopupService: MaquinaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.maquinaPopupService
                .open(MaquinaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
