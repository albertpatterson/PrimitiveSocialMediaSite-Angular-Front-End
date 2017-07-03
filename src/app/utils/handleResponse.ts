    import {Response} from '@angular/http';
    
    export function assertStatus(res: Function, resp:Response, expectedStatus: number, diagnostic: string): void{
        let actualStatus = resp.status;
        if(actualStatus !== expectedStatus) throw new Error(diagnostic);
        res(resp)
    }

    export function handleError (rej: Function, error: Response | any): void {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response && error.text()) {
            errMsg = error.json().message;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        rej(errMsg);
    }