import { UserMetadata } from "@supabase/supabase-js";
import { createSignal, onMount } from "solid-js";

const Avatar = (user: UserMetadata) => {
  const [isActive, setActive] = createSignal<boolean>(false);

const checkActivity = () => {
  const active = localStorage.getItem("active");
    if (active) {
      setActive(active === "true");
    }
  };

  onMount(() => {
    checkActivity();
  });

  onchange = () => {
    checkActivity();
  };

  return (
    <div class="absolute cursor-pointer top-10 right-10" 
    onclick={() => {
      window.location.href = "/profile";
    }}
    >
      <img
        class="w-32 h-32 rounded-full"
        src={user.user.__user.avatar_url}
        alt="avatar"
      />
      <div
        class={`right-0 bottom-0 transition-all duration-200 border-8 absolute w-12 h-12 rounded-full ${
          isActive() ? "bg-green-400" : "bg-red-400"
        } `}
        style="border-color: #262626"
      />
    </div>
  );
};

export default Avatar;
