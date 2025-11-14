import { NextResponse } from 'next/server'

const LLM_URL = 'http://localhost:8081/request';

export async function POST(req: Request) {
    const body = await req.json();

    const {
        role,
        message,
        userId,
        sessionId,
        assistant,
        userName,
        history,
    } = body;

    const answer = `(${assistant ?? role}) [userId=${userId}, sessionId=${sessionId}] Эхо-ответ: ${message}`;

    const llmResponse = await fetch(LLM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId,
            sessionId,
            assistant,
            userName,
            message,
            history,
        }),
    });

    const llmData = await llmResponse.json();

    return NextResponse.json({
        role,
        answer,
        userId,
        sessionId,
        assistant,
        userName,
    });
}
