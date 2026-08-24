import { AIMessage } from "@langchain/core/messages"
import { State } from "./state.js"

export const schedulingSpecialist = (state: typeof State.State) => {
    console.log("Scheduling Specialist chamado")
    return {
        executedNodes: 1,
        output: [new AIMessage("olá da IA")]
    }
}