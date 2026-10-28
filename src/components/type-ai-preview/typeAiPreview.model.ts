export interface Signature {
  sigId: string;
  signId?: string;
  id: string;
  name: string;
  width: number;
  height: number;
  pageNum: number;
  priority: number;
  isFixed: boolean;
  deleteSigId: string;
  signerId: string;
  cordinate: any;
}

export class optionalData {
  rowsId: any[] = [];
  letterItems: any[] = [];
  ContentType: any;
  extraPdf: any;
}

export class isCheckedDatas {
  isSignatures: boolean = false
}

export interface SignatureDto {
  id: string;
  name: string;
  pageNumber: string | number;
  priority: number;
  cordinate: string;
  sign?: string,
  signId?: string
  signStatus?: string,
  substituteId?: string
}

export interface savedSignatureModel {
  id: string,
  name: string,
  pageNumber: number,
  cordinate: string
}

export interface SignatureBox {
  id: number;
  pageNumber: number;
  xPercent: number;
  yPercent: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
}

export interface TypingAreaBounds {
  pageNumber: number,
  top: number,
  left: number,
  right: number,
  bottom: number,
  width: number,
  height: number
};


export interface PageData {
  width: number;
  height: number;
  leftMargin: number;
  topMargin: number;
  rightMargin: number;
  bottomMargin: number;
  leftDate?: number;
  topDate?: number;
  fontName?: string;
  fontSize?: any;
  background?: string;
}