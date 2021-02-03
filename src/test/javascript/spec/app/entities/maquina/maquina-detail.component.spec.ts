/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JmasterTestModule } from '../../../test.module';
import { MaquinaDetailComponent } from '../../../../../../main/webapp/app/entities/maquina/maquina-detail.component';
import { MaquinaService } from '../../../../../../main/webapp/app/entities/maquina/maquina.service';
import { Maquina } from '../../../../../../main/webapp/app/entities/maquina/maquina.model';

describe('Component Tests', () => {

    describe('Maquina Management Detail Component', () => {
        let comp: MaquinaDetailComponent;
        let fixture: ComponentFixture<MaquinaDetailComponent>;
        let service: MaquinaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JmasterTestModule],
                declarations: [MaquinaDetailComponent],
                providers: [
                    MaquinaService
                ]
            })
            .overrideTemplate(MaquinaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaquinaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaquinaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Maquina(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.maquina).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
