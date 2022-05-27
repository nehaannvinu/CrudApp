import { IUser } from './model';
import users from './schema';

export default class UserService {
    
    //To Create a New User: POST
    public createUser(user_params: IUser, callback: any) {
        const _session = new users(user_params);
        _session.save(callback);
    }

    //Find User: GET
    public filterUser(query: any, callback: any) {
        users.findOne(query, callback);
    }

    public seeAllUsers(callback:any){
        users.find(callback)
    }

    //Update user
    public updateUser(user_params: IUser, callback: any) {
        const query = { _id: user_params._id };
        users.findOneAndUpdate(query, user_params, callback);
    }
    
    //Delete user
    public deleteUser(_id: String, callback: any) {
        const query = { _id: _id };
        users.deleteOne(query, callback);
    }

}