/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JmasterTestModule } from '../../../test.module';
import { CasinoDetailComponent } from '../../../../../../main/webapp/app/entities/casino/casino-detail.component';
import { CasinoService } from '../../../../../../main/webapp/app/entities/casino/casino.service';
import { Casino } from '../../../../../../main/webapp/app/entities/casino/casino.model';

describe('Component Tests', () => {

    describe('Casino Management Detail Component', () => {
        let comp: CasinoDetailComponent;
        let fixture: ComponentFixture<CasinoDetailComponent>;
        let service: CasinoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JmasterTestModule],
                declarations: [CasinoDetailComponent],
                providers: [
                    CasinoService
                ]
            })
            .overrideTemplate(CasinoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CasinoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CasinoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Casino(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.casino).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
