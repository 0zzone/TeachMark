export interface HomeworkDescription {
    [date: string]: [{
        matiere: string
        codeMatiere: string
        aFaire: boolean
        idDevoir: number
        documentsAFaire: boolean
        donneLe: string
        effectue: boolean
        interrogation: boolean
        rendreEnLigne: boolean
    }]
}

export interface Homework {
    code: number
    token: string
    host: string
    data: Array<HomeworkDescription[]>
}
