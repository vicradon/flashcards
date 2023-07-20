import { Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = (props: IMainLayoutProps) => {
  const { children } = props;

  return (
    <div>
      <Flex mb={8} justifyContent={"space-between"}>
        <Text>Flashcard</Text>

        <Flex columnGap={4}>
          <Link to={"/auth/signin"}>
            <Button>Sign in</Button>
          </Link>
        </Flex>
      </Flex>

      {children}
    </div>
  );
};

export default MainLayout;
