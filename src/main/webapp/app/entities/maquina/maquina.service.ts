import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Maquina } from './maquina.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Maquina>;

@Injectable()
export class MaquinaService {

    private resourceUrl =  SERVER_API_URL + 'api/maquinas';

    constructor(private http: HttpClient) { }

    create(maquina: Maquina): Observable<EntityResponseType> {
        const copy = this.convert(maquina);
        return this.http.post<Maquina>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(maquina: Maquina): Observable<EntityResponseType> {
        const copy = this.convert(maquina);
        return this.http.put<Maquina>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Maquina>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Maquina[]>> {
        const options = createRequestOption(req);
        return this.http.get<Maquina[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Maquina[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Maquina = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Maquina[]>): HttpResponse<Maquina[]> {
        const jsonResponse: Maquina[] = res.body;
        const body: Maquina[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Maquina.
     */
    private convertItemFromServer(maquina: Maquina): Maquina {
        const copy: Maquina = Object.assign({}, maquina);
        return copy;
    }

    /**
     * Convert a Maquina to a JSON which can be sent to the server.
     */
    private convert(maquina: Maquina): Maquina {
        const copy: Maquina = Object.assign({}, maquina);
        return copy;
    }
}
