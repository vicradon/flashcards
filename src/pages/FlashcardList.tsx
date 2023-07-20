import {
  Button,
  Container,
  Heading,
  Flex,
  Text,
  Input,
} from "@chakra-ui/react";
import MainLayout from "../Layout/MainLayout";
import { FormEvent, useEffect, useState } from "react";
import { Flashcard } from "../utils/interfaces";
import supabase from "../utils/supabase";
import { Link } from "react-router-dom";

interface IFlashcardListProps {}

export const FlashcardList = (props: IFlashcardListProps) => {
  const [flashcardSets, setFlashcardSets] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error: insertError } = await supabase
        .from("flashcard_sets")
        .select("*");

      if (insertError) {
        console.log(insertError);
        return;
      }

      setFlashcardSets(data);
    })();
  }, []);

  const deleteDeck = async (uid: string) => {
    const { error } = await supabase
      .from("flashcard_sets")
      .delete()
      .eq("uid", uid);

    if (error) {
      console.log(error);
      return;
    }
  };

  return (
    <MainLayout>
      <Container maxW={"container.xl"}>
        <Heading mb={8}>Flashcards</Heading>

        <Flex mb={8} rowGap={8} flexDirection={"column"}>
          {flashcardSets.map((flashcard: Flashcard) => {
            return (
              <Flex key={flashcard.uid} justifyContent="space-between">
                <Text>{flashcard.title}</Text>

                <Flex columnGap={4}>
                  <Link to={`/study/${flashcard.uid}`}>
                    <Button>Study</Button>
                  </Link>
                  <Button onClick={() => deleteDeck(flashcard.uid)}>
                    Delete
                  </Button>
                </Flex>
              </Flex>
            );
          })}
        </Flex>

        <Flex justifyContent="flex-end">
          <Link to="/create-set">
            <Button colorScheme="teal">Create Set</Button>
          </Link>
        </Flex>
      </Container>
    </MainLayout>
  );
};
