import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../utils/supabase";

export default function Signin() {
  return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
}
