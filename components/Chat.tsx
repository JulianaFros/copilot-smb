'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChatMessage, Role, ROLES } from '@/lib/types';
import { uid } from '@/lib/uid';
import { useLocalStorage } from '@/lib/storage';
import RoleTabs from './RoleTabs';
import styles from '../styles/Chat.module.scss';

const STORAGE_CHATS = 'smb-copilot-chats-v2';
const STORAGE_ROLE = 'smb-copilot-role-v1';

const STORAGE_USER_ID = 'smb-copilot-user-id';
const STORAGE_SESSION_ID = 'smb-copilot-session-id';

const ASSISTANT_BY_ROLE: Record<Role, string> = {
    'Маркетолог': 'MARKETING',
    'Юрист': 'LEGAL',
    'Бухгалтер': 'ACCOUNTING',
    'HR': 'HR',
    'Общий помощник': 'DEFAULT',
};

// Тип для хранения чатов по ролям
type RoleChats = Record<Role, ChatMessage[]>;

export default function Chat() {
    const [activeRole, setActiveRole] = useLocalStorage<Role>(STORAGE_ROLE, 'Общий помощник');
    const [roleChats, setRoleChats] = useLocalStorage<RoleChats>(STORAGE_CHATS, {} as RoleChats);
    const [userId] = useLocalStorage<string>(STORAGE_USER_ID, uid());
    const [sessionId, setSessionId] = useLocalStorage<string>(STORAGE_SESSION_ID, uid());
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const listRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    useEffect(() => {
        setSessionId(uid());
    }, [activeRole, setSessionId]);


    const messages = roleChats[activeRole] || [];

    useEffect(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages, loading]);

    const historyForApi = useMemo(
        () => messages.slice(-20).map(m => ({ role: m.from, content: m.text })),
        [messages]
    );

    async function sendMessage(e?: React.FormEvent) {
        e?.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || loading) return;

        const userMsg: ChatMessage = { id: uid(), from: 'user', text: trimmed, role: activeRole, ts: Date.now() };

        setRoleChats(prev => ({
            ...prev,
            [activeRole]: [...(prev[activeRole] || []), userMsg]
        }));

        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    sessionId,
                    assistant: ASSISTANT_BY_ROLE[activeRole],
                    userName: 'default',
                    role: activeRole,
                    message: trimmed,
                    history: historyForApi,
                }),
            });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const data = await res.json();
            const assistantMsg: ChatMessage = {
                id: uid(),
                from: 'assistant',
                text: typeof data?.answer === 'string' ? data.answer : '(пустой ответ)',
                role: (data?.role as Role) || activeRole,
                ts: Date.now()
            };

            // Добавляем ответ ассистента в чат текущей роли
            setRoleChats(prev => ({
                ...prev,
                [activeRole]: [...(prev[activeRole] || []), assistantMsg]
            }));
        } catch {
            const errorMsg: ChatMessage = {
                id: uid(),
                from: 'assistant',
                text: 'Не удалось связаться с backend. Проверьте /api/query.',
                role: activeRole,
                ts: Date.now()
            };

            setRoleChats(prev => ({
                ...prev,
                [activeRole]: [...(prev[activeRole] || []), errorMsg]
            }));
        } finally {
            setLoading(false);
            inputRef.current?.focus();
        }
    }

    function clearChat() {
        // Очищаем только чат текущей активной роли
        setRoleChats(prev => ({
            ...prev,
            [activeRole]: []
        }));
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <div className={styles.brand}>
                    <div className={styles.brandMark}>A</div>
                    <div className={styles.brandText}>
                        <div className={styles.brandTitle}>Copilot-app от Альфа-Банк</div>
                        <div className={styles.brandSub}>чат-ассистент для Вашего бизнеса</div>
                    </div>
                </div>
                <button className={styles.clearBtn} onClick={clearChat}>
                    Очистить
                </button>
            </header>

            <div className={styles.roleBar}>
                <RoleTabs roles={ROLES} value={activeRole} onChange={setActiveRole} roleChats={roleChats} />
            </div>

            <main className={styles.main}>
                <div ref={listRef} className={styles.list}>
                    {messages.map(m => (
                        <div key={m.id} className={m.from === 'user' ? styles.messageUser : styles.messageAssistant}>
                            {m.text}
                        </div>
                    ))}
                </div>
            </main>

            <div className={styles.composerWrap}>
                <form className={styles.composer} onSubmit={sendMessage}>
                    <div className={styles.inputWrap}>
                        <textarea
                            ref={inputRef}
                            className={styles.textarea}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={`Спросить как ${activeRole.toLowerCase()}…`}
                            rows={1}
                        />
                        <div className={styles.hint}>Enter для отправки, Shift+Enter для новой строки</div>
                    </div>
                    <button className={styles.sendBtn} type="submit" disabled={!input.trim() || loading}>
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    );
}
