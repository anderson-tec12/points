import { useEffect, useState } from 'react'
import { AddPoint } from './components/addpoint'
import { Header } from './components/header'
import { Table } from './components/table'
import { api } from './services/api'

import './styles/reset.css'
import { USERPROPS } from './interfaces/users'


function App() {
  const [users, setUsers] = useState<USERPROPS[]>([])

  useEffect(() => {
    (async () => {
      const response = await api.getResume()

      setUsers(response.data.resumeFormatted)
    })()
  }, [])
  return (
    <main>
      <Header />
      <Table users={users} />
      <AddPoint />
    </main>
  )
}

export default App
