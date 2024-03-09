import React, { createContext, useState } from 'react'

//context creation
export const addProjectResponseContext=createContext()
export const EditUserProjectResponseContext = createContext()
export const DeleteUserProjectResponseContext = createContext()

function ContextShare({children}) {
    const [addProjectRes,setAddProjectRes]=useState("")
    const[editUserProjectRes,setEditUserProjectRes]=useState("")
    const[deleteUserProjectRes,setDeleteUserProjectRes]=useState("")
  return (
    <>
    {/* context provider */}
    <addProjectResponseContext.Provider value={{addProjectRes,setAddProjectRes}}>
      <EditUserProjectResponseContext.Provider value={{editUserProjectRes,setEditUserProjectRes}}>
        <DeleteUserProjectResponseContext.Provider value={{deleteUserProjectRes,setDeleteUserProjectRes}}>
        {children}

        </DeleteUserProjectResponseContext.Provider>
      </EditUserProjectResponseContext.Provider>
    </addProjectResponseContext.Provider>
      
    </>
  )
}

export default ContextShare
