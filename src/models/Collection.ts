import axios, { AxiosResponse } from 'axios';

import { Eventing } from './Eventing';

export class Collection<T, K> {
    users: T[] = [];
    events: Eventing = new Eventing();

    constructor(
        public rootUrl: string,
        public desirealize: (json: K) => T
        ) {}

    get on(){
        return this.events.on
    }

    get trigger(){
        return this.events.trigger
    }

    fetch() {
        axios.get(this.rootUrl)
            .then( (res:AxiosResponse) => {
                res.data.forEach((el: K) => {                    
                    this.users.push(this.desirealize(el));
                });
            });

        console.log(this.users);

        this.trigger('change');
    }
}