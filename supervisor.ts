import { State } from "./state.js";
import { z } from "zod";
import { ai } from "./google_genai.js";

const routingTool = {
    name: "routingTool",
    description: "Selecione o próximo estado",
    schema: z.object({
        next: z.enum(["financial_specialist", "scheduling_specialist", "comms_specialist", "END"])
    })
}

export const supervisor = async (state: typeof State.State) => {
    console.log("Supervisor escolhendo o próximo")

    const aiWithTool = ai.bindTools([routingTool], {
        tool_choice: "routingTool"
    });

    const aiResponse = await aiWithTool.invoke("Quero ver as minhas contas. Escolha um desses próximos estados: financial_specialist, scheduling_specialist, comms_specialist, END. Retorne apenas o nome do especialista e nada mais. ")


    if (aiResponse.tool_calls) {
        return { 
            nexNode: aiResponse.tool_calls[0]?.args.next
         } 
    } else {
        return {
            nextNode: "END"
        }
    }
}