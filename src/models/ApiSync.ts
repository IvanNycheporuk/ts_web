import axios, { AxiosPromise } from 'axios';

interface HasId {
    id?: number
}

export class ApiSync<T extends HasId> {
    constructor(public rootUrl: string){}

    fetch(id: number):AxiosPromise {
        return axios.get(`${this.rootUrl}/users/${id}`);            
    }

    save(data: T):AxiosPromise {
        let { id } = data;

        if( id ) {
            return axios.put(`${this.rootUrl}/users/${id}`, data);
        } else {
            return axios.post(`${this.rootUrl}`, data);
        }
    }
}