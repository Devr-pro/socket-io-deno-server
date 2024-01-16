import { browser, dev } from "$app/environment"
import {io} from "socket.io-client"

export const socket= io(dev&&browser?'https://refactored-space-goldfish-6qj5769r7624r4j-3000.app.github.dev/':'https://share-clam-70.deno.dev/',{
		transports:["websocket"]
	})