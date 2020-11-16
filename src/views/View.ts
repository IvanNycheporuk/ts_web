import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
    constructor(public parent: Element, public model:T){
        this.bindModel();
    }  

    regions: { [key: string]: Element } = {};

    abstract template():string;
    eventsMap():{[key: string]: () => void } {
        return {};
    };

    regionsMap(): {[key: string] : string} {
        return {};
    }

    onRender():void {}

    bindModel():void {
        this.model.on('change', () => {
            this.render();
        })
    }

    bindEvents(fragment:DocumentFragment):void {
        let events = this.eventsMap();

        for (let eventKey in events) {
            let [event, elem] = eventKey.split(":");

            fragment.querySelectorAll(elem).forEach((item) => {
                item.addEventListener(event, events[eventKey]);
            })
        }
    }

    mapRegions(fragment: DocumentFragment):void {
        const regionsMap = this.regionsMap();

        for (let key in regionsMap) {
            const selector = regionsMap[key];
            const element = fragment.querySelector(selector);

            if (element) {
                this.regions[key] = element;
            }
        }
    }

    render():void {
        this.parent.innerHTML = '';

        let template = document.createElement('template');
        template.innerHTML = this.template();

        this.bindEvents(template.content);        
        this.mapRegions(template.content);

        this.onRender();

        this.parent.append(template.content);
    }
}