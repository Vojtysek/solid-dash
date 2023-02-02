import { Component } from "solid-js"

const Loading: Component = () => {
    return(
        <div class="flex flex-row mx-10 overflow-hidden text-white">
          <div class="flex flex-col items-center w-screen justify-center text-3xl h-screen">
            <h1>Loading...</h1>
            <div class="h-px w-96 my-3 bg-purple-400"></div>
            <h2>
              Please <span class="text-purple-400">wait</span>!
            </h2>
          </div>
        </div>
    )
}

export default Loading