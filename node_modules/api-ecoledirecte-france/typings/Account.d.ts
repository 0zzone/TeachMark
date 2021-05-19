export interface LoginResponse {
    code: number
    token: string
    message: string
    data: {
        accounts: Account[]
    }
}

export interface Account {
    idLogin: number
    id: number
    uid: string
    identifiant: string
    typeCompte: string
    codeOgec: string
    main: boolean
    lastConnexion: string
    civilite: string
    prenom: string
    particule: string
    nom: string
    email: string
    anneeScolaireCourante: string
    nomEtablissement: string
    logoEtablissement: string
    couleurAgendaEtablissement: string
    accessToken: string
    modules: AccountModule[]
    parametresIndividuels: AccountPersonnalParameters
    profile: AccountProfile
}

export interface AccountModule {
    code:
        | "CANTINE_BARCODE"
        | "VIE_SCOLAIRE"
        | "VIE_DE_LA_CLASSE"
        | "NOTES"
        | "CLOUD"
        | "MESSAGERIE"
        | "EDT"
        | "DOCUMENTS_ELEVE"
        | "CAHIER_DE_TEXTES"
        | "QCM"
        | "RESERVATIONS"
        | "CARNET_CORRESPONDANCE"
        | "ESIDOC"
        | "EDUNAO"
        | "CATER"
        | "ARD"
        | "PEARLTREES"
        | "EDUMALIN"
        | "SUIVI_STAGE"
        | "CLICKNPLAY"
        | "AVENRIA"
        | "ONISEPSERVICES"
        | "SITUATION_FINANCIERE"
    enable: boolean
    ordre: number
    badge: number
    params: AccountModulesParamaters[AccountModule["code"]]
}

export interface AccountModulesParamaters {
    CANTINE_BARCODE: {}
    VIE_SCOLAIRE: {}
    VIE_DE_LA_CLASSE: {}
    NOTES: {}
    CLOUD: {}
    MESSAGERIE: {}
    EDT: {}
    DOCUMENTS_ELEVE: {
        DocumentsNotesActif: "0" | "1"
        DocumentsVSActif: "0" | "1"
        DocumentsAdministratifActif: "0" | "1"
        AnneeArchive: string
    }
    CAHIER_DE_TEXTES: {
        compteRenduSeance: "0" | "1"
        isCDTPrimaire: "0" | "1"
    }
    QCM: {}
    RESERVATIONS: {
        regime: string
        repasmidi_1: "0" | "1"
        repassoir_1: "0" | "1"
        repasmidi_2: "0" | "1"
        repassoir_2: "0" | "1"
        repasmidi_3: "0" | "1"
        repassoir_3: "0" | "1"
        repasmidi_4: "0" | "1"
        repassoir_4: "0" | "1"
        repasmidi_5: "0" | "1"
        repassoir_5: "0" | "1"
        repasmidi_6: "0" | "1"
        repassoir_6: "0" | "1"
        repasmidi_7: "0" | "1"
        repassoir_7: "0" | "1"
    }
    CARNET_CORRESPONDANCE: {}
    ESIDOC: {}
    EDUNAO: {}
    CATER: {}
    ARD: {}
    PEARLTREES: {}
    EDUMALIN: {}
    SUIVI_STAGE: {}
    CLICKNPLAY: {}
    AVENRIA: {}
    ONISEPSERVICES: {}
    SITUATION_FINANCIERE: {}
}

export interface AccountPersonnalParameters {
    lsuPoilDansLaMainBorne1: string
    lsuPoilDansLaMainBorne2: string
    lsuPoilDansLaMainBorne3: string
    modeCalculLSU: string
    isQrcode: boolean
    modeAccessibiliteVisuelle: boolean
    typeSaisieNotesDefaut: string
    nbJoursMaxRenduDevoirCDT: string
}

export interface AccountProfile {
    sexe: string
    infoEDT: string
    nomEtablissement: string
    idEtablissement: string
    idReelEtab: string
    photo: string
    classe: AccountProfileClasse
}

export interface AccountProfileClasse {
    id: number
    code: string
    libelle: string
}

export interface AccountResponse {
    code: number
    token: string
    message: string
    data: {
        accounts: Account[]
    }
}
