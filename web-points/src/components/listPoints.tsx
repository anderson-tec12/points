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

  useEffect(() => {
    (async () => {
      const response = await api.getPointsByUser(user.userId)

      setPoints(response.data.points)
    })()
  }, [user])

  return (
    <section className='details-container'>
      <span className='header'>{user.userName}</span>

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