import { IUser } from '../../utils/constants';
import users from '../models/user.model';

export default class UserService {
    
    //To Create a New User: POST
    public async createUser (user_params: IUser, callback: any) {
        const _session = new users(user_params);
        await _session.save(callback);
    }

    //Find User: GET
    public async findUserOnId(query: any, callback: any) {
        await users.findOne(query, callback);
    }

    public async findUser(query:any, callback:any) {
       await users.find(query, callback)
    }

    public async seeAllUsers(callback:any){
        await users.find(callback)
    }

    //Update user
    public async updateUser(user_params: IUser, callback: any) {
        const query = { _id: user_params._id };
        await users.findOneAndUpdate(query, user_params, callback);
    }
    
    //Delete user
    public async deleteUser(_id: String, callback: any) {
        const query = { _id: _id };
        await users.deleteOne(query, callback);
    }

}