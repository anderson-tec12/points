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

  function nameMoth() {
    const month = new Date().getMonth() + 1

    switch (month) {
      case 1: {
        return 'Janeiro'
      }

      case 2: {
        return 'Fevereiro'
      }

      case 3: {
        return 'Março'
      }

      case 4: {
        return 'Abril'
      }

      case 5: {
        return 'maio'
      }

      case 6: {
        return 'Junho'
      }

      case 7: {
        return 'Julho'
      }

      case 8: {
        return 'Agosto'
      }

      case 9: {
        return 'Setembro'
      }

      case 10: {
        return 'Outubro'
      }

      case 11: {
        return 'Novembro'
      }

      case 12: {
        return 'Dexembro'
      }

      default: {
        return 'NONE'
      }
    }
  }

  return (
    <>
      <h2 className='title'>Resumo da pontuação</h2>
      <div className='container'>

        <div className='card'>
          <table className='table'>
            <thead>
              <tr>
                <td colSpan={3} className='month-header'>
                  {nameMoth()}
                </td>
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