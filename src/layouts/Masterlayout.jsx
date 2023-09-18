import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header/Header'

const Masterlayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Masterlayout