import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let modifiedReq = null; 
  if (req.url.includes('cloudinary.com')){
    modifiedReq = req.clone({
      withCredentials: false
    })
  }else{
    modifiedReq = req.clone({
      withCredentials: true
    })
  }

  return next(modifiedReq);
};
