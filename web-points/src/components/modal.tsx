import React, { useState } from 'react';
import { USERPROPS } from '../interfaces/users';
import { getImage } from './table';
import { api } from '../services/api';


export function Modal({ users, outerView }: { users: USERPROPS[], outerView(): void }) {
  const [userSelect, setUserSelect] = useState<USERPROPS>(users[0])
  const [description, setDescription] = useState<string>('')
  const [value, setValue] = useState(1)

  function handle_select_user({ target }: React.ChangeEvent<HTMLSelectElement>) {

    const user = users.find(u => u.userId === target.value)
    setUserSelect(user!)
  }

  async function handle_save() {
    const payload = {
      "description": description,
      "userId": userSelect.userId,
      "value": value
    }



    await api.addPoint(payload)
    outerView()
  }

  return (
    <article className='modal-container'>
      <div className='avatar'>
        <img src={getImage(userSelect.userName)} alt="" />
      </div>

      <div className='separ'>
        <select value={userSelect.userId} onChange={handle_select_user}>
          {users.map(user => (
            <option key={user.userId} value={user.userId}>{user.userName}</option>
          ))}
        </select>
      </div>

      <div className='separ'>
        <textarea
          placeholder='Motivo'
          onChange={e => setDescription(e.target.value)}
          value={description}
        >
          {description}
        </textarea>
      </div>

      <div className='separ'>
        <input type="number" max="10" placeholder='Pontos' value={value} onChange={e => setValue(+e.target.value)} />
      </div>

      <div className='separ off'>
        <button className='cancel' onClick={outerView}>Cancelar</button>
        <button type="submit" onClick={handle_save}>Cadastrar</button>
      </div>

    </article>
  )
}