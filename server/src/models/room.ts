import {v4 as uuid} from 'uuid';
import {User} from './user';

export class Room {
    public readonly id!: string;
    private members!: User[];

    public constructor(public host: User, public name: string) {
        this.id = uuid();
        this.members = [];
    }

    public includeMember(user: User): boolean {
        return !!this.members.find((x) => x.id === user.id);
    }

    public addMember(user: User): void {
        this.members.push(user);
    }
}
