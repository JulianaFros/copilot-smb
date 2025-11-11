import { NextResponse } from 'next/server'


export async function POST(req: Request) {
    const { role, message } = await req.json()
    // Имитация ответа LLM
    const answer = `(${role}) Эхо-ответ: ${message}`
    return NextResponse.json({ role, answer })
}