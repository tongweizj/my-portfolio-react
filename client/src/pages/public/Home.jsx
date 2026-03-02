
import React, { Component } from 'react';
//
// this is the home page component
function Home(props) {


    return (
        <main class="w-full mt-0 md:mt-16">
            <h1 id="lee-robinson" class="text-xl md:text-2xl mb-1 font-medium leading-13">Lee Robinson</h1>
            <p class="text-copy my-5">I’m a <a class="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600" href="/bio">developer and writer</a>. I work at <a class="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600" href="/cursor">Cursor</a> teaching about AI. Previously, I worked at <a class="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600" href="/vercel">Vercel</a>. I’ve been coding for 15 years and teaching for the second half.</p>
            <p class="text-copy my-5">My life’s work is to make technology easy to understand and interesting to learn about. I’m a husband, father, and a massive <a class="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600" href="/music">music fan</a>. <span>I last listened to<a href="https://open.spotify.com/track/0lRnxwJeUOxwEvWMw4uQKj" target="_blank" rel="noopener noreferrer" class="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600">Think About Us</a> by Sonny Fodera, D.O.D, Poppy Baskcomb.</span> </p>
            <p class="text-copy my-5">Some of my favorite writing includes:</p>
            <ul class="text-copy pl-0 space-y-1">
                <li class="pl-1"><a class="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600" href="/beliefs">Things I Believe</a></li>
                <li class="pl-1"><a class="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600" href="/agents">Coding Agents &amp; Complexity Budgets</a></li>
                <li class="pl-1"><a class="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600" href="/pixo">Building Low-Level Software with Only Coding Agents</a></li>
                <li class="pl-1"><a class="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600" href="/compression">How Does Image Compression Work?</a></li>
                <li class="pl-1"><a class="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600" href="/developer-marketing">Developer Marketing</a></li>
                <li class="pl-1"><a class="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600" href="/ai">Understanding AI</a></li>
            </ul>
            <p class="text-copy my-5">You can <a class="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600" href="/writing">read my writing</a> 
            or <a href="https://github.com/leerob" target="_blank" rel="noopener noreferrer" class="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600">code</a>, 
            or <a href="https://x.com/leerob" target="_blank" rel="noopener noreferrer" class="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600">follow me online</a>. 
            I also make <a href="https://www.youtube.com/@leerob" target="_blank" rel="noopener noreferrer" class="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600">videos</a>, 
            advise companies, and do angel investing. <a href="mailto:lee@leerob.com" target="_blank" rel="noopener noreferrer" class="transition-colors underline decoration-neutral-500 decoration-1 underline-offset-[2.5px] hover:decoration-neutral-400 dark:hover:decoration-neutral-600">Reach out</a> if interested.</p>
            </main>
    );

}
// withRouter will pass updated match, location, and history props 
// to the wrapped component whenever it renders.
export default Home;