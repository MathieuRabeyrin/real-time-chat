document.addEventListener("DOMContentLoaded", ()=> {
    const input = document.querySelector("input");
    const btn = document.querySelector("button");
    const ul = document.querySelector("ul");
    let userName = "";
    let socket = io();

    let setUsername = async()=> {
        userName = await prompt("Saisir votre pseudo");
    }

    let writeInput = (author, text)=> {
        const ul = document.querySelector("ul");

        ul.appendChild(document.createElement("li"));
        ul.lastChild.innerText = `${author}: ${text}`;
    }

    btn.addEventListener("click", ()=> {
        socket.emit("newMessage", ({ username: userName, content: input.value, author_id: socket.id }));
        writeInput(userName, input.value);
        console.log(userName);
        input.value = "";
    })

    input.addEventListener("keydown", (e)=> {
        if (e.keyCode == 13) {
            console.log(userName);
            socket.emit("newMessage", ({ username: userName, content: input.value, author_id: socket.id }));
            writeInput(userName, input.value);
            input.value = "";
        }
    })

    socket.on("updateFeed", (data)=> {
        writeInput(data.username, data.content);
    })

    setUsername();
})