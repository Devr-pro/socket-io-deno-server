<script lang="ts">
    import { browser } from "$app/environment";
    import { socket } from "$lib/socket";

    $: chatid = "...";
    socket.on("connect", () => {
        console.log(`Connected to ${socket.id}`);
        chatid = socket.id;
    });
    let msg = browser ? document.getElementById("chat-box") : null;

    socket.on("chatMsg", (data: string | null) => {
        let newMsg = document.createElement("li");
        newMsg.classList.add("text-neutral-600", "text-lg", "bg-gray-300","rounded-lg");
        newMsg.textContent = `${data}`;

        msg?.appendChild(newMsg);
        msg?.scrollTo(0, msg.scrollHeight);
    });

    let emitter = (data: string) => {
        socket.emit("chatMsg", data);

        let newMsg = document.createElement("li");
        newMsg.classList.add("text-neutral-400", "text-lg");
        newMsg.textContent = `${data} [${socket.id}]`;

        msg?.appendChild(newMsg);

        msg?.scrollTo(0, msg.scrollHeight);
    };
</script>

<main class="bg-gray-800 h-dvh w-full flex justify-center items-center">
    <h1 class="absolute text-gray-300 top-1">
        Your chat id is : {chatid}
    </h1>
    <div
        class="relative flex flex-col overflow-y-auto min-w-[70%] max-w-[85%] bg-gray-900 h-[75%] text-stone-500 rounded-xl"
    >
        <ul id="chat-box" class="my-4 break-words"></ul>

        <input
            type="text"
            on:keypress={({ key, target }) => {
                if (key != "Enter") return;

                //@ts-expect-error
                emitter(target?.value);
                //@ts-expect-error
                target.value=''
            }}
            class="absolute bottom-1 w-[90%] self-center bg-zinc-600 text-stone-300 p-3 rounded-lg"
        />
    </div>
</main>
