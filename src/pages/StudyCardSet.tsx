import { Box, Button, Flex, Heading, Text, Textarea } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import { Flashcard } from "../utils/interfaces";
import supabase from "../utils/supabase";

interface IStudyCardSetProps {}

export const StudyCardSet = (props: IStudyCardSetProps) => {
  const { id } = useParams();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [typedAnswer, setTypedAnswer] = useState("");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("flashcard_sets")
        .select("*")
        .eq("uid", id);

      if (error) {
        console.log(error);
        return;
      }

      const deckId = data?.[0].id;

      const { data: flashcards, error: flashcardError } = await supabase
        .from("flashcards")
        .select("*")
        .eq("deck_id", deckId);

      if (flashcardError) {
        console.log(flashcardError);
        return;
      }

      setFlashcards(flashcards || []);
    })();
  }, []);

  const handleCycling = (direction: "next" | "previous") => {
    if (direction === "next") {
      setActiveCardIndex(
        activeCardIndex < flashcards.length - 1
          ? activeCardIndex + 1
          : flashcards.length - 1
      );
    } else {
      setActiveCardIndex(activeCardIndex > 0 ? activeCardIndex - 1 : 0);
    }

    setTypedAnswer("");
  };

  // Create a reference to the worker object.
  const worker = useRef(null);

  // We use the `useEffect` hook to setup the worker as soon as the `App` component is mounted.
  useEffect(() => {
    if (!worker.current) {
      // Create the worker if it does not yet exist.
      worker.current = new Worker(
        new URL("../utils/worker.js", import.meta.url),
        {
          type: "module",
        }
      );
    }

    // Create a callback function for messages from the worker thread.
    const onMessageReceived = (e) => {};

    // Attach the callback function as an event listener.
    worker.current.addEventListener("message", onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  const verifyAnswer = () => {
    const currentCardAnswer = flashcards[activeCardIndex]?.answer;

    worker.current.postMessage({
      text: input,
      src_lang: sourceLanguage,
      tgt_lang: targetLanguage,
    });
  };

  return (
    <MainLayout>
      <Heading mb={4}>Study set</Heading>

      <Box mb={20} key={flashcards[activeCardIndex]?.id}>
        <Text mb={2}>{flashcards[activeCardIndex]?.question}</Text>
        <Textarea
          mb={2}
          placeholder="type in your answer"
          value={typedAnswer}
          onChange={(event) => setTypedAnswer(event.target.value)}
        />

        <Flex justifyContent={"flex-end"}>
          <Button onClick={verifyAnswer}>Verify</Button>
        </Flex>
      </Box>

      <Flex justifyContent={"space-between"}>
        <Button onClick={() => handleCycling("previous")}>Previous</Button>

        <Button onClick={() => handleCycling("next")}>Next</Button>
      </Flex>
    </MainLayout>
  );
};
