import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { Observable, catchError } from 'rxjs';

Injectable();
export class ApiErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((error: AxiosError) => {
        if (error.response) {
          throw new HttpException(
            error.response.data || 'External API error',
            error.response.status || HttpStatus.BAD_GATEWAY,
          );
        }
        throw new HttpException(
          'External API request failed',
          HttpStatus.BAD_GATEWAY,
        );
      }),
    );
  }
}
