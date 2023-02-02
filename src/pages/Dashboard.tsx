import { Component, createSignal, onMount } from "solid-js";

import { UserMetadata } from "@supabase/supabase-js";

import { SolidApexCharts } from "solid-apexcharts";

import { FaBrandsTwitter } from "solid-icons/fa";
import { FaBrandsGithub } from "solid-icons/fa";
import Loading from "../components/Loading";
import { createStore } from "solid-js/store";
import Avatar from "../components/Avatar";

const Dashboard: Component = (__user: UserMetadata) => {
  const [stats, setStats] = createStore<{}>({});
  const [loading, setLoading] = createSignal<boolean>();

  const [chartData, setChartData] = createSignal<any>({});

  const getStats = async (user: UserMetadata) => {
    const repos = await (
      await fetch(`https://api.github.com/users/${user.user_name}/repos`)
    ).json();
    const events = await (
      await fetch(`https://api.github.com/users/${user.user_name}/events`)
    ).json();
    const starred = await (
      await fetch(`https://api.github.com/users/${user.user_name}/starred`)
    ).json();
    const followers = await (
      await fetch(`https://api.github.com/users/${user.user_name}/followers`)
    ).json();
    const user_ = await (
      await fetch(`https://api.github.com/users/${user.user_name}`)
    ).json();
    setStats({
      repos: repos.length,
      events: events.length,
      starred: starred.length,
      followers: followers.length,
      bio: user_.bio,
      twitter: user_.twitter_username,
    });

    let otions = {
      series: [
        {
          name: "Stats",
          data: [stats.repos, stats.events, stats.starred, stats.followers],
        },
      ],
      chart: {
        height: 400,
        width: 400,
        type: "radar",
      },
      dataLabels: {
        enabled: true,
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val;
          },
        },
      },
      toolbar: {
        show: false,
      },
      colors: ["#C084FC"],
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: "none",
            fill: {
              colors: ["none"],
            },
          },
        },
      },
      xaxis: {
        categories: ["Repos", "Events", "Starred", "Followers"],
      },
      yaxis: {
        tickAmount: 3,
        labels: {
          formatter: function (val: any, i: any) {
            if (i % 2 === 0) {
              return val;
            }
            return "";
          },
        },
      },
    };

    setChartData(otions);
  };

  onMount(async () => {
    setLoading(true);
    await getStats(__user.__user);
    setLoading(false);
  });

  return (
    <>
      {loading() ? (
        Loading({ loading: loading() })
      ) : (
        <div class="flex flex-row mx-10 overflow-hidden text-white">
          <div class="flex flex-col items-center w-screen justify-center text-3xl h-screen">
            <Avatar user={__user} />
            <h1 class="text-3xl text-purple-400">Dashboard</h1>
            <div>
              <div class="flex flex-col">
                <div class="grid grid-cols-4 gap-8 my-5">
                  <div class="border border-purple-400 rounded-lg p-4">
                    <h1 class="text-2xl">Repos</h1>
                    <h1 class="text-4xl">{stats.repos}</h1>
                  </div>
                  <div class="border border-purple-400 rounded-lg p-4">
                    <h1 class="text-2xl">Events</h1>
                    <h1 class="text-4xl">{stats.events}</h1>
                  </div>
                  <div class="border border-purple-400 rounded-lg p-4">
                    <h1 class="text-2xl">Starred</h1>
                    <h1 class="text-4xl">{stats.starred}</h1>
                  </div>
                  <div class="border border-purple-400 rounded-lg p-4">
                    <h1 class="text-2xl">Followers</h1>
                    <h1 class="text-4xl">{stats.followers}</h1>
                  </div>
                </div>
                <div class="grid grid-cols-2">
                  <div class="border border-purple-400 rounded-lg m-4 p-4">
                    <SolidApexCharts options={chartData()} />
                  </div>
                  <div class="flex flex-col border items-center border-purple-400 rounded-lg m-4 p-4">
                    {stats.bio ? (
                      <>
                        <h1 class="text-2xl p-4">Bio</h1>
                        <h1 class="text-base p-5">{stats.bio}</h1>
                        <h1 class="text-2xl p-4">Socials</h1>
                        <div class="grid grid-cols-2 gap-4">
                          <FaBrandsTwitter
                            size={36}
                            class=" cursor-pointer"
                            onClick={() => {
                              window.open(
                                `https://twitter.com/${stats.twitter}`,
                                "_blank"
                              );
                            }}
                          />
                          <FaBrandsGithub
                            size={36}
                            class=" cursor-pointer"
                            onClick={() => {
                              window.open(
                                `https://www.github.com/${__user.__user.user_name}`,
                                "_blank"
                              );
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <h1 class="text-base">No bio</h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
