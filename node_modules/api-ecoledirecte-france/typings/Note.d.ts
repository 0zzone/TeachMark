export interface NoteNote {
    devoir: string
    codePeriode: string
    codeMatiere: string
    libelleMatiere: string
    codeSousMatiere: string
    typeDevoir: string
    enLettre: boolean
    coef: string
    noteSur: string
    valeur: string
    nonSignificatif: boolean
    date: string
    dateSaisie: string
    valeurisee: boolean
    moyenneClasse: string
    elementsProgramme: Array<unknown>
}

export interface NotePeriodeMaterSimulation {}

export interface NotePeriodeMater {
    id: number
    codeMatiere: string
    codeSousMatiere: string
    discipline: string
    moyenne: string
    moyenneClasse: string
    moyenneMin: string
    moyenneMax: string
    coef: number
    effectif: number
    rang: number
    groupeMatiere: boolean
    idGroupeMatiere: number
    option: number
    sousMatiere: boolean
    saisieAppreciationSSMat: boolean
    professeurs: [{ id: number; nom: string }]
}

export interface NotePeriode {
    idPeriode: string
    periode: string
    annuel: boolean
    dateDebut: string
    dateFin: string
    examenBlanc: boolean
    cloture: boolean
    dateConseil: string
    moyNbreJoursApresConseil: number
    ensembleMatieres: {
        dateCalcul: string
        moyenneGenerale: string
        moyenneClasse: string
        moyenneMin: string
        moyenneMax: string
        nomPP: string
        nomCE: string
        decisionDuConseil: string
        disciplines: NotePeriodeMater[]
    }
}

export interface NoteAppreciationSettings {
    code: string
    id: number
    nbMaxCaractere: number
    libelle: string
}

export interface Note {
    periodes: NotePeriode[]
    notes: NoteNote[]
    parametrage: NoteSettings[]
}

export interface NoteSettings {
    couleurEval1: string
    couleurEval2: string
    couleurEval3: string
    couleurEval4: string
    libelleEval1: string
    libelleEval2: string
    libelleEval3: string
    libelleEval4: string
    affichageMoyenne: boolean
    affichagePositionMatiere: boolean
    affichageNote: boolean
    affichageCompetence: boolean
    affichageEvaluationsComposantes: boolean
    affichageAppreciation: boolean
    appreciationsProf: boolean
    appreciationProfPrinc: boolean
    affichageMention: boolean
    affichageAppreciationCE: boolean
    affichageAppreciationVS: boolean
    affichageAppreciationCN: boolean
    affichageAppreciationClasse: boolean
    affichageAppreciationPeriodeCloturee: boolean
    moyenneUniquementPeriodeCloture: boolean
    moyennePeriodeReleve: boolean
    moyennePeriodeAnnuelle: boolean
    moyennePeriodeHorsP: boolean
    moyenneEleveDansNotes: boolean
    moyenneEleve: boolean
    moyenneEleveDansMoyenne: boolean
    moyenneGenerale: boolean
    moyenneCoefMatiere: boolean
    moyenneClasse: boolean
    moyenneMin: boolean
    moyenneMax: boolean
    moyenneRang: boolean
    moyenneSur: number
    moyenneGraphique: boolean
    moyennesSimulation: boolean
    coefficientNote: boolean
    colonneCoefficientMatiere: boolean
    noteGrasSousMoyenne: boolean
    noteGrasAudessusMoyenne: boolean
    libelleDevoir: boolean
    dateDevoir: boolean
    typeDevoir: boolean
    noteUniquementPeriodeCloture: boolean
    notePeriodeReleve: boolean
    notePeriodeAnnuelle: boolean
    notePeriodeHorsP: boolean
    libellesAppreciations: string[]
    appreciationsParametrage: NoteAppreciationSettings[]
}

export interface NoteResponse {
    code: number
    token: string
    host: string
    data: Note
}
