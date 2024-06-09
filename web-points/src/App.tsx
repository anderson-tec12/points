import { useEffect, useState } from 'react'
import { AddPoint } from './components/addpoint'
import { Header } from './components/header'
import { Table } from './components/table'
import { api } from './services/api'

import './styles/reset.css'
import './styles/modal.css'

import { USERPROPS } from './interfaces/users'
import { Modal } from './components/modal'


function App() {
  const [users, setUsers] = useState<USERPROPS[]>([])
  const [page, setPage] = useState<'list' | 'modal'>('list')

  useEffect(() => {
    (async () => {
      const response = await api.getResume()

      setUsers(response.data.resumeFormatted)
    })()
  }, [page])

  if (page === 'modal') {
    return (
      <Modal users={users} outerView={() => { setPage('list') }} />
    )
  }

  return (

    <main>
      <Header />
      <Table users={users} />
      <AddPoint outerView={() => { setPage('modal') }} />
    </main>
  )
}

export default App
