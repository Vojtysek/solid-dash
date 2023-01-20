import type { Component } from "solid-js";
import "./index.css";
import { createSignal, onMount } from "solid-js";
import { supabase } from "./client";
import { For } from "solid-js";

import Navbar from "./components/Navbar";
import { UserMetadata } from "@supabase/supabase-js";

const App: Component = () => {
  const [user, setUser] = createSignal<UserMetadata | undefined>(undefined);
  const [loading, setLoading] = createSignal(true);
  const [repos, setRepos] = createSignal([]);

  onMount(() => {
    setLoading(true);
    checkUser();
    window.addEventListener("haschange", function () {
      checkUser();
    });
  });

  async function checkUser() {
    const _user = await (
      await supabase.auth.getUser()
    ).data.user?.user_metadata;
    setUser(_user);
    document.querySelector(
      "#profile-pic"
    )!.style.backgroundImage = `url(${_user?.avatar_url})`;
    getRepos();
  }

  async function signIn() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(undefined);
  }

  async function getRepos() {
    await fetch(`https://api.github.com/users/${user()!.user_name}/repos`)
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
      });
  }

  return (
    <>
      <div className="flex flex-row text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center text-3xl h-screen w-screen">
          {user() !== undefined ? (
            <>
              <h1>Welcome {user()!.user_name}</h1>
              <div className="grid grid-cols-4 m-10 mt-12 grid-rows-3 gap-3">
                <For each={repos()}>
                  {(repo: any) => (
                    <div className="h-28 flex outline-1 outline outline-red-400 p-5 rounded-lg flex-col">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className=""
                      >
                        {repo.name}
                      </a>
                      <p className="text-gray-500 text-base">
                        {repo.description}
                      </p>
                    </div>
                  )}
                </For>
              </div>
              <div
                id="profile-pic"
                className="w-20 h-20 absolute top-5 right-5 rounded-full bg-cover"
              ></div>
            </>
          ) : (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={signIn}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
