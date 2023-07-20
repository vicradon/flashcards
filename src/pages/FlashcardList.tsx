import { Container, Heading } from "@chakra-ui/react";
import MainLayout from "../Layout/MainLayout";

interface IFlashcardListProps {}

export const FlashcardList = (props: IFlashcardListProps) => {
  return (
    <MainLayout>
      <Container maxW={"container.xl"}>
        <Heading>Flashcards</Heading>
      </Container>
    </MainLayout>
  );
};
