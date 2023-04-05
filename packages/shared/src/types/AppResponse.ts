import { Response } from 'express';
import { ApiError } from './ApiError';

type ResponseBody<T> = ApiError | T;

export type AppResponse<T> = Response<ResponseBody<T>>;
