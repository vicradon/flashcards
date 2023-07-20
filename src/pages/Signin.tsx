import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../utils/supabase";
import { Container, Heading, Text, Box } from "@chakra-ui/react";

export default function Signin() {
  return (
    <Box padding={4}>
      <Container maxW={"container.sm"}>
        <Box mb={"1rem"}>
          <Heading>Sign in</Heading>
          <Text>Create an account or Login to your account</Text>
        </Box>
        <Auth
          providers={[]}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          redirectTo="/"
        />
      </Container>
    </Box>
  );
}
