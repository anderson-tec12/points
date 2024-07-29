import { useEffect, useState } from 'react';
import { USERPROPS } from '../interfaces/users';
import '../styles/details.css'
import { api } from '../services/api';

interface IPOINTS {
  id: string
  message: string,
  month: string,
  value: number
}

export function ListPoints({ user, outerView }: { user: USERPROPS, outerView(): void }) {
  const [points, setPoints] = useState<IPOINTS[]>([])
  const [month, setMonth] = useState(() => {
    const date = new Date()
    return String(date.getMonth() + 1).padStart(2, '0')
  })

  useEffect(() => {
    (async () => {
      const response = await api.getPointsByUser(user.userId, month)

      setPoints(response.data.points)
    })()
  }, [user, month])

  return (
    <section className='details-container'>
      <div className='header'>
        <span>{user.userName}</span>

        <div className='header-filter'>
          <select name="" id="" value={month} onChange={e => setMonth(e.target.value)}>
            <option value="01">Janeiro</option>
            <option value="02">Fevereiro</option>
            <option value="03">Março</option>
            <option value="04">Abril</option>
            <option value="05">Maio</option>
            <option value="06">Junho</option>
            <option value="07">Julho</option>
            <option value="08">Agosto</option>
            <option value="09">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dexembro</option>
          </select>
        </div>
      </div>

      <main>
        <table>
          <thead>
            <tr>
              <th>
                Motivo
              </th>
              <th>Pontos</th>

            </tr>
          </thead>

          <tbody>
            {
              points.map(p => (
                <tr key={p.id} >
                  <td>{p.message}</td>
                  <td className={p.value < 0 ? 'red' : 'green'}>{p.value}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </main>

      <footer>
        <button type="button" onClick={outerView}>Voltar</button>
      </footer>
    </section>
  )
}