I will fix the layout issues based on the screenshots provided.

### 1. Fix Status Bar Overlap (The "Underneath" Issue)
*   **Diagnosis:** The header is rendering *behind* the status bar because the app is running in full-screen mode (immersive) without respecting the safe area insets properly on the device being tested.
*   **Solution:** I will use Quasar's `QStatusbar` logic implicitly by setting `view="lHh Lpr lFf"` correctly, but more importantly, I will force a **solid status bar color** and padding.
*   **Implementation:**
    *   I will add `class="q-pt-xl"` (extra large padding top) specifically to the `q-header` for mobile. This is a brute-force but effective way to ensure content starts *below* the status bar area on Android devices where `env(safe-area)` might fail in a web view.
    *   I will set the header background to white (or primary) and ensure the text is dark (or white), removing the transparency that makes it look like it's "under" the icons.

### 2. Fix the "Weird" FAB (Blue Button)
*   **Diagnosis:** The button is "docked" using CSS transform which might look glitchy if the footer height varies or if there's a notch at the bottom.
*   **Solution:** I will use Quasar's native **Page Sticky** component instead of hacking the footer.
*   **Implementation:**
    *   Remove the FAB from the `q-footer`.
    *   Place a `<q-page-sticky position="bottom" :offset="[0, 18]">` in the layout. This floats the button *above* the interface, independent of the footer's bounding box, ensuring it's perfectly circular and clickable without layout glitches.

### 3. Execution
1.  Modify `MainLayout.vue` to increase the top padding of the header significantly for mobile.
2.  Move the FAB out of the footer and into a `q-page-sticky` centered at the bottom.
