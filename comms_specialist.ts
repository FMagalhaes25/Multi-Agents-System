import { AIMessage } from "@langchain/core/messages"
import { State } from "./state.js"

export const commsSpecialist = (state: typeof State.State) => {
    console.log("Comms Specialist chamado")
    return {
        executedNodes: 1,
        output: [new AIMessage("olá da IA")]
    }
}