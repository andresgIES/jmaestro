import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Casino } from './casino.model';
import { CasinoPopupService } from './casino-popup.service';
import { CasinoService } from './casino.service';

@Component({
    selector: 'jhi-casino-delete-dialog',
    templateUrl: './casino-delete-dialog.component.html'
})
export class CasinoDeleteDialogComponent {

    casino: Casino;

    constructor(
        private casinoService: CasinoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.casinoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'casinoListModification',
                content: 'Deleted an casino'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-casino-delete-popup',
    template: ''
})
export class CasinoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private casinoPopupService: CasinoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.casinoPopupService
                .open(CasinoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
