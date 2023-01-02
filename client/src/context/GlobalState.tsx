import React, { createContext, useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import { LOGOUT_USER } from '../mutations/userMutations'




interface AppContextInterface {
  first_name?: string;
  last_name?: string;
  authenticated: boolean;
  test?: string | null | undefined,
  setAuthenticated?: (value: boolean) => void,
  logout?: () => void
}

export const GlobalContext = createContext<AppContextInterface | null>(null);

// Provider in your app

type GlobalContextProviderProps = {
    children: React.ReactNode
}

interface authContextProps {
  children: React.ReactNode
}

export const GlobalProvider : React.FC<authContextProps> = ({ children }) => {  


  const [test, setTest] = useState<string | null | undefined>("okidoki")
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  const [logoutUser, {error, data }] = useMutation(LOGOUT_USER); 

  const logout = async () => {

    
    const res = await logoutUser();
    console.log(res)
    if (res.data.logout.success) {
      setAuthenticated(false)
    }
  }

    return  (
      <GlobalContext.Provider 
        value={{ authenticated: authenticated, setAuthenticated, test: test, logout }}> 
        {children} 
      </GlobalContext.Provider>
    )

}