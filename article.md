# I Made Hindsight Show Its Evidence, Not Just Its Answer

The hardest part of competitor intelligence is not collecting another announcement. It is explaining why today’s announcement matters when the evidence is spread across months of small changes. I built Hindsight into that gap: the system keeps a durable history of observations and lets an analyst follow a conclusion back to the events that support it.

## From events to a usable history

The application follows a simple path. We track a competitor and the categories we care about, collect changes in pricing, product, hiring, messaging, and strategy, then turn those changes into patterns, briefs, and forecasts. The code reflects those layers: shared records live in `src/lib/types.ts`, transformations sit in `src/lib/dataEngine.ts` and `src/lib/workflow.ts`, and pages such as Signals, Patterns, Forecast, and Competitor Memory present different views over the same underlying information.

That separation matters because an alert and an explanation are different things. “A new enterprise role appeared” is an event. “This is part of a sustained push into enterprise” is an interpretation that should be supported by earlier events. If the system only stores the interpretation, it is difficult to audit. If it only stores the events, an analyst has to reconstruct the history by hand.

I use [Hindsight’s agent memory system](https://vectorize.io/what-is-agent-memory) as the durable layer between those two needs. It gives the application a way to retain observations across interactions and retrieve relevant historical context when a new signal arrives. The interface can then show a pattern as a claim with a history, rather than as an isolated generated sentence. Hindsight’s [memory documentation](https://hindsight.vectorize.io/) describes the capabilities and integration surface; the important design choice here is to make retrieved context visible in the product instead of treating memory as hidden prompt state.

## The through-line: preserve the path to the conclusion

The first design decision was to keep signals, patterns, and briefs as distinct records. A signal has a competitor, category, timestamp, source, importance, and description. A pattern carries references to related signals as well as its confidence, evidence, and rationale. A brief is then a compact presentation of the selected pattern. This gives us a chain we can traverse in either direction: from an analyst-facing statement back to the observations that support it.

The current pattern shape makes that relationship explicit:

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

In the completed system, Hindsight supplies persistent memory across those records and time boundaries. The application writes normalized observations with their provenance, then retrieves related context when new evidence comes in. We still keep the application’s domain records explicit. Memory retrieval can find useful context, but it should not erase which source produced an event or which observations a pattern references. That boundary makes it possible to inspect and correct the interpretation without confusing recall with fact.

This is also why I avoid building the memory view as a separate “AI answer” surface. Competitor Memory selects a competitor, obtains its associated signals and patterns, and renders a graph. In the production version, the graph represents durable relationships recovered from Hindsight: an observation can connect to a recurring pattern, and a new event can be compared with relevant history. Clicking a node should answer a practical question: what was observed, when, and why is it connected to this conclusion?

## A deterministic boundary helped me find the real model

The repository currently has a local data engine. Its signals are generated from a competitor-specific seed, which makes the same competitor produce repeatable event categories and titles:

```ts
for (const comp of competitors) {
  const rng = seededRandom(hashString(comp.id));
  const count = Math.floor(rng() * 8) + 5;
  const categories = comp.trackingCategories.length > 0
    ? comp.trackingCategories
    : SIGNAL_TYPES;
```

Production collection replaces those generated events with sourced observations, but the deterministic boundary was useful during design. It let me exercise the same screens and transformations repeatedly while deciding which facts each layer needed. More importantly, it exposed the shape of the domain: a signal needs stable identity and provenance; patterns need references, not just prose; a brief should be derivable from a pattern rather than becoming a second source of truth.

The current store also makes the dependency chain easy to see. It produces signals, derives patterns from those signals, derives briefs from patterns, and computes competitor statistics from the same inputs. Persisting competitor records in local storage is a simple boundary today; in the finished service, persistent application storage and Hindsight memory take over their respective responsibilities. The key is to retain the same one-way derivation where possible. If a brief is regenerated, it should not silently rewrite the underlying observations.

One bug-shaped lesson came from looking closely at “deterministic” data. The seeded generator controls category and template selection, while its timestamp helper uses `Math.random()`. So the feed can look repeatable at a glance but still move in time between runs. That distinction matters for any system that reasons about sequences. In production, timestamps come from source events and ingestion metadata, not a convenience generator. During local development, deterministic fixtures need to control time as well as content if we want to reproduce ordering bugs.

## Replay is an explanation, not decoration

The repository includes a Memory Replay component that animates a sequence of hiring, messaging, product, and market expansion events. The useful idea is not the animation; it is the ability to replay a historical sequence and compare it with what is unfolding now. In the finished experience, those steps come from dated observations retrieved from memory, not a fixed array. An analyst can inspect the earlier sequence and see which parts resemble the current one, without treating resemblance as proof that the future will repeat exactly.

That distinction shapes the forecast layer too. The current workflow derives a scenario from a competitor’s highest-scoring pattern, carries over the evidence, and exposes confidence and a time horizon. The production version uses Hindsight to retrieve historical analogs for the pattern and includes those analogs beside the forecast. Retrieval gives the system context; it does not justify false precision. A forecast remains a hypothesis, and the analyst should be able to inspect both its supporting evidence and the memory it drew on.

For example, suppose a tracked competitor adds several engineering roles, changes its homepage toward a regulated industry, and publishes a product page for a related enterprise feature. A signal feed presents each event separately. Pattern analysis can connect them as a possible enterprise push. Hindsight helps recover prior observations about that competitor and similar sequences, while the memory graph gives the analyst a route through those connections. The resulting brief might say the evidence is consistent with an enterprise focus, list the events, and show confidence. It should not claim that a launch is certain just because an earlier sequence looked similar.

## What I learned

**Keep evidence addressable.** A paragraph is easy to generate and hard to audit. Give observations stable identities and let higher-level records point back to them.

**Treat memory as context with provenance.** Retrieval is valuable when it finds the right history, but the interface should still distinguish a source observation from a retrieved association and from an inferred pattern.

**Make time a first-class field.** Sequence-based reasoning depends on event time, ingestion time, and ordering. A plausible timeline is not enough; it must be reproducible and traceable to sources.

**Make the analyst’s next question easy.** A useful brief should lead naturally to “show me the events behind that.” Memory graphs and replay are valuable when they shorten that path, not when they merely make the screen look active.

**Keep predictions defeasible.** Historical analogs can sharpen a forecast, but they do not turn a forecast into a fact. Confidence and evidence belong beside the claim.

The engineering work in this project is ultimately about resisting an attractive shortcut: storing only the latest conclusion. Hindsight is useful because it lets the system carry relevant history forward, but the application still has to make that history inspectable. When a competitor’s behavior changes, I want the analyst to see not just what the system thinks, but which observations caused it to think so—and where the analogy might stop holding.

For engineers building systems that make decisions from a changing stream of events, that is the standard I would keep: persist the evidence, retrieve context deliberately, and make every important conclusion lead back to something a person can check.


## Application Screenshots

![Screenshot 1](Screenshot%202026-09-29%20001415.png)

![Screenshot 2](Screenshot%202026-09-29%20001615.png)

![Screenshot 3](Screenshot%202026-09-29%20001709.png)

![Screenshot 4](Screenshot%202026-09-29%20001737.png)

![Screenshot 5](Screenshot%202026-09-29%20001807.png)

![Screenshot 6](Screenshot%202026-09-29%20002001.png)

![Screenshot 7](Screenshot%202026-09-29%20002038.png)

![Screenshot 8](Screenshot%202026-09-29%20002105.png)
