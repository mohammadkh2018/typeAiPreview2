import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface saveModel {
    content: any,
    patternId: number,
    receivers?: number,
    copies?: number,
    title?: string,
    signatures?: any,
    recivers?: any,
    transcripts?: any
}
export interface saveUsers {
    templateId: string,
    userId: string,
    name: string,
    kind: number,
    Priority: number,
    rowId?: string,
    fontName?: string,
    fontSize?: string,
    highlightColor?: string,
    fontInfo?: fontInfo
}

export class pdfModel {
    rowsId: string[] = [];
    letterItems: string[] = [];
}

export enum ContentType {
    'Pdf' = 0,
    'Tiff' = 1,
    'Gif' = 2
}



export class fontInfo {

}

@Injectable({
    providedIn: 'root',
})
export class TypeAiPreviewService {

    constructor(
        private httpClient: HttpClient,
        // private getEnvironment: Environment
    ) { }

    parhizkarAPI = 'https://test.ssmorvarid.ir/webapi/Editor/Test';
    parhizkarAPISaveLetter = 'https://test.ssmorvarid.ir/webapi/Editor/SaveLetter';
    parhizkarAPILoadLetter = 'https://test.ssmorvarid.ir/webapi/Editor/LoadLetter';
    parhizkarAPILoadTemplate = 'https://test.ssmorvarid.ir/webapi/Editor/LoadTemplate';
    parhizkarGetSignatures = 'https://test.ssmorvarid.ir/Webapi/Editor/GetSignatures';
    parhizkarHeaderOrFooterDelete = 'https://test.ssmorvarid.ir/webapi/editor/HeaderOrFooterDelete';
    parhizkarHeaderOrFooterPost = 'https://test.ssmorvarid.ir/webapi/editor/HeaderOrFooterPost';
    parhizkarGetEncryptUsersId = 'https://test.ssmorvarid.ir/WebApi/Editor/GetEncryptUsersId';
    parhizkarSaveLetterBySignId = 'https://test.ssmorvarid.ir/webapi/editor/LetterSignaturePost';
    parhizkarNewPageContent = 'https://test.ssmorvarid.ir/webapi/Editor/NewPageContent';
    parhizkarSavePdf = 'https://test.ssmorvarid.ir/webapi/Editor/GetPDF'


    Automation_Secretariat_Letter_Maker_CheckIs(param: any): any {
        const body = {
            inMethode_Name: "/api/Automation_Secretariat_Letter_Maker_CheckIs",
            makerAction: "null",
            param: param
        };

        return this.httpClient.post<any>("/", body);
    }

    CheckIs(authorization: any): any {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${authorization}`,
            'Content-Type': 'application/json'
        });
        const body = {
            inMethode_Name: "/api/Automation_TypeAi_CheckIs"
        };

        return this.httpClient.post<any>("/", body, { headers });
    }

    previewCheckIs(authorization: any): any {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${authorization}`,
            'Content-Type': 'application/json'
        });
        const body = {
            inMethode_Name: "/api/Automation_TypeAi_Preview_CheckIs"
        };
        return this.httpClient.post<any>("/", body, { headers });
    }



    postServiceParhizkar(authentication: any, authorization: any) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${authorization}`,
            'Authentication': `Bearer ${authentication}`,
            'Content-Type': 'application/json'
        });
        return this.httpClient.post<any>(`${this.parhizkarAPI}`, {}, { headers });
    }

    postServiceParhizkarparhizkarAPILoadLetter(authentication: any, authorization: any, substituteId: string): any {
        const withoutHeaderFooter = false
        const headers = new HttpHeaders({
            'Authentication': `Bearer ${authentication}`,
            'Authorization': `Bearer ${authorization}`,
            'Content-Type': 'application/json'
        });
        const body = {
            inMethode_Name: `/webapi/Editor/LoadLetter?substituteId=${substituteId}&withoutHeaderFooter=${withoutHeaderFooter}`
        };

        return this.httpClient.post<any>("/", body, { headers });
    }

    postServiceParhizkarparhizkarAPILoadTemplate(authentication: any, authorization: any, PatternId: any) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${authorization}`,
            'Authentication': `Bearer ${authentication}`,
            'Content-Type': 'application/json'
        });
        // const urlWithParams = `${this.parhizkarAPILoadTemplate}?patternId=${PatternId}`;
        const body = {
            inMethode_Name: `/webapi/Editor/LoadTemplate?patternId=${PatternId}`
        };

        return this.httpClient.post<any>('/', body, { headers });
    }

    postServiceParhizkarparhizkarAPISaveLetter(authorization: any, authentication: any, model: saveModel) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${authorization}`,
            'Authentication': `Bearer ${authentication}`,
            'Content-Type': 'application/json'
        });
        // const urlWithParams = `${this.parhizkarAPILoadTemplate}?data=${model}`;
        const body = {
            inMethode_Name: '/webapi/Editor/SaveLetter'
        };
        // return this.httpClient.post<any>(urlWithParams, { model }, { headers });
        return this.httpClient.post<any>(this.parhizkarAPISaveLetter, model, { headers }
        );
    }




    GetEncryptUsersId(authentication: any, authorization: any) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${authorization}`,
            'Authentication': `Bearer ${authentication}`,
            'Content-Type': 'application/json'
        });
        const urlWithParams = `${this.parhizkarGetEncryptUsersId}`;

        return this.httpClient.post<any>(urlWithParams, {}, { headers });
    }




    // GetSignatures(authentication: any, authorization: any, signerId: any) {
    //     const headers = new HttpHeaders({
    //         'Authorization': `Bearer ${authorization}`,
    //         'Authentication': `Bearer ${authentication}`,
    //         'Content-Type': 'application/json'
    //     });
    //     const urlWithParams = `${this.parhizkarGetSignatures}?signerId=${signerId}`;

    //     return this.httpClient.post<any>(urlWithParams, { signerId }, { headers });
    // }
    GetSignatures(authentication: any, authorization: any, signerId: any): any {
        const headers = new HttpHeaders({
            'Authentication': `Bearer ${authentication}`,
            'Authorization': `Bearer ${authorization}`,
            'Content-Type': 'application/json'
        });
        const body = {
            inMethode_Name: `/webapi/Editor/GetSignatures?signerId=${signerId}`,
        };
        return this.httpClient.post<any>("/", body, { headers });
    }

    // HeaderOrFooterDelete(authentication: any, authorization: any, rowId: string) {
    //     const headers = new HttpHeaders({
    //         'Authorization': `Bearer ${authorization}`,
    //         'Authentication': `Bearer ${authentication}`,
    //         'Content-Type': 'application/json'
    //     });
    //     const urlWithParams = `${this.parhizkarHeaderOrFooterDelete}?rowId=${rowId}`;

    //     return this.httpClient.post<any>(urlWithParams, { rowId }, { headers });
    // }
    HeaderOrFooterDelete(authentication: any, authorization: any, rowId: string) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${authorization}`,
            'Authentication': `Bearer ${authentication}`,
            'Content-Type': 'application/json'
        });
        const body = {
            inMethode_Name: `/webapi/Editor/HeaderOrFooterDelete?rowId=${encodeURIComponent(rowId)}`,
        };

        return this.httpClient.post<any>('/', body, { headers });
    }
    HeaderOrFooterPost(authentication: any, authorization: any, data: saveUsers) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${authorization}`,
            'Authentication': `Bearer ${authentication}`,
            'Content-Type': 'application/json'
        });
        const urlWithParams = `${this.parhizkarHeaderOrFooterPost}`;
        return this.httpClient.post<any>(urlWithParams, data, { headers });
    }

    // ok
    HeadersOrFootersDelete(authentication: any, authorization: any, kind: any) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${authorization}`,
            'Authentication': `Bearer ${authentication}`,
            'Content-Type': 'application/json'
        });
        const body = {
            inMethode_Name: `/webapi/Editor/HeadersOrFootersDelete?kind=${kind}`,
        };

        return this.httpClient.post<any>("/", body, { headers });
    }

    // ok
    postServiceParhizkarSaveLetterBySignId(authorization: any, authentication: any, signId: any, signerId: any, priority: any) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${authorization}`,
            'Authentication': `Bearer ${authentication}`,
            'Content-Type': 'application/json'
        });

        const body = {
            inMethode_Name: `/webapi/editor/LetterSignaturePost?signId=${signId}&signerId=${signerId}&priority=${priority}`,
        };

        return this.httpClient.post<any>("/", body, { headers });
    }

    // ok
    ChangeTrackManager(authorization: any, authentication: any, userId: any, enableTrack: any) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${authorization}`,
            'Authentication': `Bearer ${authentication}`,
            'Content-Type': 'application/json'
        });

        const body = {
            inMethode_Name: `/webapi/editor/ChangeTrackManager?enableTrack=${enableTrack}&userId=${userId}`,
        };

        return this.httpClient.post<any>("/", body, { headers });

    }

    // ok
    postServiceParhizkarNewPageContent(authentication: any, authorization: any, PatternId: any) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${authorization}`,
            'Authentication': `Bearer ${authentication}`,
            'Content-Type': 'application/json'
        });
        const body = {
            inMethode_Name: `/webapi/editor/NewPageContent?templateId=${PatternId}`,
        };
        return this.httpClient.post<any>('/', body, { headers });
    }

    // ok
    postServiceParhizkarSavePdf(authorization: any, authentication: any, model: pdfModel) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${authorization}`,
            'Authentication': `Bearer ${authentication}`,
            'Content-Type': 'application/json'
        });
        const body = {
            inMethode_Name: "/webapi/Editor/GetPDF",
            model: model,
        };
        return this.httpClient.post("/", body, { headers, responseType: 'blob' });
    }

    getDocumentAsArrayBuffer(): any {
        const url = 'https://api.example.com/get-document';
        // درخواست با پاسخ بی‌سورس (arraybuffer)
        return this.httpClient.get(url, { responseType: 'arraybuffer' });
    }



    parhizkarPreview = 'https://test.ssmorvarid.ir/WebApi/Editor/Preview';

    parhizkarPreviewService(authorization: any ) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${authorization}`,
        });

         const body = {
            inMethode_Name: "/WebApi/Editor/Preview",
        };

        return this.httpClient.post('/', body, {
            headers,
            responseType: 'blob'
        });
    }

        LetterPropertiesPreview(authentication: any, authorization: any, substituteId: string): any {
        const headers = new HttpHeaders({
            'Authentication': `Bearer ${authentication}`,
            'Authorization': `Bearer ${authorization}`,
            'Content-Type': 'application/json'
        });
        const body = {
            inMethode_Name: `/webapi/Editor/LetterPropertiesPreview?substituteId=${substituteId}`
        };

        return this.httpClient.post<any>("/", body, { headers });
    }
}



















// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// export interface saveModel {
//     content: any,
//     patternId: number,
//     receivers?: number,
//     copies?: number,
//     title?: string,
//     signatures?: any,
//     recivers?: any,
//     transcripts?: any
// }
// export interface saveUsers {
//     templateId: string,
//     userId: string,
//     name: string,
//     kind: number,
//     Priority: number,
//     rowId?: string,
//     fontName?: string,
//     fontSize?: string,
//     highlightColor?: string,
//     fontInfo?: fontInfo
// }

// export class pdfModel {
//     rowsId: string[] = [];
//     letterItems: string[] = [];
// }

// export enum ContentType {
//     'Pdf' = 0,
//     'Tiff' = 1,
//     'Gif' = 2
// }



// export class fontInfo {

// }

// @Injectable({
//     providedIn: 'root',
// })
// export class TypeAiPreviewService {

//     constructor(
//         private httpClient: HttpClient,
//         // private getEnvironment: Environment
//     ) { }

//     parhizkarAPI = 'https://test.ssmorvarid.ir/webapi/Editor/Test';
//     parhizkarAPISaveLetter = 'https://test.ssmorvarid.ir/webapi/Editor/SaveLetter';
//     parhizkarAPILoadLetter = 'https://test.ssmorvarid.ir/webapi/Editor/LoadLetter';
//     parhizkarAPILoadTemplate = 'https://test.ssmorvarid.ir/webapi/Editor/LoadTemplate';
//     parhizkarGetSignatures = 'https://test.ssmorvarid.ir/Webapi/Editor/GetSignatures';
//     parhizkarHeaderOrFooterDelete = 'https://test.ssmorvarid.ir/webapi/editor/HeaderOrFooterDelete';
//     parhizkarHeaderOrFooterPost = 'https://test.ssmorvarid.ir/webapi/editor/HeaderOrFooterPost';
//     parhizkarGetEncryptUsersId = 'https://test.ssmorvarid.ir/WebApi/Editor/GetEncryptUsersId';
//     parhizkarSaveLetterBySignId = 'https://test.ssmorvarid.ir/webapi/editor/LetterSignaturePost';
//     parhizkarNewPageContent = 'https://test.ssmorvarid.ir/webapi/Editor/NewPageContent';
//     parhizkarSavePdf = 'https://test.ssmorvarid.ir/webapi/Editor/GetPDF'

//     param = '75543D96CB836898D8D052A617766EDE83EC7E6605A95BA9FDFCD43B07D0E2F3DE0982EDC8996547B102261702A468209A66B9B6B1438F4F6AE6C8FA0C623723AE393839ECC7A6A33FFD76D831279EE3A54EFB76E0F64EC703413F2A8F40B62C5AB87F64961E75D61B670E2A7592057A97B17810A5EFD00810A1D892D46BE13B95C136E44F9AFA30A6F96D56A24DF3EDA82F764D703E5C4B541D5E86E62891138A19376B9042E5782778FD3FDC0E3283417B8325C7DAAC652F6686927B0F4619BC25AD5EFC8DDE61A39CE76EB61C963616BE7AA3019AC5F8E576C66C2F292CCC5372D92346026900CD79D69E35E1DA8A48DA93AB8EA27A6FD48310FD3B75A7BA8EEEB47B7869065241528C62B25C14BC'
//     authorization = '75543D96CB836898D8D052A617766EDE83EC7E6605A95BA9FDFCD43B07D0E2F3DE0982EDC8996547B102261702A468209A66B9B6B1438F4F6AE6C8FA0C623723AE393839ECC7A6A33FFD76D831279EE3A54EFB76E0F64EC703413F2A8F40B62C5AB87F64961E75D61B670E2A7592057A97B17810A5EFD00810A1D892D46BE13B95C136E44F9AFA30A6F96D56A24DF3EDA82F764D703E5C4B541D5E86E62891138A19376B9042E5782778FD3FDC0E3283417B8325C7DAAC652F6686927B0F4619BC25AD5EFC8DDE61A39CE76EB61C963616BE7AA3019AC5F8E576C66C2F292CCC5372D92346026900CD79D69E35E1DA8A48DA93AB8EA27A6FD48310FD3B75A7BA8EEEB47B7869065241528C62B25C14BC'
//     authentication = '8392198F2F7A1482F29B7DD34E13C8BED3CFCC15E05B12975059AD9FD1F0257382D10720A0A0E495BAFE8873A43BEA28B5BBE28E4357587524A1F824AC121F8FE7A6F90963296C2DD007E8A0737A329DAD30ED907845BB080105BF74D1148EB3'
//     accesTokenFromMakerCheckis = '75543D96CB836898D8D052A617766EDE83EC7E6605A95BA9FDFCD43B07D0E2F3DE0982EDC8996547B102261702A468209A66B9B6B1438F4F6AE6C8FA0C623723AE393839ECC7A6A33FFD76D831279EE3A54EFB76E0F64EC703413F2A8F40B62C5AB87F64961E75D61B670E2A7592057A97B17810A5EFD00810A1D892D46BE13B95C136E44F9AFA30A6F96D56A24DF3EDA82F764D703E5C4B541D5E86E62891138A19376B9042E5782778FD3FDC0E3283417B8325C7DAAC652F6686927B0F4619BC25AD5EFC8DDE61A39CE76EB61C963616BE7AA3019AC5F8E576C66C2F292CCC5372D92346026900CD79D69E35E1DA8A48DA93AB8EA27A6FD48310FD3B75A7BA8EEEB47B7869065241528C62B25C14BC'

//     // Automation_Secretariat_Letter_Maker_CheckIs(param: any): any {
//     //      const headers = new HttpHeaders({
//     //         'Authorization': `Bearer ${this.authorization}`,
//     //         'Authentication': `Bearer ${this.authentication}`,
//     //         'Content-Type': 'application/json'
//     //     });
//     //     const body = {
//     //         makerAction: "null",
//     //         param: this.param
//     //     };

//     //     return this.httpClient.post<any>("https://test.ssmorvarid.ir/api/Automation_Secretariat_Letter_Maker_CheckIs", body , { headers });
//     // }

//     CheckIs(authorization: any): any {
//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${this.accesTokenFromMakerCheckis}`,
//             'Authentication': `Bearer ${this.authentication}`,
//             'Content-Type': 'application/json'
//         });

//         return this.httpClient.post<any>("https://test.ssmorvarid.ir/api/Automation_TypeAi_CheckIs", {}, { headers });
//     }

//     // previewCheckIs(authorization: any): any {
//     //     const headers = new HttpHeaders({
//     //         'Authorization': `Bearer ${authorization}`,
//     //         'Content-Type': 'application/json'
//     //     });
//     //     const body = {
//     //         inMethode_Name: "/api/Automation_TypeAi_Preview_CheckIs"
//     //     };
//     //     return this.httpClient.post<any>("/", body, { headers });
//     // }
//     previewCheckIs(authorization: any): any {
//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${this.accesTokenFromMakerCheckis}`,
//             'Authentication': `Bearer ${this.authentication}`,
//             'Content-Type': 'application/json'
//         });
//         // const body = {
//         //     inMethode_Name: "/api/Automation_TypeAi_Preview_CheckIs"
//         // };
//         return this.httpClient.post<any>("https://test.ssmorvarid.ir/api/Automation_TypeAi_Preview_CheckIs", {}, { headers });
//     }


//     postServiceParhizkar(authentication: any, authorization: any) {
//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${this.accesTokenFromMakerCheckis}`,
//             'Authentication': `Bearer ${this.authentication}`,
//             'Content-Type': 'application/json'
//         });
//         return this.httpClient.post<any>(`${this.parhizkarAPI}`, {}, { headers });
//     }

//     postServiceParhizkarparhizkarAPILoadLetter(authentication: any, authorization: any, substituteId: string): any {
//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${this.accesTokenFromMakerCheckis}`,
//             'Authentication': `Bearer ${this.authentication}`,
//             'Content-Type': 'application/json'
//         });
//         // const body = {
//         //     inMethode_Name: `/webapi/Editor/LoadLetter?substituteId=${substituteId}`
//         // };

//         return this.httpClient.post<any>(`https://test.ssmorvarid.ir/webapi/Editor/LoadLetter?substituteId=${substituteId}`, {}, { headers });
//     }

//     postServiceParhizkarparhizkarAPILoadTemplate(authentication: any, authorization: any, PatternId: any) {
//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${this.accesTokenFromMakerCheckis}`,
//             'Authentication': `Bearer ${this.authentication}`,
//             'Content-Type': 'application/json'
//         });
//         // const urlWithParams = `${this.parhizkarAPILoadTemplate}?patternId=${PatternId}`;
//         //  const body = {
//         //     inMethode_Name: `https://test.ssmorvarid.ir/webapi/Editor/LoadTemplate?patternId=${PatternId}`
//         // };

//         return this.httpClient.post<any>(`https://test.ssmorvarid.ir/webapi/Editor/LoadTemplate?patternId=${PatternId}`, {}, { headers });
//     }

//     postServiceParhizkarparhizkarAPISaveLetter(authorization: any, authentication: any, model: saveModel) {
//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${this.accesTokenFromMakerCheckis}`,
//             'Authentication': `Bearer ${this.authentication}`,
//             'Content-Type': 'application/json'
//         });
//         // const urlWithParams = `${this.parhizkarAPILoadTemplate}?data=${model}`;
//         const body = {
//             model: model
//         };
//         // return this.httpClient.post<any>(urlWithParams, { model }, { headers });
//         return this.httpClient.post<any>('https://test.ssmorvarid.ir/webapi/Editor/SaveLetter', body, { headers });
//     }




//     GetEncryptUsersId(authentication: any, authorization: any) {
//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${authorization}`,
//             'Authentication': `Bearer ${authentication}`,
//             'Content-Type': 'application/json'
//         });
//         const urlWithParams = `${this.parhizkarGetEncryptUsersId}`;

//         return this.httpClient.post<any>(urlWithParams, {}, { headers });
//     }




//     // GetSignatures(authentication: any, authorization: any, signerId: any) {
//     //     const headers = new HttpHeaders({
//     //         'Authorization': `Bearer ${authorization}`,
//     //         'Authentication': `Bearer ${authentication}`,
//     //         'Content-Type': 'application/json'
//     //     });
//     //     const urlWithParams = `${this.parhizkarGetSignatures}?signerId=${signerId}`;

//     //     return this.httpClient.post<any>(urlWithParams, { signerId }, { headers });
//     // }
//     GetSignatures(authentication: any, authorization: any, signerId: any): any {
//         const headers = new HttpHeaders({
//             'Authentication': `Bearer ${authentication}`,
//             'Authorization': `Bearer ${authorization}`,
//             'Content-Type': 'application/json'
//         });
//         // const body = {
//         //     inMethode_Name: `https://test.ssmorvarid.ir/webapi/Editor/GetSignatures?signerId=${signerId}`,
//         // };
//         return this.httpClient.post<any>(`https://test.ssmorvarid.ir/webapi/Editor/GetSignatures?signerId=${signerId}`, {}, { headers });
//     }

//     // HeaderOrFooterDelete(authentication: any, authorization: any, rowId: string) {
//     //     const headers = new HttpHeaders({
//     //         'Authorization': `Bearer ${authorization}`,
//     //         'Authentication': `Bearer ${authentication}`,
//     //         'Content-Type': 'application/json'
//     //     });
//     //     const urlWithParams = `${this.parhizkarHeaderOrFooterDelete}?rowId=${rowId}`;

//     //     return this.httpClient.post<any>(urlWithParams, { rowId }, { headers });
//     // }
//     HeaderOrFooterDelete(authentication: any, authorization: any, rowId: string) {
//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${this.accesTokenFromMakerCheckis}`,
//             'Authentication': `Bearer ${this.authentication}`,
//             'Content-Type': 'application/json'
//         });
//         const body = {
//             inMethode_Name: `/webapi/Editor/HeaderOrFooterDelete?rowId=${encodeURIComponent(rowId)}`,
//         };

//         return this.httpClient.post<any>('/', body, { headers });
//     }
//     HeaderOrFooterPost(authentication: any, authorization: any, data: saveUsers) {
//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${this.accesTokenFromMakerCheckis}`,
//             'Authentication': `Bearer ${this.authentication}`,
//             'Content-Type': 'application/json'
//         });
//         const urlWithParams = `${this.parhizkarHeaderOrFooterPost}`;
//         return this.httpClient.post<any>(urlWithParams, data, { headers });
//     }

//     // ok
//     HeadersOrFootersDelete(authentication: any, authorization: any, kind: any) {
//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${this.accesTokenFromMakerCheckis}`,
//             'Authentication': `Bearer ${this.authentication}`,
//             'Content-Type': 'application/json'
//         });
//         const body = {
//             inMethode_Name: `/webapi/Editor/HeadersOrFootersDelete?kind=${kind}`,
//         };

//         return this.httpClient.post<any>("/", body, { headers });
//     }

//     // ok
//     // postServiceParhizkarSaveLetterBySignId(authorization: any, authentication: any, signId: any, signerId: any, priority: any) {
//     //     const headers = new HttpHeaders({
//     //         'Authorization': `Bearer ${authorization}`,
//     //         'Authentication': `Bearer ${authentication}`,
//     //         'Content-Type': 'application/json'
//     //     });

//     //     const body = {
//     //         inMethode_Name: `/webapi/editor/LetterSignaturePost?signId=${signId}&signerId=${signerId}&priority=${priority}`,
//     //     };

//     //     return this.httpClient.post<any>("/", body, { headers });
//     // }
//     postServiceParhizkarSaveLetterBySignId(authorization: any, authentication: any, signId: any, signerId: any, priority: any) {
//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${authorization}`,
//             'Authentication': `Bearer ${authentication}`,
//             'Content-Type': 'application/json'
//         });

//         // const body = {
//         //     inMethode_Name: `/webapi/editor/LetterSignaturePost?signId=${signId}&signerId=${signerId}&priority=${priority}`,
//         // };
//         const url = `https://test.ssmorvarid.ir/webapi/editor/LetterSignaturePost?signId=${signId}&signerId=${signerId}&priority=${priority}`

//         return this.httpClient.post<any>(url, {}, { headers });
//     }

//     // ok
//     ChangeTrackManager(authorization: any, authentication: any, userId: any, enableTrack: any) {
//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${this.accesTokenFromMakerCheckis}`,
//             'Authentication': `Bearer ${this.authentication}`,
//             'Content-Type': 'application/json'
//         });

//         const body = {
//             inMethode_Name: `/webapi/editor/ChangeTrackManager?enableTrack=${enableTrack}&userId=${userId}`,
//         };

//         return this.httpClient.post<any>("/", body, { headers });

//     }

//     // ok
//     postServiceParhizkarNewPageContent(authentication: any, authorization: any, PatternId: any) {
//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${this.accesTokenFromMakerCheckis}`,
//             'Authentication': `Bearer ${this.authentication}`,
//             'Content-Type': 'application/json'
//         });
//         const body = {
//             inMethode_Name: `/webapi/editor/NewPageContent?templateId=${PatternId}`,
//         };
//         return this.httpClient.post<any>('/', body, { headers });
//     }

//     // ok
//     postServiceParhizkarSavePdf(authorization: any, authentication: any, model: pdfModel) {
//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${this.accesTokenFromMakerCheckis}`,
//             'Authentication': `Bearer ${this.authentication}`,
//             'Content-Type': 'application/json'
//         });
//         const body = {
//             // inMethode_Name: "https://test.ssmorvarid.ir/webapi/Editor/GetPDF",
//             model: model,
//         };
//         return this.httpClient.post("https://test.ssmorvarid.ir/webapi/Editor/GetPDF", body, { headers: headers, responseType: 'blob' });
//     }

//     getDocumentAsArrayBuffer(): any {
//         const url = 'https://api.example.com/get-document';
//         // درخواست با پاسخ بی‌سورس (arraybuffer)
//         return this.httpClient.get(url, { responseType: 'arraybuffer' });
//     }
// parhizkarPreview = 'https://test.ssmorvarid.ir/WebApi/Editor/Preview';

//     parhizkarPreviewService() {
//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${this.accesTokenFromMakerCheckis}`,
//             'Authentication': `Bearer ${this.authentication}`,
//         });

//         // const body = {
//         //     inMethode_Name: "/WebApi/Editor/Preview",
//         // };

//         return this.httpClient.post(this.parhizkarPreview, {}, {
//             headers,
//             responseType: 'blob'
//         });
//     }

//       LetterPropertiesPreview(substituteId: any) {
//         const headers = new HttpHeaders({
//             'Authorization': `Bearer ${this.accesTokenFromMakerCheckis}`,
//             'Authentication': `Bearer ${this.authentication}`,
//             'Content-Type': 'application/json'
//         });
      
//         return this.httpClient.post<any>(`https://test.ssmorvarid.ir/webapi/Editor/LetterPropertiesPreview?substituteId=${substituteId}`, {}, { headers });
//     }
// }

