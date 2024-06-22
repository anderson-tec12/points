import React, { useState } from 'react';
import { USERPROPS } from '../interfaces/users';
import { getImage } from './table';
import { api } from '../services/api';


export function Modal({ users, outerView }: { users: USERPROPS[], outerView(): void }) {
  const [userSelect, setUserSelect] = useState<USERPROPS>(users[0])
  const [description, setDescription] = useState<string>('')
  const [value, setValue] = useState(1)

  const [isRequest, setRequest] = useState(false)

  function handle_select_user({ target }: React.ChangeEvent<HTMLSelectElement>) {

    const user = users.find(u => u.userId === target.value)
    setUserSelect(user!)
  }

  async function handle_save() {
    setRequest(true)
    const payload = {
      "description": description,
      "userId": userSelect.userId,
      "value": value
    }


    if (!payload.description) {
      alert('Informe o motivo do ponto')
      setRequest(false)
      return
    }

    if (payload.value === 0) {
      alert('Não é possivel salvar 0 pontos')
      setRequest(false)
      return
    }


    await api.addPoint(payload)
    setRequest(false)
    outerView()
  }


  function addPoint() {

    if (value === 5) return
    setValue(value + 1)
  }

  function minusPoint() {
    if (value === -10) return
    setValue(value - 1)
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
        <button type="button" onClick={minusPoint}>-</button>
        <input type="number" disabled max="10" placeholder='Pontos' value={value} onChange={e => setValue(+e.target.value)} />
        <button type="button" onClick={addPoint}>+</button>
      </div>

      <div className='separ off'>
        <button className='cancel' onClick={outerView}>Cancelar</button>
        <button type="submit" onClick={handle_save} disabled={isRequest}>
          {isRequest ? 'Salvando...' : 'Cadastrar'}
        </button>
      </div>

    </article>
  )
}