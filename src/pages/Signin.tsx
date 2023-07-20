import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../utils/supabase";
import { Container, Heading, Text, Box } from "@chakra-ui/react";

export default function Signin() {
  const getURL = (() => {
    let url = import.meta.env.SITE_URL;
    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  })();

  console.log(import.meta.env.SITE_URL);

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
          redirectTo={`${getURL}`}
        />
      </Container>
    </Box>
  );
}
