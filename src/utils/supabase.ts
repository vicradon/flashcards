import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://qgjllkpuaetobxetpxuf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnamxsa3B1YWV0b2J4ZXRweHVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4MjExOTcsImV4cCI6MjAwNTM5NzE5N30.vTOSncmhXa82RkPqTaoA1O7ftv2stKgZGdIyAQKV3YE"
);

export default supabase;
