import {
  Button,
  Container,
  Heading,
  Flex,
  Text,
  Input,
} from "@chakra-ui/react";
import MainLayout from "../Layout/MainLayout";
import { FormEvent, useState } from "react";
import { Flashcard } from "../utils/interfaces";
import supabase from "../utils/supabase";

interface IFlashcardListProps {}

export const FlashcardList = (props: IFlashcardListProps) => {
  const [addingSet, setAddingSet] = useState(false);
  const [flashcardSets, setFlashcardSets] = useState([]);

  const [newFlashcardTitle, setNewFlashcardTitle] = useState("");

  const handleCreateFlashcardSet = async (event: FormEvent) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from("flashcard-sets")
      .insert([{ title: newFlashcardTitle }])
      .select();

    if (error) {
      console.log(error);
      return;
    }

    console.log(data);
  };

  return (
    <MainLayout>
      <Container maxW={"container.xl"}>
        <Heading mb={8}>Flashcards</Heading>

        <Flex flexDirection={"column"}>
          {flashcardSets.map((flashcard: Flashcard) => {
            return (
              <Flex>
                <Text>{flashcard.title}</Text>

                <Flex>
                  <Button>Study</Button>
                  <Button>Delete</Button>
                </Flex>
              </Flex>
            );
          })}
        </Flex>

        {addingSet && (
          <Flex onSubmit={handleCreateFlashcardSet} as="form">
            <Input
              width={"400px"}
              value={newFlashcardTitle}
              onChange={(event) => setNewFlashcardTitle(event.target.value)}
              autoFocus
              required
            />

            <Flex>
              <Button
                _hover={{
                  backgroundColor: "transparent",
                }}
                backgroundColor={"transparent"}
                type="submit"
              >
                ✅
              </Button>
              <Button
                _hover={{
                  backgroundColor: "transparent",
                }}
                backgroundColor={"transparent"}
                onClick={() => {
                  setNewFlashcardTitle("");
                  setAddingSet(false);
                }}
              >
                ❌
              </Button>
            </Flex>
          </Flex>
        )}

        <Flex justifyContent="flex-end">
          <Button onClick={() => setAddingSet(true)} colorScheme="teal">
            Create Set
          </Button>
        </Flex>
      </Container>
    </MainLayout>
  );
};
