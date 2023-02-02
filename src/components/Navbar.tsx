import { For, Show, createSignal } from "solid-js";
import { NavLink, useLocation } from "solid-app-router";
import { createAutoAnimate } from "@formkit/auto-animate/solid";

import { Transition, TransitionGroup } from "solid-transition-group";

import {
  FaSolidHouse,
  FaSolidGauge,
  FaSolidSliders,
  FaSolidArrowRightFromBracket,
  FaSolidUser,
  FaSolidTextSlash,
} from "solid-icons/fa";

interface INav {
  isActive: boolean;
  title: string;
  link: string;
  tooltip: string;
}

function Navbar() {
  let parent: any;
  createAutoAnimate(() => parent);

  const [isExpanded, setIsExpanded] = createSignal<Boolean>(true);

  const location = useLocation();

  const routes: string[] = [
    "/",
    "/dashboard",
    "/settings",
    "/profile",
    "/logout",
  ];

  //TODO: add icons to the navbar
  const icons: any = {
    "/": <FaSolidHouse size={20} />,
    "/dashboard": <FaSolidGauge size={20} />,
    "/settings": <FaSolidSliders size={20} />,
    "/profile": <FaSolidUser size={20} />,
    "/logout": <FaSolidArrowRightFromBracket size={20} />,
  };

  return (
    <div class="parent transition-all duration-700" ref={parent}>
      <button
        class={`${
          isExpanded() ? " left-32" : ""
        } fixed bottom-5 transition-all duration-100 left-4 bg-purple-400 text-white rounded-full w-12 h-12 flex items-center justify-center`}
        onClick={() => setIsExpanded(!isExpanded())}
        type="button"
      >
        {isExpanded() ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 bg-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width={2}
          >
            <path
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 bg-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width={2}
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>
      <Show when={isExpanded()} keyed>
        <nav
          class={`h-screen w-28 border-r-2 border-purple-400 rounded-md flex flex-col place-content-between p-6">`}
        >
          <ul class="flex transition-all mt-4 duration-200 flex-col items-center">
            <For each={routes}>
              {(route) => {
                const replaceSyntax = route.replace("/ ", "");
                const syntaxFix =
                  replaceSyntax.charAt(1).toUpperCase() +
                  replaceSyntax.slice(2).replace("-", " ");
                return (
                  <Nav
                    link={route}
                    title={icons[route]}
                    isActive={location.pathname === route}
                    tooltip={syntaxFix}
                  />
                );
              }}
            </For>
          </ul>
          <ul class="flex transition-all mb-4 duration-200 flex-col items-center">
            <For each={routes.slice(-3)}>
              {(route) => {
                const replaceSyntax = route.replace("/ ", "");
                const syntaxFix =
                  replaceSyntax.charAt(1).toUpperCase() +
                  replaceSyntax.slice(2).replace("-", " ");
                return (
                  <Nav
                    link={route}
                    title={icons[route]}
                    isActive={location.pathname === route}
                    tooltip={syntaxFix}
                  />
                );
              }}
            </For>
          </ul>
        </nav>
      </Show>
    </div>
  );
}

function Nav(props: INav) {
  props.tooltip == "" ? "Home" : props.tooltip;
  return (
    <li
      class={`flex items-center p-4 text-lg group ${
        !props.isActive ? "text-gray-500" : "text-purple-400"
      } `}
    >
      <div class="flex flex-col items-center">
        <NavLink href={props.link}>{props.title}</NavLink>
      </div>
      <span class="sidebar-tooltip group-hover:scale-100">
        {props.tooltip == "" ? "Home" : props.tooltip}
      </span>
    </li>
  );
}

export default Navbar;
