import { NextResponse } from 'next/server'

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

    return NextResponse.json({
        role,
        answer,
        userId,
        sessionId,
        assistant,
        userName,
    });
}
