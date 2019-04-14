import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Sportsmen } from '../model/sportmen.model';
import { Results } from '../model/results.model';
import { Status } from '../model/status.model';



@Injectable()
export class ChartsService {

    constructor(private http: HttpClient) {}

    getAllSportsmen(): Observable<Sportsmen[]> {
        return this.http.get('http://localhost:3000/sportsmen')
            .pipe(
                map(res => {
                    return res['sportsmen'].map(
                        person => {
                            return {
                                'id': person._id,
                                'name': person.name,
                                'lastname': person.lastname,
                                'start_number': person.start_number
                            };
                        }
                    );
                })
            );
    }

    getAllResults(): Observable<Results[]> {
        return this.http.get('http://localhost:3000/results')
            .pipe(
                map(res => {
                    return res['results'].map(
                        result => {
                            return {
                                'id': result.sportsman._id,
                                'finishing': result.finishing,
                                'crossed': result.crossed,
                                'name': result.sportsman.name,
                                'lastname': result.sportsman.lastname,
                                'start_number': result.sportsman.start_number
                            };
                        }
                    );
                })
            );
    }

    getStatus(): Observable<Status[]> {
      return this.http.get('http://localhost:3000/results/status')
          .pipe(
              map(stat => {
                return stat['status'].map(
                    status => {
                        return {
                            'id': status._id,
                            'started': status.started,
                            'finished': status.finished,
                            'start_time': status.start_time
                        };
                    }
                );
              })
          );
  }
}
