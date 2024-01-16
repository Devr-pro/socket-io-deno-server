import {io} from "socket.io-client"

export const socket= io('https://socket-sveltekit.deno.dev/',{
		transports:["websocket"]
	})
