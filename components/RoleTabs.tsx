import { Role, ChatMessage } from '@/lib/types'
import styles from '@/styles/RoleTabs.module.scss'

type RoleChats = Record<Role, ChatMessage[]>;
type Props = { 
    roles: Role[]; 
    value: Role; 
    onChange: (r: Role) => void;
    roleChats?: RoleChats;
}

export default function RoleTabs({ roles, value, onChange, roleChats }: Props) {
    // Функция для получения количества сообщений роли
    const getMessageCount = (role: Role) => {
        if (!roleChats) return 0;
        const messages = roleChats[role] || [];
        return messages.length;
    };
    return (
        <div className={styles.tabs}>
            {/* Кнопки для десктопа */}
            <div className={styles.tabRow}>
                {roles.map(r => {
                    const count = getMessageCount(r);
                    return (
                        <button 
                            key={r} 
                            onClick={() => onChange(r)} 
                            className={value === r ? styles.tabActive : styles.tab}
                        >
                            {r}
                            {count > 0 && <span className={styles.badge}>{count}</span>}
                        </button>
                    );
                })}
            </div>
            {/* Select для мобилки */}
            <div className={styles.selectWrap}>
                <label className="sr-only" htmlFor="role">Роль</label>
                <select id="role" value={value} onChange={e => onChange(e.target.value as Role)}>
                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
            </div>
        </div>
    )
}