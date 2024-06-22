import { USERPROPS } from '../interfaces/users';

export function getImage(name: string) {
  if (name.includes('Eduarda')) {
    return 'users/eduarda.jpeg'
  }

  if (name.includes('Gabriel')) {
    return 'users/gabriel.jpeg'
  }

  if (name.includes('Davi')) {
    return 'users/davi.jpeg'
  }

  if (name.includes('Raphael')) {
    return 'users/raphael.jpeg'
  }
}

export function Table({ users, handelDetails }: {
  users: USERPROPS[],
  handelDetails(user: USERPROPS): void
}) {
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
                <th>

                  Nome
                </th>
                <th>Pontos</th>

              </tr>
            </thead>
            <tbody>
              {
                users.map(user => {
                  return (
                    <tr key={user.userId} onClick={() => { handelDetails(user) }}>
                      <td>
                        <div className='avatar-container'>
                          <img src={getImage(user.userName)} alt="" />
                          {user.userName}
                        </div>
                      </td>
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