export interface MessageReceived {
    id: number
    mtype: string
    read: boolean
    idDossier: number
    idClasseur: number
    transferred: boolean
    answered: boolean
    to_cc_cci: string
    subject: string
    content: string
    date: string
    to: Array<unknown>
    files: Array<unknown>
    from: {
        name: string
        nom: string
        prenom: string
        particule: string
        civilite: string
        role: string
        listeRouge: boolean
        id: number
        read: boolean
        fonctionPersonnel: string
    }
}

export interface MessageSent {}

export interface MessageArchived {}

export interface Message {
    classeurs: Array<unknown>
    messages: {
        received: MessageReceived[]
        sent: MessageSent[]
        archived: MessageArchived[]
    }
}

export interface MessageResponse {
    code: number
    token: string
    host: string
    data: Message
}
