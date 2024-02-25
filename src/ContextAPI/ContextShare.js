import React, { createContext, useState } from 'react'

//context creation
export const addProjectResponseContext=createContext()

function ContextShare({children}) {
    const [addProjectRes,setAddProjectRes]=useState("")
  return (
    <>
    {/* context provider */}
    <addProjectResponseContext.Provider value={{addProjectRes,setAddProjectRes}}>
    {children}
    </addProjectResponseContext.Provider>
      
    </>
  )
}

export default ContextShare
