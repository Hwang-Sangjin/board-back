import { ArgumentsHost, ExceptionFilter, HttpException,Catch } from '@nestjs/common';
import { Response,Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    catch(excpetion: HttpException, host: ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = excpetion.getStatus();
        const request = ctx.getRequest<Request>();

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url
        });
    }
}