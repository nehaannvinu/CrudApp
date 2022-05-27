export const successMessage= {
    userCreationSuccess: 'Created New User',
    userDisplaySuccess: 'All Users',
    fetchUserSuccess: 'User details fetched',
    deleteUserSuccess: 'User deleted!',
    userUpdateSuccess: 'User details updated'
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
    _id?: String;
    name: {
        first_name: String;
        middle_name: String;
        last_name: String;
    };
    email: String;
    phone_number: String;
    gender: String;
}