import { Role } from '@/lib/types'
import styles from '@/styles/RoleTabs.module.scss'


type Props = { roles: Role[]; value: Role; onChange: (r: Role) => void }
export default function RoleTabs({ roles, value, onChange }: Props) {
    return (
        <div className={styles.tabs}>
            {/* Кнопки для десктопа */}
            <div className={styles.tabRow}>
                {roles.map(r => (
                    <button key={r} onClick={() => onChange(r)} className={value === r ? styles.tabActive : styles.tab}>{r}</button>
                ))}
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