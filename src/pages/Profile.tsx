import { UserMetadata } from "@supabase/supabase-js";
import { Component, createSignal, onMount } from "solid-js";
import Avatar from "../components/Avatar";

const Profile: Component = (__user: UserMetadata) => {
  const [isActive, setActive] = createSignal<boolean>(false);

  const changeActivity = async () => {
    setActive(!isActive());
    localStorage.setItem("active", isActive().toString());
  };

  const checkActivity = () => {
    const active = localStorage.getItem("active");
    if (active === "true") {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  onMount(() => {
    checkActivity();
  });

  return (
    <>
      <div class="flex flex-row mx-10 overflow-hidden text-white">
        <div class="flex flex-col items-center justify-center w-screen h-screen">
          <h1 class="text-3xl text-purple-400">{__user.__user.user_name}</h1>
          <Avatar user={__user} />
          <div class="grid grid-cols-2 justify-center h-2/3 items-center">
            <div class="flex flex-row">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive()}
                  onClick={changeActivity}
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Active
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
