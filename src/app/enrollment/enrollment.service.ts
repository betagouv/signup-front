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
          Object.assign(enrollment, camelCaseKeys(response))
          return Observable.of(enrollment)
        })
    } else {
      res = this.http.post(config.api_url + '/enrollments', { enrollment: enrollment.serialized() })
        .map((response) => {
          Object.assign(enrollment, camelCaseKeys(response))
          return Observable.of(enrollment)
        })
    }
    return res.toPromise()

  }

  get (id) {
    return this.http.get(config.api_url + '/enrollments/' + id).map((response) => {
      return new Enrollment(camelCaseKeys(response))
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
          Object.assign(enrollment, camelCaseKeys(response))
          return Observable.of(enrollment)
        }).toPromise()
    } else {
      return Promise.reject({ message: 'Choisissez un document' })
    }
  }
}
