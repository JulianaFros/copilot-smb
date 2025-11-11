import { ChatMessage } from '@/lib/types'
import styles from '@/styles/MessageBubble.module.scss'


export default function MessageBubble({ msg }: { msg: ChatMessage }) {
    const isUser = msg.from === 'user'
    return (
        <div className={styles.wrap}>
            <div className={isUser ? styles.rowUser : styles.rowAssistant}>
                <div className={isUser ? styles.bubbleUser : styles.bubbleAssistant}>
                    {!isUser && <div className={styles.role}>{msg.role}</div>}
                    <div className={styles.text}>{msg.text}</div>
                    <div className={isUser ? styles.timeUser : styles.timeAssistant}>
                        {new Date(msg.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
            </div>
        </div>
    )
}