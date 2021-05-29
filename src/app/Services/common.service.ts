import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


interface HttpCallback {
  (Apiresult?: any): void;
}

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  public API_URL: any = "http://localhost:42471/User/";
  constructor(private router: Router,
    private http: HttpClient) {

  }
  ApiPost(Parameters: any, myCalback: HttpCallback) {
    console.log('112', Parameters);
    this.http.post(Parameters.Url, Parameters.PostData).toPromise()
      .then(result => {
        myCalback(result);
      },
        error => {

          //this.spinner.hide();
        }
      );
  }
  AlertSuccess(Message: string) {

    Swal.fire('Success...', Message, 'success')

  }
  AlertError(Message: string) {
    Swal.fire('Oops...', Message, 'error')
  }
  AlertConfirm(Message: string, myCalback: HttpCallback) {
    Swal.fire({
      title: 'Are you sure?',
      text: Message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        myCalback(result);
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire(
        //   'Cancelled',
        //   'Your imaginary file is safe :)',
        //   'error'
        // )
      }
    })
  }
  alertWithAutoClose(Message: string, myCalback: HttpCallback) {
    let timerInterval
    Swal.fire({
      title: 'Redirecting',
      html: Message,
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer()
          if (content) {
            const b = content.querySelector('b')
            if (b) {

            }
          }
        }, 100)
      },
      willClose: () => {
        myCalback();
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }

}
