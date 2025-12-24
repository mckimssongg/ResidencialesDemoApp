I will rebrand the application to **"Residenciales Patos"** and implement the full feature set using the specified "Zero UI" design with real icons.

### 1. Rebranding & System Fixes
*   **Rename:** Change all instances of "Vivook" to "Residenciales Patos" in the Header, Config, and Page Titles.
*   **Fix Navigation & Plugins:**
    *   Implement `QDrawer` for the desktop sidebar and fix the hamburger menu.
    *   Register all routes (`/`, `/finanzas`, `/solicitudes`, `/reservas`, `/seguridad`) to fix the Android navigation bar.
    *   *Reminder:* You will need to restart the dev server for the `$q.dialog` errors to resolve after I finish.

### 2. Module Implementation (No Emojis - Real Icons)

*   **1. Communication (Home/Feed):**
    *   **View:** Chronological feed of posts.
    *   **Features:** Create Post modal (Title, Body, Category), Attachments (mocked), Interaction counters (`chat_bubble`, `visibility`).
*   **2. Finance (Enhancements):**
    *   **Update:** Add the **"Descargar Estado de Cuenta"** (Download PDF) button with a simulated download action.
    *   **Fix:** Ensure the "Pay" flow works without errors.
*   **3. Requests (Tickets):**
    *   **View:** Tabbed interface (Pendiente, En Proceso, Cerrado).
    *   **Features:** FAB to create tickets with "Photo Evidence" (file picker), Status chips using strictly defined colors.
*   **4. Reservations:**
    *   **View:** Facility carousel + `QDate` Calendar.
    *   **Features:** "Reglamento" modal and "Block" logic (prevent selecting occupied days).
*   **5. Security & Directory:**
    *   **Implementation:** Add a "Security" section (or quick access in the Drawer) with **Call Buttons** (`call`, `local_police`) for Vigilance and Administration.

### 3. Android Layout Optimization
*   **SafeArea:** Fix the "weird" layout issues by ensuring proper padding for the status bar and bottom navigation notch.
*   **Consistency:** Standardize headers and font sizes across all new pages.
