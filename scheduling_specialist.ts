import { AIMessage } from "@langchain/core/messages"
import { State } from "./state.js"

export const schedulingSpecialist = (state: typeof State.State) => {
    console.log("Scheduling Specialist chamado")
    return {
        messages: [new AIMessage("olá da IA")]
    }
}