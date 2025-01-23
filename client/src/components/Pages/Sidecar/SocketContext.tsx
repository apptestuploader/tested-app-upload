import { createContext } from "react"

const SocketContext = createContext<WebSocket | null>(null)

export default SocketContext
