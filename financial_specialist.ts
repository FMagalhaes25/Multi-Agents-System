import { AIMessage } from "@langchain/core/messages"
import { State } from "./state.js"

export const financialSpecialist = (state: typeof State.State) => {
    console.log("Financial Specialist chamado")
    return {
        messages: [new AIMessage("Aqui está sua conta: 300 reais")]
    }
}