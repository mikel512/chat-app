import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})

/*
  Services are provided as "singletons" by default(means only one instance
  of the object is allowed in the app) and declared using dependency
  injection which means they must be declared in the constructor.
  
  This service uses the sweetalert2 library to show toasts
  to show the user any relevant updates.
  Note the public functions inheriting from the private function
*/
export class SwalService {
  private baseToast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timerProgressBar: true,
    position: 'top-end',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  });

  constructor() { }

  success(text: string, myTime: number = 5000) {
    this.baseToast.fire({
      title: text,
      icon: 'success',
      timer: myTime,
    })
  }

  error(text: string, myTime: number = 5000) {
    this.baseToast.fire({
      title: text,
      icon: 'error',
      timer: myTime,
    })
  }

  warning(text: string, myTime: number = 5000) {
    this.baseToast.fire({
      title: text,
      icon: 'warning',
      timer: myTime,
    })
  }
}
