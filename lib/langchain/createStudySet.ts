import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "langchain/prompts";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { supabase } from "../supabase/utils";

const openAIApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const llm = new ChatOpenAI({ 
    openAIApiKey,
});

const parser = new StringOutputParser();

const studySetTemplate = `Based on the notes I give you, create a list of flashcards in the following JSON format:
[
{{
    "term": "term text",
    "definition": "definition text"
}},
...
]
Notes: {notes}
Flashcards:
`;

const quizTemplate = `Based on the notes I give you, create a quiz with questions in the following JSON format:
[
{{
    "question": "question text",
    "correct": "a",
    "options": {{
        "a": {{"option a"}},
        "b": {{"option b"}},
        "c": {{"option c"}},
        "d": {{"option d"}},
    }}
}},
...
]
Randomize which option is the correct answer, and make the other options plausible distractors based on the notes.
Notes: {notes}
Quiz questions:
`;

const studySetPrompt = PromptTemplate.fromTemplate(studySetTemplate);

const quizPrompt = PromptTemplate.fromTemplate(quizTemplate);

export const studySetChain = studySetPrompt.pipe(llm).pipe(parser);

export const quizChain = quizPrompt.pipe(llm).pipe(parser);

export const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 250,
  chunkOverlap: 10,
});

// export async function createStudySet(cardCount: number, notes: string) {
//   console.log(cardCount, notes);
//   try {
//     const docs = await splitter.createDocuments([notes]);

//     const output = await studySetChain.invoke({
//       cardCount: cardCount.toString(),
//       notes,
//     });

//     return JSON.parse(output);
//   } catch (error) {
//     console.log(error);
//   }
// }
