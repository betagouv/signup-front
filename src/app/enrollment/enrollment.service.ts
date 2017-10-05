import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Enrollment } from '../enrollment/enrollment';
import { config } from '../config';

function camelCaseKeys (o) {
  if (!((typeof o) === 'object')) return o
  if (Array.isArray(o)) {
    return o.map((e) => camelCaseKeys(e))
  }
  let res;
  for (let k in o) {
    res = res || {}
    if (!o[k]) {
      res[k.replace(/(_\w)/g, (letter) => letter[1].toUpperCase())] = o[k]
      continue
    }
    let value = null;
    if (Object.keys(o[k]).length === 0 && o[k].constructor === Object) {
      value = {}
    } else {
      value = camelCaseKeys(o[k])
    }
    res[k.replace(/(_\w)/g, (letter) => letter[1].toUpperCase())] = value
  }
  return res
}

@Injectable()
export class EnrollmentService {
  enrollment: Enrollment;

  constructor (
    private http: HttpClient
  ) { }

  save (enrollment) {
    let res;
    if (enrollment.id) {
      res = this.http.put(config.api_url + '/enrollments/' + enrollment.id, { enrollment: enrollment.serialized() })
        .map((response) => {
          enrollment.errors = null
          Object.assign(enrollment, camelCaseKeys(response))
          return Observable.of(enrollment)
        })
    } else {
      res = this.http.post(config.api_url + '/enrollments', { enrollment: enrollment.serialized() })
        .map((response) => {
          enrollment.errors = null
          Object.assign(enrollment, camelCaseKeys(response))
          return Observable.of(enrollment)
        })
    }
    return res.catch((error) => {
      enrollment.errors = error.error
      return Observable.throw(error)
    }).toPromise()

  }

  get (id) {
    return this.http.get(config.api_url + '/enrollments/' + id).map((response) => {
      let enrollment = new Enrollment(camelCaseKeys(response))
      console.log(enrollment)
      return enrollment
    }).toPromise()
  }

  reload (enrollment) {
    return this.http.get(config.api_url + '/enrollments/' + enrollment.id).map((response) => {
      Object.assign(enrollment, camelCaseKeys(response))
      return enrollment
    }).subscribe()
  }

  reloadMessages (enrollment) {
    return this.http.get(config.api_url + '/enrollments/' + enrollment.id + '/messages').map((response) => {
      console.log(response)
      Object.assign(enrollment.messages, camelCaseKeys(response))
      return enrollment
    }).subscribe()
  }

  trigger (enrollment, event) {
    this.http.patch(
      config.api_url + '/enrollments/' + enrollment.id + '/trigger', { event: event }
    ).map((response) => {
      Object.assign(enrollment, camelCaseKeys(response))
      return Observable.of(enrollment)
    }).toPromise()
  }

  uploadDocument (enrollment, target) {
    const files = target.files
    const documentType = target.name

    if (files.length > 0) {
      let formData: FormData = new FormData();
      for (let file of files) {
        formData.append('enrollment[documents_attributes][][attachment]', file, file.name);
      }
      formData.append('enrollment[documents_attributes][][type]', documentType);
      return this.http.put(config.api_url + '/enrollments/' + enrollment.id, formData)
        .map((response) => {
          enrollment.errors = null
          Object.assign(enrollment, camelCaseKeys(response))
          return Observable.of(enrollment)
        }).catch((error) => {
          enrollment.errors = error.error
          console.log(enrollment)
          return Observable.of(error)
        }).toPromise()
    } else {
      return Promise.reject({ message: 'Choisissez un document' })
    }
  }
}
