import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserView extends View<User, UserProps> {
    template():string {
        return `
            <div>
                <h1>User view</h1>
                <span>User name: ${this.model.get('name')}</span>
                <span>User name: ${this.model.get('age')}</span>
            </div>    
        `
    };    
}