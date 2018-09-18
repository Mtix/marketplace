export interface UserResponse {
    id: number;
    name: string;
    username: string;
    email: string;
    rating: number;
}

export class User {

    public static create(userData: UserResponse): User {
        const user = new User();
        user.id = userData.id;

        return user._update(userData);
    }

    public id!: number;
    public name: string = '';
    public username: string = '';
    public email: string = '';
    public rating!: number;

    private _update(userData: UserResponse) {
        this.id = userData.id;
        this.name = userData.name;
        this.username = userData.username;
        this.email = userData.email;
        this.rating = userData.rating;

        return this;
    }
}
