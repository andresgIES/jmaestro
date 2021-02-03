import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Casino } from './casino.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Casino>;

@Injectable()
export class CasinoService {

    private resourceUrl =  SERVER_API_URL + 'api/casinos';

    constructor(private http: HttpClient) { }

    create(casino: Casino): Observable<EntityResponseType> {
        const copy = this.convert(casino);
        return this.http.post<Casino>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(casino: Casino): Observable<EntityResponseType> {
        const copy = this.convert(casino);
        return this.http.put<Casino>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Casino>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Casino[]>> {
        const options = createRequestOption(req);
        return this.http.get<Casino[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Casino[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Casino = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Casino[]>): HttpResponse<Casino[]> {
        const jsonResponse: Casino[] = res.body;
        const body: Casino[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Casino.
     */
    private convertItemFromServer(casino: Casino): Casino {
        const copy: Casino = Object.assign({}, casino);
        return copy;
    }

    /**
     * Convert a Casino to a JSON which can be sent to the server.
     */
    private convert(casino: Casino): Casino {
        const copy: Casino = Object.assign({}, casino);
        return copy;
    }
}
