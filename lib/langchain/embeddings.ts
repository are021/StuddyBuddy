// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";

// import { OpenAIEmbeddings } from "@langchain/openai";
// import { createClient } from "@supabase/supabase-js";

// const supabaseClient = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// const openAIApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

// export async function createEmbeddings(text: string) {
//   try {
//     const splitter = new RecursiveCharacterTextSplitter({
//       chunkSize: 250,
//       chunkOverlap: 10,
//       separators: ["\n\n", ", ", "; ", ":", ".", "\n"],
//     });

//     const output = await splitter.createDocuments([text]);

//     const embeddings = new OpenAIEmbeddings({ openAIApiKey });

//     // const store = new SupabaseVectorStore(embeddings, {
//     //   client: supabaseClient,
//     //   tableName: "embeddings",
//     // });

//     await SupabaseVectorStore.fromTexts()


//     // await store.addDocuments(output.map((doc) => ({
//     //     documentId: doc.id,
//     //     content: doc.pageContent,

//     // })))
//   } catch (error) {
//     console.log(error);
//   }
// }
