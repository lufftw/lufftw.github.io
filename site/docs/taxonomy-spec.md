# Content Taxonomy Specification

## 1. Category (The Primitives)

**Definition:** Stable, foundational computer science disciplines and technical pillars.

- **Role:** Represents the "Science" or "Engineering" base of the content.
- **Nature:** Controlled vocabulary (Whitelist).
- **Examples:** `AI`, `Machine Learning`, `Algorithm`, `System Design`, `Database`, `Mathematics`.

## 2. Topic (The Domains)

**Definition:** Specialized research areas, specific projects, or evolving fields of interest.

- **Role:** Groups content into a "Series" or "Research Thread."
- **Nature:** Flexible but descriptive.
- **Examples:** `Event Extraction`, `LLM Evaluation`, `Personal Knowledge Management`.

## 3. Tag (The Specifics)

**Definition:** Granular keywords, specific tools, model versions, or technical terms.

- **Role:** Facilitates quick search and cross-referencing of specific entities.
- **Nature:** Free-form and uncontrolled.
- **Examples:** `gpt-4o`, `PyTorch`, `Astro`, `F1-Score`, `Zod`, `TypeScript`.

---

### 📝 Standardized Frontmatter Example

Here is how a post would look using this taxonomy:

```yaml
---
author: Simon Smale
pubDatetime: 2025-12-19T10:00:00Z
modDatetime: 2025-12-19T10:00:00Z
title: "Advanced Evaluation Patterns for LLM-based Event Extraction"
featured: false
draft: false
categories:
  - AI
  - Machine Learning
topics:
  - Event Extraction
  - LLM Research
tags:
  - gpt-4o
  - evaluation-metrics
  - f1-score
  - python
canonicalURL: https://smale.codes/posts/evaluation-patterns-llm/
description: A deep dive into the foundational AI principles and specific LLM research patterns used to optimize event extraction metrics.
---
```