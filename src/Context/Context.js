import React,{ createContext, useState } from "react";

export const DataContext = createContext()

export const DataProvider = ({ children }) => {

    const [dataLogin, setdataLogin] = useState('')
    const [repoNames, setRepoNames] = useState([])
    

     
  return(
      <DataContext.Provider value={{
        dataLogin,
        setdataLogin,
        setRepoNames,
        repoNames, 
        
      }}>
          {children}
      </DataContext.Provider>
  )
}