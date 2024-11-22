import { io, Socket } from "socket.io-client";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL;
const WS_PORT = process.env.NEXT_PUBLIC_WS_PORT;

export const socket: Socket = io(`${WS_URL}:${WS_PORT}`, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});
