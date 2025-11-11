import { Role } from '@/lib/types'
import styles from '@/styles/EmptyState.module.scss'


export default function EmptyState({ role }: { role: Role }) {
    return (
        <div className={styles.wrap}>
            <div className={styles.card}>
                <div className={styles.icon}>i</div>
                <h2>Начните диалог</h2>
                <p>Выбрана роль: <strong>{role}</strong>. Примеры запросов:</p>
                <ul>
                    {role === 'Маркетолог' && (<>
                        <li>• Придумай оффер для лендинга бухгалтерских услуг</li>
                        <li>• Составь контент-план на неделю</li>
                    </>)}
                    {role === 'Юрист' && (<>
                        <li>• Проверь пункт договора о неустойке</li>
                        <li>• Объясни риски при работе с ИП</li>
                    </>)}
                    {role === 'Бухгалтер' && (<>
                        <li>• Как учитывать предоплату в УСН?</li>
                        <li>• Список документов к закрытию месяца</li>
                    </>)}
                    {role === 'HR' && (<>
                        <li>• Джоб-дескрипшен менеджера по продажам</li>
                        <li>• План онбординга на 2 недели</li>
                    </>)}
                    {role === 'Общий помощник' && (<>
                        <li>• Письмо клиенту о переносе встречи</li>
                        <li>• Расставь приоритеты задач</li>
                    </>)}
                </ul>
            </div>
        </div>
    )
}