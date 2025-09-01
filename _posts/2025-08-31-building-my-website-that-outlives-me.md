---
layout: post
title: "Building My Personal Website That Outlives Me"
date: 2025-08-31
author: Darvan
column: right
description: "My journey of building a personal website that will outlive me. Using Jekyll, GitHub Pages, and Cloudflare Workers to create a lasting digital legacy."
keywords: "personal website, website building, Jekyll, GitHub Pages, Cloudflare Workers, digital legacy, lasting website, personal branding, minimalist design, vanilla JavaScript, Azure Translator, website architecture, personal project, digital fingerprint"
---

I always wanted to build my own website, but it did not happen quickly. Life, work, studies, and bills kept getting in the way. I started and stopped many times. Managing domains, servers, backend, frontend, and publishing blogs all together was difficult. Sometimes I even paused because of renewal costs or small technical issues. But I kept coming back to it, because I wanted a website that remains even after I die. A place that holds my work and my thoughts.

As a software engineer, I thought deeply about the design and structure. I asked myself what topics and sections should exist, how it should look, and what style would reflect me. I decided on a minimalist approach. I looked at international websites for inspiration, even ones that were not meant for personal use, and I adapted their ideas for my own. After finishing the UI and UX design based on my personal branding, I moved on to the stack.

For the frontend, I chose vanilla JavaScript. The website is not too complex, so I didn’t need a heavy framework. Vanilla JS made it easier and faster to complete. Since I wanted translations to Kurdish Sorani and Kurmanji, I compared different APIs that offered monthly free credits. In the end I chose Azure Translator, because the free plan was enough for what I needed. For English text-to-speech, I also used Azure, again relying on their free monthly credits.

For the backend, I wanted something simple. I didn’t want to set up or maintain heavy infrastructure. To add posts and blogs, I used Jekyll. It lets me write posts as Markdown files and publish them immediately in their place. This way, I don’t need a database or complex CMS. It is lightweight, reliable, and fits perfectly with GitHub Pages.

The next challenge was how to run the APIs securely. Running directly from GitHub Pages would expose the keys and create performance and security issues. Setting up servers felt like over-engineering for a project of this size. So I chose Cloudflare Workers to handle the API requests. This way the code calls my worker, the worker calls the API, and the process stays secure and simple.

The main reason behind these choices was simple: I wanted to deploy the site on GitHub Pages instead of my own servers. Because as long as GitHub exists, my website exists. I only bought one thing: my domain darvan.krd. Even if it goes down in the future, it will redirect to the GitHub Pages link. That means the site will always remain free, always running, and always alive.

For me this is not just a personal project. It is part of my legacy. A digital fingerprint that can outlive me. As long as GitHub, Google Cloud, and Azure continue, my website will remain online. That was the goal all along, to make something simple, accessible, and lasting.
