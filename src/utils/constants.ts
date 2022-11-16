export const successMessage= {
    userCreationSuccess: 'Created New User',
    userDisplaySuccess: 'All Users',
    fetchUserSuccess: 'User details fetched',
    deleteUserSuccess: 'User deleted!',
    userUpdateSuccess: 'User details updated',
    taskAdded: 'Task Added',
    fetchAllTask: 'Fetched all tasks',
    updatedTask: 'Updated tasks',
    deletedTask: 'Deleted task'
}

export const failureMessage = {
    invalidUser: 'Invalid User'
}

export const responseMessage = {
    failure: 'FAILURE',
    success: 'SUCCESS',
    mongoerror: 'MongoDB error',
    insufficientParams: 'Insufficient parameters',
    invalidURL: 'Oops, Check your URL'
}

export interface IUser {
    _id?: string;
    username: string,
    name: {
        first_name: string;
        middle_name: string;
        last_name: string;
    };
    email: string;
    phone_number: string;
    gender: string;
    modification_details: {
        created_on: Date,
        modified_on: Date
    }
}

export interface ITodo {
    _id?: string,
    title: string,
    status: boolean,
    modificationDetails: {
        created_on: Date,
        modified_on: Date
    }
    priority: number
}

export interface ModificationDetails {
    created_on: Date,
    modified_on: Date;
}
