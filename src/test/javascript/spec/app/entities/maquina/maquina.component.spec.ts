/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JmasterTestModule } from '../../../test.module';
import { MaquinaComponent } from '../../../../../../main/webapp/app/entities/maquina/maquina.component';
import { MaquinaService } from '../../../../../../main/webapp/app/entities/maquina/maquina.service';
import { Maquina } from '../../../../../../main/webapp/app/entities/maquina/maquina.model';

describe('Component Tests', () => {

    describe('Maquina Management Component', () => {
        let comp: MaquinaComponent;
        let fixture: ComponentFixture<MaquinaComponent>;
        let service: MaquinaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JmasterTestModule],
                declarations: [MaquinaComponent],
                providers: [
                    MaquinaService
                ]
            })
            .overrideTemplate(MaquinaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaquinaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaquinaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Maquina(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.maquinas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
