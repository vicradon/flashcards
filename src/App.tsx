import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { FlashcardList } from "./pages/FlashcardList";
import { StudyCardSet } from "./pages/StudyCardSet";
import NotFound from "./pages/NotFound";
import Signin from "./pages/Signin";
import AuthProvider from "./Providers/AuthProviders";
import CreateStudyDeck from "./pages/CreateStudyDeck";

function App() {
  return (
    <AuthProvider>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FlashcardList />} />
            <Route path="/auth/signin" element={<Signin />} />
            <Route path="/create-set" element={<CreateStudyDeck />} />
            <Route path="/study/:id" element={<StudyCardSet />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
