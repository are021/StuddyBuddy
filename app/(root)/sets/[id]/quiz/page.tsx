"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import { generateQuizQuestions } from "@/lib/actions/studyset.action";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { usePathname } from "next/navigation";

function extractIntegerFromPathname(pathname: string) {
  const parts = pathname.split("/");

  // Check if the last part of the path could be an integer
  return parts[parts.length - 2];
}

export interface IParamsProps {
  params: { id: string };
}

const QuizPage = () => {
  const pathname = usePathname();
  const [quizQuestions, setQuizQuestions] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState<Array<any>>([{}]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  const generateQuestions = async () => {
    setIsLoading(true);
    setQuizQuestions([]);
    setChecked(false);
    setScore(0);
    const response = await generateQuizQuestions({
      studySetId: parseInt(extractIntegerFromPathname(pathname)),
    });
    if (response) {
      setQuizQuestions(response.questions);
    } else {
      console.log("Error generating quiz");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    generateQuestions();
  }, []);

  const checkAnswers = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setChecked(true);
    for (let i = 0; i < quizQuestions.length; i++) {
      if (answers[i]?.answer === quizQuestions[i]?.correct) {
        answers[i]?.element.classList.add("bg-primary-500");
        setScore((prev) => prev + 1);
      } else {
        answers[i]?.element.classList.add("bg-red-500");
        for (let index = 0; index < 4; index++) {
          if (
            answers[i]?.element.parentElement.parentElement.children[0]
              .children[index].children[0].id === quizQuestions[i]?.correct
          ) {
            answers[
              i
            ]?.element.parentElement.parentElement.children[0].children[
              index
            ].classList.add("bg-primary-500");
          }
        }
      }
    }
  };

  // label
  // button
  const handleSelect = (e: any) => {
    const root =
      e.target.parentElement.parentElement.parentElement.parentElement;

    const newArray = answers;
    newArray[root.id] = {
      answer: e.target.id,
      element: e.target.parentElement,
    };
    if (e.target.tagName === "LABEL") {
      return;
    }

    setAnswers(newArray);
  };

  return (
    <>
      {checked ? (
        <div className="mt-6 flex w-full items-center justify-center text-3xl">
          {"Score: " + 100 * (score / quizQuestions.length) + "%"}
        </div>
      ) : (
        <></>
      )}
      <h1 className="h1-bold">Generate a quiz</h1>
      <p className="paragraph-regular mt-3">
        Click the button below to test your knowledge.
      </p>
      <Button
        className="mt-4 flex w-[200px] gap-2 rounded-xl bg-primary-500 text-dark-100"
        onClick={() => generateQuestions()}
      >
        <Image
          src="/assets/icons/stars.svg"
          width={20}
          height={20}
          alt="stars"
        />
        <p className="paragraph-medium">Generate Quiz</p>
      </Button>
      <div className="mt-10 flex flex-col gap-4">
        {quizQuestions.length ? (
          quizQuestions.map((item: any, i) => (
            <div
              key={i}
              id={i.toString()}
              className="card-wrapper flex w-full flex-col gap-5 rounded-xl p-6 "
            >
              <h4 className="base-medium">{item.question}</h4>
              <div className="flex flex-col gap-3">
                <RadioGroup>
                  <div

                    // className={`flex items-center gap-2 ${answers[item.id]?.answer == item.correct ? "bg-green-100" : "bg-red-100"}`}
                    className="flex items-center gap-2 rounded-xl p-2"

                    onClick={(e) => handleSelect(e)}
                  >
                    <RadioGroupItem value="a" id="a" />
                    <Label htmlFor="a">{item.options.a}</Label>
                  </div>
                  <div
                  className="flex items-center gap-2 rounded-xl p-2"

                    onClick={(e) => handleSelect(e)}
                  >
                    <RadioGroupItem value="b" id="b" />
                    <Label htmlFor="b">{item.options.b}</Label>
                  </div>
                  <div
                    className="flex items-center gap-2 rounded-xl p-2"

                    onClick={(e) => handleSelect(e)}
                  >
                    <RadioGroupItem value="c" id="c" />
                    <Label htmlFor="c">{item.options.c}</Label>
                  </div>
                  <div
                    className="flex items-center gap-2 rounded-xl p-2"

                    onClick={(e) => handleSelect(e)}
                  >
                    <RadioGroupItem value="d" id="d" />
                    <Label htmlFor="d">{item.options.d}</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          ))
        ) : isLoading ? (
          <div className="mt-14 flex w-full items-center justify-center ">
            <p className="paragraph-regular text-2xl text-dark-200">
              Loading...
            </p>
          </div>
        ) : (
          <div>
            <p className="paragraph-regular text-dark-200">
              Click the above button to get started.
            </p>
          </div>
        )}
      </div>
      {checked && isLoading ? (
        <></>
      ) : isLoading ? (
        <></>
      ) : (
        <div>
          <Button
            className="mt-6 flex w-[200px] gap-2 rounded-xl bg-primary-500 text-dark-100"
            onClick={() => checkAnswers()}
          >
            <p className="paragraph-medium">Check Answers</p>
          </Button>
        </div>
      )}
    </>
  );
};

export default QuizPage;
