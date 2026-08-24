import { Annotation } from "@langchain/langgraph";
import { BaseMessage,HumanMessage } from "@langchain/core/messages";

export const State = Annotation.Root({
    input: Annotation<HumanMessage>,
    executedNodes: Annotation<number>({
        reducer: (currExecuted, newOutput) => currExecuted + 1,
        default: () => 0
    }),
    nextNode: Annotation<string>, 
    output: Annotation<BaseMessage[]>({
        reducer: (currOutput, newOutput) => currOutput.concat(newOutput),
        default: () => []
    }),
});