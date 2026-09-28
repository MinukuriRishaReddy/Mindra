# 🧠 MINDRA

The hard part of competitive intelligence is not finding another signal. It is remembering why the last one mattered when a new one arrives months later. I built Mindra around that problem: carry forward the useful history, but keep every conclusion tied to evidence someone can inspect.

## From public evidence to a decision

Mindra follows a competitor or market across time and geography, turns public changes into events, and gives an analyst a path from those events to a possible action. A founder can set a business context, name competitors, and state an objective. The system then organizes company and market signals, detects behavior that may form a pattern, produces scenarios, and connects those scenarios to goals.

The interface reflects that flow rather than centering everything on a chat transcript. The dashboard summarizes competitors and recent activity. Signals and patterns let the analyst inspect changes and the connections between them. The memory view exposes historical sequences. Geography moves from broad market conditions toward local context. Forecasts show a possible next move alongside its evidence and analogy. A goal map turns an objective into a sequence the user can revisit as outcomes arrive.

<img width="1600" height="781" alt="WhatsApp Image 2026-09-29 at 00 15 43" src="https://github.com/user-attachments/assets/91a09157-01cd-4a1a-a695-07b4b1beb983" />

The system has a data path behind those screens. Public connectors collect source material with timestamps and provenance. Normalization resolves company names, dates, periods, currencies, and locations. Deterministic services calculate numeric indicators and detect meaningful changes. An event layer summarizes those changes in terms an analyst can retrieve later. Hindsight stores and recalls that semantic history. Strategy and forecasting services combine it with current evidence; the interface presents the result as a scenario rather than a certainty.

<p align="center">
  <img 
    src="https://github.com/user-attachments/assets/cd602711-5698-4c7f-a565-3383109ade72" 
    alt="Mindra Workflow"
    width="546"
  />
</p>

That separation is the main design decision. I use a database for exact observations and calculations, and Hindsight for contextual history: material events, relationships, goals, forecasts, decisions, and outcomes. Hindsight's [agent memory model](https://vectorize.io/what-is-agent-memory) is useful here because memory needs to do more than retain a transcript. The [Hindsight project on GitHub](https://github.com/vectorize-io/hindsight) and its [developer documentation](https://hindsight.vectorize.io/) describe Retain, Recall, and Reflect: store information, retrieve relevant history, and synthesize over that history.

## A forecast needs a trail, not just a sentence

Suppose a competitor adds enterprise security features, increases enterprise sales hiring, and changes its pricing page over a quarter. A snapshot-based system may show three unrelated updates. Mindra should treat them as dated observations, connect them to a candidate enterprise-expansion pattern, then ask whether earlier sequences make that pattern more meaningful now.

That last step is where Hindsight earns its place. The system retains normalized, material events with company, geography, event type, source tier, timestamp, and source-document references. When another relevant event arrives, Recall can find related history across companies or regions. Reflect can synthesize the retrieved material when a broader comparison is useful. The forecast service receives that history alongside current structured evidence; it does not ask memory to invent a probability.

The boundary matters because the kinds of truth differ. Revenue, reporting periods, units, and derived margins need exact values and repeatable calculations. A memory can make a meaningful sequence easier to find, but it should not become the canonical ledger. For example, “revenue grew 18% year over year while gross margin fell three percentage points” is useful semantic context to recall. The underlying values, source filing, period definitions, and calculation remain structured and auditable.

In the codebase, a pattern already preserves pointers to signals and records its evidence and rationale:

```ts
export interface Pattern {
  id: string;
  competitorId: string;
  name: string;
  confidence: Confidence;
  relatedSignals: string[];
  evidence: string[];
  why: string;
  strategicSignal: string;
}
```

That shape gives the production memory layer a useful contract. Retained events can link back to the signal and source that produced them; retrieved memories can strengthen or weaken a pattern without replacing its evidence. An analyst should be able to ask, “Which observations support this connection?” and move from the forecast to the pattern, from the pattern to dated events, and from those events to the original sources.

<img width="1600" height="844" alt="WhatsApp Image 2026-09-29 at 00 17 45" src="https://github.com/user-attachments/assets/91d8ea07-cfdf-4375-a486-0d58f6ac946d" />


The repository's scenario workflow expresses the same idea in miniature: select a pattern, carry its evidence forward, and attach a historical analogy. In a completed implementation, the analogy comes from recalled history rather than a generated template, and evidence records include both support and counter-evidence. The UI should label analogy as analogy. A prior sequence preceding a launch does not prove that the same sequence caused another launch.

## Keep probability separate from confidence

I want forecasts to answer a concrete set of questions: what could happen, in which market, over what horizon, and on what evidence? Probability and confidence answer different questions. Probability estimates whether the event happens under the current model. Confidence describes how reliable that estimate is given source quality, coverage, model agreement, and the number of comparable histories.

That distinction prevents a familiar failure: a polished narrative can sound certain even when it rests on thin or conflicting evidence. A forecast card should expose its evidence, counter-evidence, historical analogs, horizon, confidence, and invalidation conditions. An explicit forecasting ensemble can combine trend and change-point features, capability signals, competitive dynamics, quantitative data where appropriate, and memory-based analogs. Hindsight supplies relevant history; the forecast model remains responsible for its probability.

The forecast page is designed around that evidence path. A scenario is displayed as a possibility with a horizon and traceable support, not as a promise. When an analyst opens the historical analogy, the useful view is not merely a similarity score. It is the dated sequence that led to the score and the evidence that does not fit.

## Memory only gets better when the loop closes

Retain and Recall make history available; they do not by themselves make a system learn. For that, Mindra records what the user did and what happened next. A forecast can be marked resolved against an observed outcome. A goal can be compared with its target. The outcome is retained with its source and linked back to the forecast or action. Evaluation can then measure whether forecasts were calibrated and whether retrieved histories were relevant.

This is why the goal map belongs in the same workflow as competitor analysis. A user might set a target such as entering a regional market within six months. The system can lay out steps—clarify a customer segment, benchmark competitors, validate a use case, enter through local partners, then measure traction. When results differ from expectations, the next analysis has that outcome as context. The map is a working itinerary, not a claim that the future is known.

<img width="1550" height="865" alt="WhatsApp Image 2026-09-29 at 00 18 14" src="https://github.com/user-attachments/assets/89b45128-d54b-4ac8-9f66-7b7775e040a0" />


At the system boundary, I keep numeric truth deterministic and semantic recall contextual. I keep observations separate from interpretations. I also keep user and organization scope explicit: cross-company recall is valuable for market comparisons, while the memory boundary must still respect workspace isolation. Those constraints make the memory useful without making it a catch-all store for every source row or conversation.

## What I learned

**Define what deserves to be remembered.** Retaining every API response produces a noisy memory. Normalize sources and entities first, detect material changes, and retain concise events with provenance.

**Keep the numeric record outside semantic memory.** Store values, units, periods, and source documents where calculations can be repeated. Use memory to find relevant meaning across time.

**Make every inference inspectable.** An observation, an event summary, a pattern, and a forecast are different objects. Preserve those distinctions in both the data model and interface.

**Use historical analogies as evidence, not proof.** Similar past sequences can inform a scenario, but they do not establish causality. Show the mismatch and counter-evidence as well as the resemblance.

**Close the loop with outcomes.** Without resolved forecasts and measured results, a system has persistence, not learning. Outcome records make calibration and later evaluation possible.

The test I use for Mindra is simple: can an analyst follow a recommendation backward through the scenario, pattern, recalled history, and source evidence—and disagree at the right step? Hindsight gives the system a durable way to carry history forward. The engineering work is deciding what merits memory, retrieving it in the right context, and making the resulting reasoning easy to challenge.
