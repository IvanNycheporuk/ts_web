import axios, { AxiosPromise, AxiosResponse } from 'axios';

type CallBack = () => void;

interface hasId {
    id?: number
}

interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface Eventing {
    on(eventName: string, callback: CallBack): void;
    trigger(eventName: string): void;
}

interface Attributes<T> {
    get<K extends keyof T> (key: K): T[K];
    set(propName: T): void;
    getAll(): T
}

export class Model<T extends hasId> {
    constructor(
        private attributes: Attributes<T>,
        private events: Eventing,
        private sync: Sync<T>
        ){}    

    on = this.events.on; 
    get = this.attributes.get;
    trigger = this.events.trigger;

    set(userData: T): void {
        this.attributes.set(userData);
        this.events.trigger('change');
    }

    fetch():void {
        const id = this.get('id');

        if (typeof id !== 'number') {
            throw new Error('Not an id')
        }

        this.sync.fetch(id).then((response: AxiosResponse): void => {
            this.set(response.data);
        })
    }

    save(): void{
        this.sync.save(this.attributes.getAll())
            .then((res: AxiosResponse):void => {
                this.set(res.data);
            })
            .then((res) => {
                this.events.trigger('save')
            })
    }
}