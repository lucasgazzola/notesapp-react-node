import React, { Suspense } from 'react'

const Header = React.lazy(() => import('../components/Header'))
const Modal = React.lazy(() => import('../components/Modal'))
const NotesList = React.lazy(() => import('../components/NotesList'))

export default function Home() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Modal />
        <NotesList />
      </Suspense>
    </div>
  )
}
