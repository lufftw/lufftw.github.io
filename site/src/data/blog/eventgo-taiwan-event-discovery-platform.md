---
author: Luff
type: post
pubDatetime: 2026-03-27T10:00:00+08:00
modDatetime: 2026-03-27T10:00:00+08:00
title: "EventGo — Building a hybrid-search event discovery platform for Taiwan"
featured: true
draft: false
categories:
  - Project
tags:
  - EventGo
  - Elasticsearch
  - Nuxt
  - AI
  - Side Project
description: "EventGo (eventgo.tw) is a free event discovery platform for Taiwan — find concerts, exhibitions, markets, and festivals with AI-powered search, calendar view, and smart recommendations."
ogImage: ../../assets/images/eventgo/og-cover.png
---

> *"Every weekend in Taiwan, thousands of events bloom and vanish like fireflies. I wanted to build a net that catches them all."*

---

<figure>
  <img
    src="../../assets/images/eventgo/festival-sunset.png"
    alt="A vibrant outdoor festival at sunset in Taiwan with sky lanterns rising into the warm evening sky"
  />
  <figcaption class="text-center">
    Taiwan is alive with events — festivals, exhibitions, concerts, markets — scattered across dozens of platforms with no single place to find them all.
  </figcaption>
</figure>

## The problem nobody was solving

If you've ever tried to find something to do in Taiwan on a random Saturday, you know the pain. Events are fragmented across Facebook groups, government portals, ticketing sites, and obscure community boards. You either stumble into something by accident, or you miss it entirely.

I kept asking myself: *why isn't there a single place where I can search all of them?*

So I built one.

[**EventGo**](https://eventgo.tw/) is a full-stack event discovery platform that aggregates events from across Taiwan and makes them searchable through [hybrid AI-powered search](https://eventgo.tw/search), interactive maps, [calendar views](https://eventgo.tw/search?view=calendar), and an [AI chatbot](https://eventgo.tw/chat) that actually understands what you're looking for.

---

## What makes EventGo different

### Hybrid search that actually understands you

Most event platforms give you keyword matching. Type "music" and you get everything with the word "music" in it. That's not search — that's `ctrl+F`.

EventGo uses **AI-powered smart search**. When you search for "a chill outdoor thing this weekend," it doesn't just match keywords — it understands what you *actually* want. It reads between the lines, considers timing, mood, and context, then surfaces the events that truly fit.

<figure>
  <img
    src="../../assets/images/eventgo/glass-cube.png"
    alt="A crystalline glass cube refracting light, representing the intelligent search behind EventGo"
  />
  <figcaption class="text-center">
    Search that thinks like you do — not just matching words, but understanding what kind of experience you're looking for.
  </figcaption>
</figure>

The result? Search that feels like asking a friend who knows every event in Taiwan.

### Three ways to browse

Not everyone searches the same way. EventGo offers three views:

- [**List view**](https://eventgo.tw/search) — classic search results, filterable by category, city, date range, and price
- **Map view** — Leaflet.js-powered interactive map showing events geographically
- [**Calendar view**](https://eventgo.tw/search?view=calendar) — monthly calendar layout to plan your week

### AI chatbot that gets Taiwan

The integrated [AI chatbot](https://eventgo.tw/chat) isn't a generic Q&A bot. It's connected to the live event database and understands context like "I'm in Taipei this weekend with my girlfriend, suggest something romantic that's free." It searches, filters, and responds with curated recommendations — complete with links, dates, and locations.

<figure>
  <img
    src="../../assets/images/eventgo/cyber-city.png"
    alt="A futuristic cyberpunk cityscape representing the AI-powered technology behind EventGo"
  />
  <figcaption class="text-center">
    The AI chatbot connects directly to the event search engine — every recommendation is backed by real, up-to-date data.
  </figcaption>
</figure>

---

## Built for speed, designed for discovery

EventGo is fast — really fast. Search results come back in under a second, and pages load instantly whether you're on your phone or desktop. Every event page is optimized so Google can find it, which means you can often discover EventGo events just by searching on Google.

When you share an event link on LINE, Facebook, or any social platform, it automatically shows a beautiful preview with the event image, title, and details — making it effortless to invite friends.

---

## The numbers

As of March 2026:

- **4,000+** events from across Taiwan, updated daily
- [**76** curated theme categories](https://eventgo.tw/explore) — from outdoor adventures to art exhibitions, automatically organized so you can browse by mood
- **Instant search** — results in under a second, every time
- **Growing every day** — more sources, more events, more cities

---

## Why I built this

<figure>
  <img
    src="../../assets/images/eventgo/music-festival.png"
    alt="A crowd at a music festival with hands raised and sky lanterns floating against a mountain backdrop"
  />
  <figcaption class="text-center">
    The best moments happen when you show up. EventGo exists to make sure you never miss them.
  </figcaption>
</figure>

I got tired of missing amazing events simply because I didn't know they existed. A friend would post photos from an incredible night market festival, and I'd think — *how did I not hear about this?*

Taiwan has one of the most vibrant event cultures in Asia. Every weekend, there are hundreds of concerts, exhibitions, workshops, markets, and festivals happening across the island. But the information is scattered everywhere — and by the time you find it, it's often too late.

EventGo started as a personal frustration and grew into something I hope everyone in Taiwan can use. It's still evolving, still getting better, and I'm building it every single day.

---

## Try it

<figure>
  <img
    src="../../assets/images/eventgo/cherry-blossom.png"
    alt="A dreamy cherry blossom path with a girl dancing under the petals, evoking the magic of seasonal events in Taiwan"
  />
  <figcaption class="text-center">
    Cherry blossom season, music festivals, night markets, art exhibitions — whatever you're looking for, EventGo helps you find it.
  </figcaption>
</figure>

**[eventgo.tw](https://eventgo.tw/)** — Discover events happening across Taiwan, right now.

Whether you're a local looking for weekend plans, a traveler exploring the island, or just someone who believes that the best things in life happen when you show up — EventGo is built for you.

---

*Built with obsessive attention to detail, an unreasonable amount of late nights, and the belief that Taiwan's event scene deserves better tooling.*

*— Luff*
