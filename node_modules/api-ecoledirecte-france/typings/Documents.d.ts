export interface DocumentAdmin {
    id: number
    libelle: string
    idEleve:number
    date: string
    type: string
    signatureDemandee: Boolean
    signature: Object
}

export interface Document {
    data: {
        factures: Array<unknown>
        notes: Array<unknown>
        viescolaire: Array<unknown>
        administratifs: Array<DocumentAdmin>
        inscriptions: Array<unknown>
    }
}

export interface DocumentResponse {
    code: number
    token: string
    host: string
    data: Document
}
