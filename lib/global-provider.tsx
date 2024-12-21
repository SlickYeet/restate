import { createContext, useContext, type ReactNode } from "react"

import { useAppwrite } from "@/lib/use-appwrite"
import { getCurrentUser } from "@/lib/appwrite"

type User = {
  $id: string
  name: string
  email: string
  avatar: string
}

type GlobalContextType = {
  isLoggedIn: boolean
  user: User | null
  loading: boolean
  refetch: (newParams?: Record<string, string | number>) => Promise<void>
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user = null,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  })

  const isLoggedIn = !!user

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider")
  }

  return context
}
