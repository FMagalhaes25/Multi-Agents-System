import { AIMessage } from "@langchain/core/messages"
import { State } from "./state.js"

export const commsSpecialist = (state: typeof State.State) => {
    console.log("Comms Specialist chamado")
    return {
        messages: [new AIMessage("olá da IA")]
    }
}