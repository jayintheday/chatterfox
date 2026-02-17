# ChatterFox Fork Conversion Tracker

## Overview

ChatterFox is a fork of [Handy](https://github.com/cjpais/Handy), a cross-platform speech-to-text app.
We are re-applying all ChatterFox customisations onto the upstream v0.7.6 baseline (the fork's starting point).

**Working directory:** `/Users/vijay/Desktop/TestRepo/chatterfox`
**Archive (old work):** `/Users/vijay/Desktop/TestRepo/Handy-main` — do not edit
**Upstream remote:** `https://github.com/cjpais/Handy.git`
**Fork remote:** `https://github.com/jayintheday/chatterfox.git`

---

## Why We're Re-Applying (Not Patching)

The old work was done on Handy v0.7.2. The fork started at v0.7.6. The upstream changed
too many of the same files for an automated patch to apply cleanly. Re-applying commit-by-commit
onto v0.7.6 gives us a clean, modern base and avoids carrying forward stale diffs.

---

## Phases

### Phase 1 — Branding & Theme
**Source commit:** `a5a6612` ("fixed colour themes") in Handy-main
**Status:** 🔲 Not started

Re-apply all visual/branding changes that make this ChatterFox:

- [ ] `tauri.conf.json` — app name, identifier, window title
- [ ] `package.json` — package name
- [ ] `src-tauri/Cargo.toml` — crate name
- [ ] `src-tauri/src/lib.rs` — log file name, any branding refs
- [ ] `src-tauri/src/tray.rs` — tray menu "ChatterFox" label
- [ ] `index.html` — page title
- [ ] `tailwind.config.js` — custom theme tokens
- [ ] `src/App.css` — full redesigned color scheme and `@theme {}` block
- [ ] `src/App.tsx` — ChatterFox layout/wrapper changes
- [ ] `src/components/icons/ChatterFoxLogo.tsx` — **new file**
- [ ] `src/components/icons/FoxIcon.tsx` — **new file**
- [ ] `src/components/Sidebar.tsx` — ChatterFox sidebar with fox logo
- [ ] `src/components/ui/AtmosphericBackground.tsx` — **new file**
- [ ] `src/components/ui/IconBadge.tsx` — **new file**
- [ ] `src/components/ui/Button.tsx` — restyled
- [ ] `src/components/ui/Input.tsx` — restyled
- [ ] `src/components/ui/Select.tsx` — restyled
- [ ] `src/components/ui/SettingContainer.tsx` — restyled
- [ ] `src/components/ui/SettingsGroup.tsx` — restyled
- [ ] `src/components/ui/ToggleSwitch.tsx` — restyled
- [ ] `src/components/ui/Tooltip.tsx` — restyled
- [ ] `src/components/ui/Slider.tsx` — restyled
- [ ] `src/components/ui/Badge.tsx` — restyled
- [ ] `src/components/ui/AudioPlayer.tsx` — restyled
- [ ] `src/components/ui/TextDisplay.tsx` — restyled
- [ ] `src/components/ui/Textarea.tsx` — restyled
- [ ] `src/components/ui/PathDisplay.tsx` — restyled
- [ ] `src/components/ui/ResetButton.tsx` — restyled
- [ ] `src/components/ui/Dropdown.tsx` — restyled
- [ ] `src/components/settings/ThemeSwitcher.tsx` — **new file**
- [ ] `src/components/settings/GlobalShortcutInput.tsx` — restyled
- [ ] `src/components/settings/HandyKeysShortcutInput.tsx` — restyled
- [ ] `src/components/settings/CustomWords.tsx` — restyled
- [ ] `src/components/settings/HistoryLimit.tsx` — restyled
- [ ] `src/components/settings/LanguageSelector.tsx` — restyled
- [ ] `src/components/settings/about/AboutSettings.tsx` — restyled
- [ ] `src/components/settings/history/HistorySettings.tsx` — restyled
- [ ] `src/components/settings/models/ModelsSettings.tsx` — restyled
- [ ] `src/components/AccessibilityPermissions.tsx` — restyled
- [ ] `src/components/footer/Footer.tsx` — restyled
- [ ] `src/components/shared/ProgressBar.tsx` — restyled
- [ ] `src/components/update-checker/UpdateChecker.tsx` — restyled
- [ ] `src/components/onboarding/AccessibilityOnboarding.tsx` — restyled
- [ ] `src/components/onboarding/ModelCard.tsx` — restyled
- [ ] `src/components/onboarding/Onboarding.tsx` — ChatterFox onboarding changes
- [ ] `src/overlay/RecordingOverlay.css` — ChatterFox overlay styling
- [ ] `src/overlay/SuccessOverlay.tsx` — **new file**
- [ ] `src/overlay/index.html` — overlay branding
- [ ] `src/overlay/main.tsx` — overlay changes
- [ ] All 16 `src/i18n/locales/*/translation.json` — added ChatterFox translation keys

---

### Phase 2 — Model Selector Simplification
**Source commit:** `e87d39d` ("Removed model dependencies") in Handy-main
**Status:** 🔲 Not started

Simplify the model selector to remove complex multi-model management UI:

- [ ] `src-tauri/src/managers/model.rs` — simplified model manager
- [ ] `src/components/model-selector/ModelSelector.tsx` — simplified
- [ ] `src/components/model-selector/ModelStatusButton.tsx` — simplified
- [ ] `src/components/model-selector/ModelDropdown.tsx` — **deleted**
- [ ] `src/components/model-selector/index.ts` — remove deleted export
- [ ] `src/components/onboarding/Onboarding.tsx` — remove model-selection step
- [ ] `src/components/onboarding/index.ts` — remove deleted exports
- [ ] `src/components/settings/general/GeneralSettings.tsx` — remove model selector ref
- [ ] `src/components/settings/index.ts` — remove deleted exports
- [ ] `src/i18n/locales/en/translation.json` — remove model-related strings
- [ ] `src/App.css` — remove model-related styles

---

### Phase 3 — Remove Experimental Features
**Source commit:** `e9415ac` ("Removed experimental settings") in Handy-main
**Status:** 🔲 Not started

Remove post-processing (LLM) and keyboard implementation selector. We did this work
in full detail on Handy-main, so we know exactly what to change.

**Files to delete:**
- [ ] `src/components/settings/ExperimentalToggle.tsx`
- [ ] `src/components/settings/PostProcessingToggle.tsx`
- [ ] `src/components/settings/PostProcessingSettingsPrompts.tsx`
- [ ] `src/components/settings/debug/KeyboardImplementationSelector.tsx`
- [ ] `src/components/settings/post-processing/` (entire directory)
- [ ] `src/components/settings/PostProcessingSettingsApi/` (entire directory)
- [ ] `src-tauri/src/llm_client.rs`

**Files to modify:**
- [ ] `src/components/settings/advanced/AdvancedSettings.tsx`
- [ ] `src/components/Sidebar.tsx`
- [ ] `src/components/settings/index.ts`
- [ ] `src/stores/settingsStore.ts`
- [ ] `src-tauri/src/settings.rs`
- [ ] `src-tauri/src/shortcut/mod.rs`
- [ ] `src-tauri/src/shortcut/handy_keys.rs`
- [ ] `src-tauri/src/shortcut/tauri_impl.rs`
- [ ] `src-tauri/src/actions.rs`
- [ ] `src-tauri/src/lib.rs`
- [ ] `src-tauri/src/managers/history.rs`
- [ ] `src-tauri/src/tray.rs`

> **Note:** This phase has detailed reference work in Handy-main. Read the plan at
> `/Users/vijay/.claude/plans/velvety-nibbling-storm.md` if needed.

---

## Verification Checklist (run after each phase)

- [ ] `bun run lint` — no TypeScript errors
- [ ] `bun run format:check` — Prettier + cargo fmt clean
- [ ] `CMAKE_POLICY_VERSION_MINIMUM=3.5 bun run tauri dev` — app launches

---

## Upstream Sync Process

When Handy releases a new version:

```bash
cd /Users/vijay/Desktop/TestRepo/chatterfox
git fetch upstream
git merge upstream/main
# Resolve any conflicts, then:
git push origin main
```

Conflicts will most likely occur in files we've heavily modified (App.css, settings.rs, Sidebar.tsx).
Resolve by keeping ChatterFox changes and incorporating any upstream fixes.
