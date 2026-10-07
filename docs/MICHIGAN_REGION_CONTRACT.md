# Michigan wine region contract

The Petoskey repository is authoritative for Petoskey-area winery records, official-region membership, hours and local routing.

`scripts/build-region-contract.mjs` derives a compact `public/region-contract.json` during build. The statewide Michigan Wine Day engine consumes that comparison contract instead of copying the full Petoskey winery dataset.

The contract exposes inventory coverage, positive wine-intent evidence, local-drive characteristics, freshness, unknown-data semantics and validated three-stop starter presets. The Petoskey planner remains responsible for the actual road route and posted-hours schedule after handoff.

Unknown hours remain unknown/call-ahead; they are never converted to closed.
