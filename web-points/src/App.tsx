import { useEffect, useState } from 'react'
import { AddPoint } from './components/addpoint'
import { Header } from './components/header'
import { Table } from './components/table'
import { api } from './services/api'

import './styles/reset.css'
import './styles/modal.css'

import { USERPROPS } from './interfaces/users'
import { Modal } from './components/modal'
import { ListPoints } from './components/listPoints'


function App() {
  const [users, setUsers] = useState<USERPROPS[]>([])
  const [page, setPage] = useState<'list' | 'modal' | 'details'>('list')

  const [userActived, setUserActived] = useState<USERPROPS>({
    total: 0,
    userId: '',
    userName: ''
  })


  function handleToPageList(user: USERPROPS) {
    setUserActived(user)
    setPage('details')
  }

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


  if (page === 'details') {
    return <ListPoints user={userActived} outerView={() => { setPage('list') }} />
  }

  return (

    <main>
      <Header />
      <Table users={users} handelDetails={handleToPageList} />
      <AddPoint outerView={() => { setPage('modal') }} />
    </main>
  )
}

export default App
