import { Component, createSignal, onMount } from "solid-js";
import { For } from "solid-js";

import { UserMetadata } from "@supabase/supabase-js";
import Avatar from "../components/Avatar";

import { FaSolidRotate } from "solid-icons/fa";
import Loading from "../components/Loading";

const Home: Component = (__user: UserMetadata) => {
  const [loading, setLoading] = createSignal<boolean>(false);
  const [repos, setRepos] = createSignal([]);

  const getRepos = async () => {
    await fetch(`https://api.github.com/users/${__user.__user.user_name}/repos`)
      .then((res) => res.json())
      .then((data) => {
        for (let i = data.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [data[i], data[j]] = [data[j], data[i]];
        }
        setRepos(data);
      });
  };

  onMount(async () => {
    setLoading(true);
    await getRepos();
    setLoading(false);
  });

  return (
    <>
      {loading() ? (
        Loading({ loading: loading() })
      ) : (
        <div class="text-white w-11/12 flex flex-col items-center justify-center text-3xl h-screen">
          <Avatar user={__user} />
          <h1>
            Welcome
            <span class="text-purple-400"> &lt;h1&gt; </span>
            {__user.__user.user_name}
            <span class="text-purple-400"> &lt;/h1&gt;</span>
          </h1>
          <div class="h-px w-96 mt-3 bg-purple-400"></div>
          <div class="self-start relative left-10 flex flex-col items-center">
            <h2 class="mt-5">List of your repositories: </h2>
            <div class="mt-3 w-80 h-px bg-purple-400" />
          </div>
          <button
            onClick={getRepos}
            class="self-end relative right-28 pointer"
          >
            <FaSolidRotate size={20} />
          </button>
          <div class="grid w-11/12 grid-cols-4 m-10 mt-12 grid-rows-3 gap-3">
            <For each={repos().slice(0, 12)}>
              {(repo: any) => (
                <div class="h-32 w-11/12 flex overflow-auto outline-1 outline outline-purple-400 p-5 rounded-lg flex-col">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    class=""
                  >
                    {repo.name}
                  </a>
                  <p class="text-gray-500 text-base">{repo.description}</p>
                </div>
              )}
            </For>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
