"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../supabase/utils";
import {
  quizChain,
  splitter,
  studySetChain,
} from "../langchain/createStudySet";
import { formatDocuments } from "../utils";

interface IUploadStudySetParams {
  name: string;
  path: string;
  notes: string;
  userId?: string;
}

export async function uploadStudySet(params: IUploadStudySetParams) {
  try {
    const { name, path, notes, userId } = params;

    const { data, error } = await supabase
      .from("study_set")
      .insert({
        name,
        user_id: userId || null,
      })
      .select();

    if (error) throw error;

    const studySetId = data?.[0].id;

    const docs = await splitter.createDocuments([notes]);

    const { error: documentError } = await supabase.from("document").insert(
      docs.map((doc) => ({
        content: doc.pageContent,
        study_set_id: studySetId,
      }))
    );

    if (documentError) throw documentError;

    const output = await studySetChain.invoke({
      notes,
    });

    const flashcards = JSON.parse(output);

    const flashcardData = flashcards.map(
      (flashcard: { term: string; definition: string }) => ({
        ...flashcard,
        study_set_id: studySetId,
      })
    );

    const { error: flashcardError } = await supabase
      .from("flashcard")
      .insert(flashcardData);

    if (flashcardError) throw flashcardError;

    revalidatePath(`${path}/${studySetId}`);
    return studySetId;
  } catch (error) {
    console.log(error);
  }
}

interface IGetStudySetParams {
  studySetId: number;
}

export async function getStudySet(params: IGetStudySetParams) {
  try {
    const { studySetId } = params;

    const { data, error } = await supabase
      .from("flashcard")
      .select()
      .eq("study_set_id", studySetId);

    if (error) throw error;

    const { data: studySetData, error: studySetError } = await supabase
      .from("study_set")
      .select("name")
      .eq("id", studySetId);

    if (studySetError) throw studySetError;

    if (error) throw error;

    return {
      name: studySetData?.[0].name,
      flashcards: data,
    };
  } catch (error) {
    console.log(error);
  }
}

interface IGenerateQuizParams {
  studySetId: number;
}

export async function generateQuizQuestions(params: IGenerateQuizParams) {
  try {
    const { studySetId } = params;

    const { data, error } = await supabase
      .from("document")
      .select("content")
      .eq("study_set_id", studySetId);

    if (error) throw error;

    const documentContent = formatDocuments(data.map((doc) => doc.content));

    const output = await quizChain.invoke({
      notes: documentContent,
    });
    console.log(output);

    return {
      questions: JSON.parse(output),
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentStudySets() {
  try {
    const { data, error } = await supabase
      .from("study_set")
      .select()
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw error;

    const studySetIds = data.map((item) => item.id);

    const cardCount: number[] = [];

    for (const id of studySetIds) {
      const { data: cardData, error: cardError } = await supabase
        .from("flashcard")
        .select()
        .eq("study_set_id", id);

      if (cardError) throw cardError;
      // console.log(cardData.length);
      cardCount.push(cardData.length);
    }

    const authorData: any[] = [];

    for (const item of data) {
      if (item.user_id) {
        const { data: authorReturnData, error: authorError } = await supabase
          .from("users")
          .select("uuid, email")
          .eq("uuid", item.user_id);

        if (authorError) throw authorError;

        if (authorReturnData.length > 0) {
            authorData.push(authorReturnData[0]);
        } else {
            authorData.push({ email: "guest@gmail.com" });
        }

      } else {
        authorData.push({ email: "guest@gmail.com" });
      }
    }

    const returnData = data.map((item, i) => ({
      id: item.id,
      name: item.name,
      cards: cardCount[i],
      userId: item.user_id || "",
      author: {
        name: authorData[i].email.split("@")[0] || "John Doe",
        avatar: "/assets/images/avatar.png",
      },
    }));

    return {
      studySets: returnData,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getAllStudySets() {
  try {
    const { data, error } = await supabase
      .from("study_set")
      .select()
      .order("created_at", { ascending: false });

    if (error) throw error;

    const studySetIds = data.map((item) => item.id);

    const cardCount: number[] = [];

    for (const id of studySetIds) {
      const { data: cardData, error: cardError } = await supabase
        .from("flashcard")
        .select()
        .eq("study_set_id", id);

      if (cardError) throw cardError;
      // console.log(cardData.length);
      cardCount.push(cardData.length);
    }

    const authorData: any[] = [];

    for (const item of data) {
        if (item.user_id) {
          const { data: authorReturnData, error: authorError } = await supabase
            .from("users")
            .select("uuid, email")
            .eq("uuid", item.user_id);
  
          if (authorError) throw authorError;
  
          if (authorReturnData.length > 0) {
              authorData.push(authorReturnData[0]);
          } else {
              authorData.push({ email: "guest@gmail.com" });
          }
  
        } else {
          authorData.push({ email: "guest@gmail.com" });
        }
      }

    const returnData = data.map((item, i) => ({
      id: item.id,
      name: item.name,
      cards: cardCount[i],
      userId: item.user_id || "",
      author: {
        name: authorData[i].email.split("@")[0] || "John Doe",
        avatar: "/assets/images/avatar.png",
      },
    }));

    return {
      studySets: returnData,
    };
  } catch (error) {
    console.log(error);
  }
}
