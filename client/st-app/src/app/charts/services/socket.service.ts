import {Injectable} from "@angular/core";

import * as io from "socket.io-client";
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {
    private host: string = window.location.protocol + "//" + window.location.hostname + ":" + 3000;
    private socket: any;
    constructor() {
        this.socket = io(this.host);
        this.socket.on("connect", () => this.connected());
        this.socket.on("disconnect", () => this.disconnected());
        this.socket.on("error", (error: string) => {
            console.log(`ERROR: "${error}" (${this.host})`);
        });
        //this.socket.emit("3000", "start", (chanel, message) => this.emit(chanel, message))
    }
    connect () {
        this.socket.connect();
    }
    disconnect () {
        this.socket.disconnect();
    }
    emit(message, data = null) {
        this.socket.emit(message, data);
    }
    on(event_name) {
        console.log(`listen to ${event_name}:`);
        return new Observable<any>(observer => {
            this.socket.off(event_name);
            this.socket.on(event_name, (data) => {
                observer.next(data);
            });
        });
    }
    private connected() {
        console.log('Connected');
    }
    private disconnected() {
        console.log('Disconnected');
    }
}