import { HttpInterceptorFn } from "@angular/common/http";

function isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage
}


//Codigo para adjuntar automaticamente el token JWT en cada peticion HTTP.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    
    if(isBrowser()) {
        const token = localStorage.getItem('token')

        if(token) {
            const authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
            return next(authReq)
        }
    }
    return next(req)
}


