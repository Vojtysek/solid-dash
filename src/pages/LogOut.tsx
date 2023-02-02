import { supabase } from "../client";
import { onMount, createSignal } from "solid-js";

const LogOut: any = () => {
  const [lgOut, setLgOut] = createSignal<boolean>();

  onMount(async () => {
    await supabase.auth.signOut();
    setLgOut(false);
    localStorage.removeItem("user");
    setLgOut(true);
    location.href = "/";
  });

  return (
    <div class="flex w-screen text-white flex-col justify-center">
      {lgOut() ? (
        <div class="flex flex-col items-center justify-center text-3xl h-screen">
          <h1>
            You have been <span class="text-purple-400">logged out</span>
          </h1>
        </div>
      ) : (
        <div class="flex flex-col items-center justify-center text-3xl h-screen">
          <h1>
            <span class="text-purple-400">Logging </span>out...
          </h1>
        </div>
      )}
    </div>
  );
};

export default LogOut;
