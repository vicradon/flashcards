import {
  Button,
  Container,
  Heading,
  Flex,
  Text,
  Input,
} from "@chakra-ui/react";
import MainLayout from "../Layout/MainLayout";
import { useState } from "react";
import { Flashcard } from "../utils/interfaces";

interface IFlashcardListProps {}

export const FlashcardList = (props: IFlashcardListProps) => {
  const [addingSet, setAddingSet] = useState(false);
  const [flashcardSets, setFlashcardSets] = useState([]);

  const [newFlashcardTitle, setNewFlashcardTitle] = useState("");

  const handleCreateFlashcardSet = () => {
    // creates a new row on the db
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
          <Flex as="form">
            <Input
              width={"400px"}
              value={newFlashcardTitle}
              onChange={(event) => setNewFlashcardTitle(event.target.value)}
              autoFocus
            />

            <Flex>
              <Button
                _hover={{
                  backgroundColor: "transparent",
                }}
                backgroundColor={"transparent"}
                onClick={handleCreateFlashcardSet}
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
