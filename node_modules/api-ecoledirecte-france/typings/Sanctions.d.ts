export interface SanctionLateOrAbsence {
    id: number
    idEleve: number
    nomEleve: string
    typeElement: string
    date: string
    displayDate: string
    libelle: string
    motif: string
    justifie: boolean
    par: string
    commentaire: string
    typeJustification: string
    justifieEd: boolean
    aFaire: string
    dateDeroulement: string
}

export interface SanctionOrEncouragements {
    id: number
    idEleve: number
    nomEleve: string
    typeElement: string
    date: string
    displayDate: string
    libelle: string
    motif: string
    justifie: boolean
    par: string
    commentaire: string
    typeJustification: string
    justifieEd: boolean
    aFaire: string
    dateDeroulement: string
}

export interface Sanction {
    absencesRetards: SanctionLateOrAbsence[]
    sanctionsEncouragements: SanctionOrEncouragements[]
    parametrage: {
        justificationEnLigne: boolean
        absenceCommentaire: boolean
        retardCommentaire: boolean
        sanctionsVisible: boolean
        sanctionParQui: boolean
        sanctionCommentaire: boolean
        encouragementsVisible: boolean
        encouragementParQui: boolean
        encouragementCommentaire: boolean
    }
}

export interface SanctionResponse {
    code: number
    token: string
    host: string
    data: Sanction
}
