import { USERPROPS } from '../interfaces/users';

export function Table({ users }: { users: USERPROPS[] }) {
  return (
    <>
      <h2 className='title'>Resumo da pontuação</h2>
      <div className='container'>

        <div className='card'>
          <table className='table'>
            <thead>
              <tr>
                <td colSpan={3} className='month-header'>Junho</td>
              </tr>
              <tr>
                <th>Nome</th>
                <th>Pontos</th>

              </tr>
            </thead>
            <tbody>
              {
                users.map(user => {
                  return (
                    <tr key={user.userId}>
                      <td>{user.userName}</td>
                      <td className='td-point'>
                        <div className='container-point'>
                          <span className='points'>{user.total}</span>
                        </div>
                      </td>

                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}