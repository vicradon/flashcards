import {
  Button,
  Container,
  Flex,
  Box,
  useToast,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../Providers/AuthProviders";
import supabase from "../utils/supabase";

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = (props: IMainLayoutProps) => {
  const { children } = props;
  const { isSignedIn } = useAuth();
  const toast = useToast();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    console.log("completed signout");

    if (error) {
      toast({
        title: "An error occured " + error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Box padding={4}>
      <Container maxW={"container.xl"}>
        <Flex mb={8} justifyContent={"space-between"}>
          <Flex>
            <Image
              src="/favicons/favicon-32x32.png"
              alt="logo"
              boxSize="24px"
              mr={2}
            />
            <Link to="/">Flashcards</Link>
          </Flex>

          {isSignedIn ? (
            <Button variant="outline" onClick={signOut}>
              Sign out
            </Button>
          ) : (
            <Link to={"/auth/signin"}>
              <Button colorScheme="teal">Sign in</Button>
            </Link>
          )}
        </Flex>
      </Container>

      {children}
    </Box>
  );
};

export default MainLayout;
