import { View } from './View';
import { User, UserProps } from '../models/User';
import { UserForm } from './UserForm';
import { UserView } from './UserView';

export class UserWrap extends View<User, UserProps> {

    regionsMap(): {[key: string]: string } {
        return {
            userView: '.user-view',
            userForm: '.user-form'
        };
    }

    onRender() {
        new UserView(this.regions.userView, this.model).render();
        new UserForm(this.regions.userForm, this.model).render();
    }

    template():string {
        return `
            <div>
                <div class="user-view"></div>
                <div class="user-form"></div>
            </div>
        `
    }
}