import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';
import { Message } from '../message/message';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService {
  constructor (
    private http: HttpClient
  ) {}

  save (message) {
    const enrollment = message.enrollment
    return this.http.post(
      config.api_url + '/enrollments/' + enrollment.id + '/messages',
      { message: message }
    ).toPromise()
  }
}
