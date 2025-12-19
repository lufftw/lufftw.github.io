# Content Taxonomy Specification

## 1. Topic (The Domains)

**Definition:** Specialized research areas, specific projects, or evolving fields of intellectual focus.

* **Role:** The "Navigator." It groups individual pieces of content into a cohesive "Series" or "Research Thread."
* **Nature:** Semantic and evolvable. Topics grow as your research interests shift.
* **Core Examples:** `Attention Mechanisms`, `Distributed Consensus`, `Reactive Programming`, `Personal Knowledge Management`.

## 2. Category (The Primitives)

**Definition:** Stable, foundational computer science disciplines and technical pillars.

* **Role:** The "Infrastructure." It represents the underlying scientific or engineering base of your expertise—the skills that remain constant regardless of the specific project.
* **Nature:** Controlled vocabulary (Whitelist). Should remain limited to 15-20 core disciplines.
* **Core Examples:** `AI`, `Machine Learning`, `Algorithm`, `System Design`, `Database`, `Mathematics`, `Software Engineering`.

## 3. Tag (The Specifics)

**Definition:** Granular keywords, specific tools, model versions, or technical terms mentioned in the content.

* **Role:** The "Parts List." Facilitates quick search and cross-referencing across different domains and primitives.
* **Nature:** Free-form and uncontrolled.
* **Core Examples:** `gpt-4o`, `Raft`, `Astro`, `F1-Score`, `TypeScript`, `PyTorch`.

---

## 🛠 Multidimensional Mapping Examples

| Subject | **Topic (Domain)** | **Category (Primitive)** | **Tag (Specifics)** |
| --- | --- | --- | --- |
| **NeurIPS Best Paper** | `Attention Mechanisms`, `Numerical Stability` | `AI`, `Deep Learning` | `Qwen-3`, `Gated-Attention`, `Sigmoid` |
| **Distributed DB** | `Distributed Consensus`, `Database Internals` | `System Design`, `Database` | `Raft`, `Paxos`, `TiDB`, `Go` |
| **CNN Math Base** | `Geometric Deep Learning`, `CV` | `AI`, `Mathematics` | `CNN`, `Backprop`, `Equivariance` |
| **Astro Framework** | `Reactive Programming`, `vDOM Optimization` | `Software Engineering` | `Astro`, `React`, `Compiler` |

---

## 📝 Standardized Frontmatter Template

When writing the **description**, follow the **Cognitive Framework**:

1. **The Context** (Foundational constraint) → 2. **The Shift** (Paradigm change) → 3. **The Impact** (New boundary).

```yaml
---
author: Luff
pubDatetime: 2025-12-19T10:00:00Z
modDatetime: 2025-12-19T10:00:00Z
title: "The Architecture of Silence: Decoupling Attention from Softmax Constraints"
featured: true
draft: false

topics:
  - Attention Mechanisms
  - Numerical Information Theory
  - Structural Stability in Transformers

categories:
  - AI
  - Machine Learning
  - Deep Learning

tags:
  - Qwen-3
  - Gated-Attention
  - Attention-Sink-Free
  - Sigmoid-Gating
  - Sparse-Attention

canonicalURL: https://lufftw.github.io/posts/gated-attention-neurips-2025/
description: "Traditional Transformers operate under the 'Forced Allocation' principle of Softmax, where every query must exhaust its attention energy. This review analyzes the NeurIPS 2025 Best Paper's fundamental shift: using head-specific Gating to grant the model the 'right to be silent.' By decoupling score normalization from sequence length, GA-LLM resolves the Attention Sink phenomenon at its mathematical root, establishing a new baseline for numerical stability in long-context extrapolation."
---
```
