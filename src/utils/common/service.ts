import { Response } from 'express';
import { response_status_codes } from './model';
import { responseMessage } from '../constants';

export function successResponse(message: string, data: any, res: Response) {
    res.status(response_status_codes.success).json({
        status: responseMessage.success,
        message: message,
        data
    });
}

export function failureResponse(message: string, data: any, res: Response) {
    res.status(response_status_codes.success).json({
        status: responseMessage.failure,
        message: message,
        data
    });
}

export function insufficientParameters(res: Response) {
    res.status(response_status_codes.bad_request).json({
        status: responseMessage.failure,
        message: responseMessage.insufficientParams,
        data: {}
    });
}

export function mongoError(err: any, res: Response) {
    res.status(response_status_codes.internal_server_error).json({
        status: responseMessage.failure,
        message: responseMessage.mongoerror,
        data: err
    });
}