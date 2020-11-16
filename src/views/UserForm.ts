import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserForm extends View<User, UserProps> {
    eventsMap():{[key: string]: () => void } {
        return {
            'click:.set-age': this.onSetAgeClick,
            'click:.set-name': this.onSetNameClick,
            'click:.save': this.onSaveClick
        }
    }

    onSaveClick = ():void => {
        this.model.save();
    }

    onSetAgeClick = ():void => {        
        this.model.setRandomAge();        
    }

    onSetNameClick = ():void => {
        const input = this.parent.querySelector<HTMLInputElement>('input.get-name');

        if (input) {
            this.model.setName( input.value );
        }

    }

    template():string {
        return `
            <div>
                <input class="get-name" placeholder="${this.model.get("name")}" type="text" />
                <button class="set-name">Set name</button>
                <button class="set-age">Set random age</button>
                <button class="save">Save</button>
            </div>
        `;
    }
}