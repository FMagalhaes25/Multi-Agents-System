import { Annotation, StateGraph, START, END } from "@langchain/langgraph";
import { BaseMessage, AIMessage, HumanMessage } from "@langchain/core/messages";
import fs from "fs";

const State = Annotation.Root({
    input: Annotation<HumanMessage>,
    executedNodes: Annotation<number>({
        reducer: (currExecuted, newOutput) => currExecuted + 1,
        default: () => 0
    }),
    output: Annotation<BaseMessage[]>({
        reducer: (currOutput, newOutput) => currOutput.concat(newOutput),
        default: () => []
    }),
    outAgente1: Annotation<string>
});

const supervisor = (state: typeof State.State) => {
    console.log("Supervisor escolhendo")
    return {
        output: [new AIMessage("olá da IA")]
    }
}

const financialSpecialist = (state: typeof State.State) => {
    console.log("Financial Specialist chamado")
    return {
        executedNodes: 1,
        output: [new AIMessage("olá da IA")]
    }
}

const schedulingSpecialist = (state: typeof State.State) => {
    console.log("Scheduling Specialist chamado")
    return {
        executedNodes: 1,
        output: [new AIMessage("olá da IA")]
    }
}

const commsSpecialist = (state: typeof State.State) => {
    console.log("Comms Specialist chamado")
    return {
        executedNodes: 1,
        output: [new AIMessage("olá da IA")]
    }
}


// supervisor
// financial_specialist
// scheduling_specialist
// comms_specialist

const graph = new StateGraph(State)
    .addNode("supervisor", supervisor)
    .addNode("financial_specialist", financialSpecialist)
    .addNode("scheduling_specialist", schedulingSpecialist)
    .addNode("comms_specialist", commsSpecialist)
    .addEdge(START, "supervisor")
    .addConditionalEdges("supervisor", (state: typeof State.State) => {
        if(state.executedNodes == 0) {
            return "financial_specialist"
        } else if (state.executedNodes == 1) {
            return "scheduling_specialist"
        }
        else if (state.executedNodes == 2) {
            return "comms_specialist"
        }
        else {
            return "END"
        }
        
    })
    .addEdge("financial_specialist", "supervisor")
    .addEdge("scheduling_specialist", "supervisor")
    .addEdge("comms_specialist", "supervisor")
    .addEdge("supervisor", END)
    .compile();

const result = await graph.invoke({ input: new HumanMessage("Olá!")});

console.log(result);

const drawableGraph = await graph.getGraphAsync();
const graphImage = await drawableGraph.drawMermaidPng();
const graphArrayBuffer = await graphImage.arrayBuffer();

fs.writeFileSync("graph.png", new Uint8Array(graphArrayBuffer))

//console.log(drawableGraph);