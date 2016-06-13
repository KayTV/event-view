import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/observable';

import {CONFIG, ExceptionService, MessageService, SpinnerService} from '../';

import {Speaker} from './speaker.model';

let speakersUrl = CONFIG.baseUrls.speakers;

@Injectable()
export class SpeakerService {
  onDbReset = this.messageService.state;

  constructor(
      private http: Http,
      private exceptionService: ExceptionService,
      private messageService: MessageService,
      private spinnerService: SpinnerService) {
    this.messageService.state.subscribe(state => this.getSpeakers());
  }

  addSpeaker(speaker: Speaker) {
    let body = JSON.stringify(speaker);
    this.spinnerService.show();
    return <Observable<Speaker>>this.http.post(`${speakersUrl}`, body)
        .map(res => res.json().data)
        .catch(this.exceptionService.catchBadResponse)
        .finally(() => this.spinnerService.hide());
  }

  deleteSpeaker(speaker: Speaker) {
    this.spinnerService.show();
    return <Observable<Speaker>>this.http
      .delete(`${speakersUrl}/${speaker.id}`)
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  getSpeakers() {
    this.spinnerService.show();
    return <Observable<Speaker[]>>this.http
      .get(speakersUrl)
      .map(res => this.extractData<Speaker[]>(res))
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  getSpeaker(id: number) {
    this.spinnerService.show();
    return <Observable<Speaker>>this.http
      .get(`${speakersUrl}/${id}`)
      .map(res => this.extractData<Speaker>(res))
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  updateSpeaker(speaker: Speaker) {
    let body = JSON.stringify(speaker);
    this.spinnerService.show();

    return <Observable<Speaker>>this.http
      .put(`${speakersUrl}/${speaker.id}`, body)
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  private extractData<T>(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return <T>(body.data || {});
  }
}
