import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import { Sportsmen } from '../model/sportmen.model';



@Injectable()
export class ChartsService {

    constructor(private http:HttpClient) {

    }

    getAllSportsmen(): Observable<Sportsmen[]> {
        return this.http.get('http://localhost:3000/sportsmen')
            .pipe(
                map(res => res['sportsmen'])
            );
    }
}