import axios from "axios"
import { Message, MessageResponse } from "../typings/Message"
import { Timeline, TimelineResponse } from "../typings/Timeline"
import { Note, NoteResponse } from "../typings/Note"
import { Account } from "../typings/Account"
import { Cloud, CloudResponse } from "../typings/Cloud"
import { Sanction, SanctionResponse } from "../typings/Sanctions"
import { ClassLife, ClassLifeResponse } from "../typings/ClassLife"
import { HomeworkDescription, Homework } from "../typings/Homework"
import { Document, DocumentResponse } from "../typings/Documents"

async function getMessages(token: string, accountID: number): Promise<Message | null> {
    try {
        const data = `data={"token": "${token}"}`,
            result: MessageResponse = await axios.post(
                `https://api.ecoledirecte.com/v3/eleves/${accountID}/messages.awp?verbe=getall&typeRecuperation=received&orderBy=date&order=desc&page=0&itemsPerPage=20&onlyRead=&query=&idClasseur=0`,
                data
            )
        return result.data
    } catch {
        return null
    }
}

async function getTimeline(token: string, accountID: number): Promise<Timeline[] | null> {
    try {
        const date = new Date().toISOString().split("T")[0],
            data = `data={"dateDebut": "${date}", "dateFin": "${date}", "avecTrous": "false", "token": "${token}"}`,
            result: TimelineResponse = await axios.post(
                `https://api.ecoledirecte.com/v3/E/${accountID}/emploidutemps.awp?verbe=get&`,
                data
            )
        return result.data
    } catch {
        return null
    }
}

async function getNotes(token: string, accountID: number): Promise<Note | null> {
    try {
        const data = `data={"token": "${token}"}`,
            result: NoteResponse = await axios.post(
                `https://api.ecoledirecte.com/v3/eleves/${accountID}/notes.awp?verbe=get&`,
                data
            )
        return result.data
    } catch {
        return null
    }
}

async function accounts(username: string, password: string): Promise<Account[] | null> {
    const data = `data={"identifiant": "${username}", "motdepasse": "${password}"}`
    try {
        const response = await axios.post(
            "https://api.ecoledirecte.com/v3/login.awp",
            data
        )
        return response.data.data.accounts
    } catch {
        return null
    }
}

async function login(username: string, password: string): Promise<string | null> {
    const data = `data={"identifiant": "${username}", "motdepasse": "${password}"}`
    try {
        const response = await axios.post(
            "https://api.ecoledirecte.com/v3/login.awp",
            data
        )
        return response.data.token
    } catch {
        return null
    }
}

async function getCloud(token: string, accountID: number): Promise<Cloud[] | null> {
    const data = `data={"token": "${token}"}`
    try {
        const response: CloudResponse = await axios.post(
            `https://api.ecoledirecte.com/v3/cloud/E/${accountID}.awp?verbe=get&`,
            data
        )
        return response.data
    } catch {
        return null
    }
}

async function getSanctions(token: string, accountID: number): Promise<Sanction | null> {
    const data = `data={"token": "${token}"}`
    try {
        const response: SanctionResponse = await axios.post(
            `https://api.ecoledirecte.com/v3/eleves/${accountID}/viescolaire.awp?verbe=get&`,
            data
        )
        return response.data
    } catch {
        return null
    }
}

async function getClassLife(token: string, classID: number): Promise<ClassLife | null> {
    const data = `data={"token": "${token}"}`
    try {
        const response: ClassLifeResponse = await axios.post(
            `https://api.ecoledirecte.com/v3/Classes/${classID}/viedelaclasse.awp?verbe=get&`,
            data
        )
        return response.data
    } catch {
        return null
    }
}

async function getHomeworks(token: string, accountID: number): Promise<Array<HomeworkDescription[]> | null> {
    const data = `data={"token": "${token}"}`
    try {
        const response: Homework = await axios.post(
            `https://api.ecoledirecte.com/v3/Eleves/${accountID}/cahierdetexte.awp?verbe=get&`,
            data
        )
        return response.data
    } catch {
        return null
    }
}

async function getDocuments(token: string): Promise<Document | null> {
    const data = `data={"token": "${token}"}`
    try {
        const response: DocumentResponse = await axios.post(
            `https://api.ecoledirecte.com/v3/elevesDocuments.awp?verbe=get&`,
            data
        )
        return response.data
    } catch {
        return null
    }
}

function getClassId(account: Account): number {
    return account.profile.classe.id
}

export = {
    login,
    getTimeline,
    getMessages,
    getNotes,
    getCloud,
    getClassId,
    getClassLife,
    getSanctions,
    getHomeworks,
    getDocuments,
    accounts
}
