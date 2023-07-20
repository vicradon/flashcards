import { Button, ChakraProvider, Switch } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import { FlashcardList } from "./pages/FlashcardList";
import { StudyCardSet } from "./pages/StudyCardSet";

function App() {
  return (
    <ChakraProvider>
      <Switch>
        <Route path="/">
          <FlashcardList />
        </Route>
        <Route path="/study/:id">
          <StudyCardSet />
        </Route>
      </Switch>
    </ChakraProvider>
  );
}

export default App;
