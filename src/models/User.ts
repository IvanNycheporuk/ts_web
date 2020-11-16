import { Model } from './Model';
import { ApiSync } from './ApiSync';
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Collection } from './Collection';


export interface UserProps {
    id?: number,
    name?: string,
    age?: number
}

const rootUrl = 'http://localhost:3000/users'

export class User extends Model<UserProps>  {    
    static buildUser(userObj:UserProps):User {
        return new User(
            new Attributes<UserProps>(userObj),
            new Eventing(),
            new ApiSync(rootUrl)
        )
    }

    static  buildUserCollection(): Collection<User, UserProps> {
        return new Collection<User, UserProps>(
                rootUrl,
                (el: UserProps) => User.buildUser(el)
            );
    }

    setRandomAge = ():void => {
        const age = Math.round(Math.random() * 100);
        this.set({ age });
    }

    setName = (name:string):void => {
        this.set({ name });
    }
}