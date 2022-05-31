import { Response } from 'express';
import { response_status_codes } from './model';
import { responseMessage } from '../constants';

export function successResponse(message: string, Data: any, res: Response) {
    res.status(response_status_codes.success).json({
        Status: responseMessage.success,
        Message: message,
        Data
    });
}

export function failureResponse(message: string, Data: any, res: Response) {
    res.status(response_status_codes.success).json({
        Status: responseMessage.failure,
        Message: message,
        Data
    });
}

export function insufficientParameters(res: Response) {
    res.status(response_status_codes.bad_request).json({
        Status: responseMessage.failure,
        Message: responseMessage.insufficientParams,
        Data: {}
    });
}

export function mongoError(err: any, res: Response) {
    res.status(response_status_codes.internal_server_error).json({
        Status: responseMessage.failure,
        Message: responseMessage.mongoerror,
        Data: err
    });
}