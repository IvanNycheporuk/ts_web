export class Attributes<T> {
    constructor(private userData: T){}
    
    get = <K extends keyof T> (key: K): T[K] => {
        return this.userData[key];
    }

    set(propName: T): void {
        (<any>Object).assign(this.userData, propName)
    }

    getAll(): T {
        return this.userData
    }
}

