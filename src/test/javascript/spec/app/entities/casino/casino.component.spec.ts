/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JmasterTestModule } from '../../../test.module';
import { CasinoComponent } from '../../../../../../main/webapp/app/entities/casino/casino.component';
import { CasinoService } from '../../../../../../main/webapp/app/entities/casino/casino.service';
import { Casino } from '../../../../../../main/webapp/app/entities/casino/casino.model';

describe('Component Tests', () => {

    describe('Casino Management Component', () => {
        let comp: CasinoComponent;
        let fixture: ComponentFixture<CasinoComponent>;
        let service: CasinoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JmasterTestModule],
                declarations: [CasinoComponent],
                providers: [
                    CasinoService
                ]
            })
            .overrideTemplate(CasinoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CasinoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CasinoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Casino(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.casinos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
