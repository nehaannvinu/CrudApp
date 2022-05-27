import { Response } from 'express';
import { response_status_codes } from './model';
import { responseMessage } from './constants';

export function successResponse(message: string, DATA: any, res: Response) {
    res.status(response_status_codes.success).json({
        STATUS: responseMessage.success,
        MESSAGE: message,
        DATA
    });
}

export function failureResponse(message: string, DATA: any, res: Response) {
    res.status(response_status_codes.success).json({
        STATUS: responseMessage.failure,
        MESSAGE: message,
        DATA
    });
}

export function insufficientParameters(res: Response) {
    res.status(response_status_codes.bad_request).json({
        STATUS: responseMessage.failure,
        MESSAGE: responseMessage.insufficientParams,
        DATA: {}
    });
}

export function mongoError(err: any, res: Response) {
    res.status(response_status_codes.internal_server_error).json({
        STATUS: responseMessage.failure,
        MESSAGE: responseMessage.mongoerror,
        DATA: err
    });
}