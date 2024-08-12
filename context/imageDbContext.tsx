import { createContext } from "react"
import { getStorage } from "firebase/storage"
export const imageDBContext = createContext<any | null>(null)