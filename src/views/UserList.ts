import { CollectionView } from './CollectionView';
import { User, UserProps } from '../models/User';
import { UserView } from './UserView';

export class UserList extends CollectionView<User, UserProps> {
    renderItem(model: User, itemParent: Element): void{
        new UserView(itemParent, model).render();
    }
}