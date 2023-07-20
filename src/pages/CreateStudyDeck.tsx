import { Box, Button, Flex, Input, Textarea, useToast } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import MainLayout from "../Layout/MainLayout";
import supabase from "../utils/supabase";
import { redirect, useNavigate } from "react-router-dom";

export default function CreateStudyDeck() {
  const toast = useToast();
  const [deckTitle, setDeckTitle] = useState("");
  const navigate = useNavigate();

  const [flashcards, setFlashcards] = useState([
    {
      question: "",
      answer: "",
    },
  ]);

  const handleCreateDeck = async (event: FormEvent) => {
    event.preventDefault();

    const { error: deckCreateError, data: createDeckTitleData } = await supabase
      .from("flashcard_sets")
      .insert([{ title: deckTitle }])
      .select();

    if (deckCreateError) {
      console.log(deckCreateError);
      return;
    }

    const filteredSet = flashcards
      .filter((flashcard) => flashcard.question && flashcard.answer)
      .map((flashcard) => ({
        ...flashcard,
        deck_id: createDeckTitleData[0].id,
      }));

    const { error } = await supabase
      .from("flashcards")
      .insert(filteredSet)
      .select();

    if (error) {
      console.log(error);
      return;
    }

    toast({
      title: "Flashcard deck created",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    navigate(`/study/${createDeckTitleData[0].uid}`);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = event.target as HTMLInputElement;

    setFlashcards((prev) => {
      return prev.map((flashcard, idx) => {
        if (idx !== index) {
          return flashcard;
        }

        return {
          ...flashcard,
          [name]: value,
        };
      });
    });
  };

  const handleAddCard = () => {
    setFlashcards((prev) => {
      return [...prev, { question: "", answer: "" }];
    });
  };

  return (
    <MainLayout>
      <Box as="form" onSubmit={handleCreateDeck}>
        <Input
          onChange={(event) => setDeckTitle(event.target.value)}
          required
          mb={8}
          placeholder="Title of deck"
        />

        {flashcards.map((flashcard, index) => {
          return (
            <Box mb={8} key={index}>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Box mb={4}>Card {index + 1}</Box>
                <Button
                  _hover={{
                    backgroundColor: "transparent",
                  }}
                  backgroundColor={"transparent"}
                  onClick={() => {
                    setFlashcards((prev) => {
                      return prev.filter((_, idx) => idx !== index);
                    });
                  }}
                  type="button"
                >
                  X
                </Button>
              </Flex>
              <Input
                placeholder="Question"
                value={flashcard.question}
                name="question"
                type={"text"}
                onChange={(event) => handleInputChange(event, index)}
                mb={4}
                required
              />
              <Textarea
                placeholder="Answer"
                name="answer"
                value={flashcard.answer}
                onChange={(event) => handleInputChange(event, index)}
                required
              />
            </Box>
          );
        })}

        <Flex justifyContent={"flex-end"} mt={8}>
          <Button onClick={handleAddCard} type="button">
            Add Card
          </Button>
        </Flex>

        <Button colorScheme={"teal"} width={"100%"} mt={8} type="submit">
          Create Deck
        </Button>
      </Box>
    </MainLayout>
  );
}
