export type Role = 'Маркетинг' | 'Юрист' | 'Бухгалтер' | 'HR' | 'Общий помощник'
export const ROLES: Role[] = ['Маркетинг', 'Юрист', 'Бухгалтер', 'HR', 'Общий помощник']


export interface ChatMessage {
    id: string
    from: 'user' | 'assistant'
    text: string
    role: Role
    ts: number
}