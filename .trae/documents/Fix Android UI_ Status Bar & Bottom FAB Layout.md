I will fix the UI issues on Android by modifying `MainLayout.vue`.

### 1. Fix Status Bar Overlap (Top)
The "app confusing with notifications" issue is due to the app content rendering under the system status bar (notch area).
*   **Action:** I will apply `padding-top: env(safe-area-inset-top)` to the Mobile `q-header`. This standard CSS variable ensures the header content starts *below* the notch/status bar on any device.
*   **Refinement:** I will also increase the height of the header slightly to accommodate this padding gracefully.

### 2. Fix "Blue Artifact" in Footer (Bottom)
The "blue thing" is the Floating Action Button (FAB) being clipped or mispositioned because it was embedded directly inside the `q-tabs` container.
*   **Action:** I will remove the FAB from the `q-footer`'s tab flow.
*   **New Implementation:** I will use a `q-page-sticky` component positioned at the **bottom-center** of the screen. This ensures the button "floats" above the tab bar (creating the docked look) without being cut off by the footer's boundaries.
*   **Layout:** I will keep a "dummy" invisible tab in the center of the bottom bar so the FAB doesn't cover any navigation icons.

### 3. Verification
*   I will ensure the `q-footer` also respects the bottom safe area (`env(safe-area-inset-bottom)`) so the navigation bar doesn't sit too close to the phone's home indicator.
