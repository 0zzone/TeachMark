export interface Cloud {
    type: string
    libelle: string
    date: string
    taille: number
    quota: number
    id: string
    isLoaded: boolean
    children: Array<unknown>
}

export interface CloudResponse {
    code: number
    token: string
    host: string
    data: Cloud[]
}
