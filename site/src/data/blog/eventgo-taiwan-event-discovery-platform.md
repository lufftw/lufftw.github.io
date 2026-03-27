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
description: "How I built EventGo (eventgo.tw), a full-stack event discovery platform for Taiwan featuring hybrid search, AI chatbot, and multi-view browsing — from zero to thousands of indexed events."
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

EventGo uses **hybrid search**: a combination of traditional BM25 text matching (30%) and vector similarity search (70%) powered by state-of-the-art multilingual embeddings. When you search for "a chill outdoor thing this weekend," it doesn't just match keywords — it understands the *intent*.

<figure>
  <img
    src="../../assets/images/eventgo/glass-cube.png"
    alt="A crystalline glass cube refracting light, representing the multi-faceted search architecture"
  />
  <figcaption class="text-center">
    Hybrid search combines the precision of traditional text matching with the semantic understanding of vector embeddings.
  </figcaption>
</figure>

The search pipeline:
- **Elasticsearch 9** with ICU Chinese segmentation for proper Traditional Chinese tokenization
- **Qwen3 embeddings** (4096-dimensional Matryoshka vectors) running on dedicated GPU workers
- **Redis caching** with 24-hour TTL — repeat queries resolve in under 1ms
- **Smart ranking** with time-decay and location awareness

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

## The tech under the hood

EventGo is a monorepo with a clear separation of concerns:

| Layer | Stack |
|-------|-------|
| **Frontend** | Nuxt 3 + Vue 3 + TypeScript + Tailwind CSS |
| **Backend** | Hono + Node.js + TypeScript |
| **Search** | Elasticsearch 9 (hybrid BM25 + kNN) |
| **Embeddings** | Qwen3 8B via Ollama on GPU workers |
| **AI Chat** | Multi-model agent with tool-calling |
| **Data** | PostgreSQL + Redis + RabbitMQ |
| **Proxy** | Caddy 2 with auto HTTPS |
| **SSR** | Full server-side rendering for SEO |

The entire platform runs on self-hosted infrastructure — no cloud bills, no vendor lock-in. Every component is something I can debug, tune, and scale myself.

### SEO as a first-class citizen

For a content platform, being invisible to Google is death. EventGo treats SEO as architecture, not afterthought:

- **Full SSR** — every page is server-rendered with proper meta tags
- **Schema.org Event structured data** — Google can parse event dates, locations, prices, and organizers directly
- **Dynamic sitemap** — auto-generated from the database, prioritized by event proximity
- **Open Graph + Twitter Cards** — beautiful previews when shared on social media

---

## The numbers

As of March 2026:

- **4,000+** events indexed and searchable
- [**76** auto-discovered thematic categories](https://eventgo.tw/explore) via k-means clustering + LLM naming
- **Sub-second** search response times (cached queries < 1ms)
- **4,476** pages discovered by Google Search Console and growing

---

## What I learned building this

<figure>
  <img
    src="../../assets/images/eventgo/music-festival.png"
    alt="A crowd at a music festival with hands raised and sky lanterns floating against a mountain backdrop"
  />
  <figcaption class="text-center">
    Building EventGo taught me that the hardest part of a search engine isn't the algorithm — it's understanding what people actually want to find.
  </figcaption>
</figure>

**Chinese NLP is hard.** Traditional Chinese tokenization is fundamentally different from English. Without ICU segmentation, Elasticsearch treats entire sentences as single tokens. Getting search quality right required understanding linguistics, not just engineering.

**Hybrid search is worth the complexity.** Pure vector search hallucinates relevance. Pure BM25 misses semantics. The 30/70 blend was the result of weeks of tuning on real user queries — and it works remarkably well.

**Self-hosting is a superpower.** When you control the entire stack, you can iterate at the speed of thought. No waiting for cloud deployments, no surprise bills, no opaque abstractions. The trade-off is operational burden — but for a solo developer, the learning is the point.

**Ship, then perfect.** EventGo started as a weekend hack. The first version had no vector search, no chat, no map view. Every feature was added because a real user (often me) needed it. The best architecture is the one that evolves.

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
