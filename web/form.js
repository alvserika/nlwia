import { server } from "./server.js"
const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    content.classList.add("placeholder")

    const videoURL = input.value
    //console.log("URL DO VÍDEO: ", videoURL)

    if (!videoURL.includes("shorts")) {
        return (content.textContent = "Esse vídeo não parece ser um shorts!")
    }

    const [_, params] = videoURL.split("/shorts/")
    const [videoID] = params.split("?si")
    
    content.textContent = "Obtendo o texto do audio..."

   const transcription = await server.get("/summary/" + videoID) //requisição onde passa o id do video e ele devolve a transcrição do áudio

    content.textContent = "Realizando o resumo..."

    const summary = await server.post("/summary", {
      text: transcription.data.result,  
    }) 

    content.textContent = summary.data.result
    content.classList.remove("placeholder")
})