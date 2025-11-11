import { Role } from '@/lib/types'


export default function TypingIndicator({ role }: { role: Role }) {
    return (
        <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ maxWidth: '85%', border: '1px solid #e5e7eb', background: '#fff', borderRadius: 16, borderBottomLeftRadius: 6, boxShadow: '0 1px 2px rgba(0,0,0,0.04)', padding: '10px 12px' }}>
                    <div style={{ marginBottom: 4, fontSize: 10, letterSpacing: 0.6, color: '#6b7280', textTransform: 'uppercase' }}>{role}</div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#6b7280' }}>
                        <span>Печатает</span>
                        <span className="typing-dots">
                            <span className="dot" />
                            <span className="dot" />
                            <span className="dot" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}