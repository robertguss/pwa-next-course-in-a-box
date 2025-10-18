# **UI/UX Specification: Course-in-a-Box PWA (MVP)**

### **1\. Overview**

This document provides the user experience (UX) and user interface (UI) guidelines for the "Course-in-a-Box" PWA proof-of-concept. The design prioritizes simplicity, clarity, and ease of use for a mobile-first, offline-first context. The target user, "James," is tech-savvy but has limited internet access, requiring an interface that is intuitive and self-explanatory.

### **2\. User Flow**

The user journey is designed to be linear and straightforward, minimizing cognitive load.

1. **Course Home Screen:** The user's entry point. This screen lists all available course modules and provides functionality for downloading them.  
2. **Module View Screen:** Accessed by tapping a downloaded module. This screen lists all content items within that specific module (lectures, readings, quizzes).  
3. **Content Screens:** Accessed by tapping an item in the Module View. These are the individual screens where the user consumes content (Audio Player, Reading View, Quiz View). Navigation is hierarchical, with a clear "Back" button to return to the previous screen.

### **3\. Wireframes**

These low-fidelity wireframes define the core layout and structure of each screen.

**3.1 Wireframe: Course Home Screen**

\+-------------------------------------------+  
| \[Header\] My Theology Course               |  
\+-------------------------------------------+  
|                                           |  
|  \[Module Title\] Week 1: Introduction      |  
|                                \[Download\] |  
|  \---------------------------------------  |  
|                                           |  
|  \[Module Title\] Week 2: Early Church      |  
|                                \[Download\] |  
|  \---------------------------------------  |  
|                                           |  
|  \[Module Title\] Week 3: Reformation       |  
|  (Downloading... 45%) \[\#\#\#\#\#\#\#\#\#    \]     |  
|  \---------------------------------------  |  
|                                           |  
|  \[Module Title\] Week 4: Modern Era        |  
|  (Downloaded)                     \[✓\] \>   |  
|  \---------------------------------------  |  
|                                           |  
\+-------------------------------------------+

**3.2 Wireframe: Module View Screen**

\+-------------------------------------------+  
| \[ \< Back \] Week 4: Modern Era             |  
\+-------------------------------------------+  
|                                           |  
|  \[Icon\] Lecture 4.1 (Audio)           \>   |  
|  \---------------------------------------  |  
|                                           |  
|  \[Icon\] Required Reading              \>   |  
|  \---------------------------------------  |  
|                                           |  
|  \[Icon\] Supplementary PDF             \>   |  
|  \---------------------------------------  |  
|                                           |  
|  \[Icon\] Week 4 Quiz                   \>   |  
|  \---------------------------------------  |  
|                                           |  
\+-------------------------------------------+

**3.3 Wireframe: Audio Player Screen**

\+-------------------------------------------+  
| \[ \< Back \] Lecture 4.1                    |  
\+-------------------------------------------+  
|                                           |  
|      \[Now Playing Title\]                  |  
|      The Impact of Modernism              |  
|                                           |  
|   04:15 \[==================O======\] 25:30  |  
|                                           |  
|              ( Play/Pause )               |  
|                                           |  
\+-------------------------------------------+

### **4\. High-Fidelity Design & UI System**

The visual design is clean, modern, and focused on readability and intuitive interaction.

* **Color Palette:**  
  * **Primary:** \#FFFFFF (White) \- for backgrounds.  
  * **Accent:** \#007AFF (Blue) \- for buttons, links, and interactive elements.  
  * **Text:** \#1C1C1E (Near Black) \- for high contrast and readability.  
  * **Secondary/Borders:** \#E5E5EA (Light Gray) \- for separators and subtle UI elements.  
  * **Success:** \#34C759 (Green) \- for confirmation indicators like the "Downloaded" checkmark.  
* **Typography:**  
  * **Font Family:** A system standard sans-serif font (e.g., Inter, Roboto, San Francisco) to ensure legibility and a native feel.  
  * **Headings:** Bold, 24pt.  
  * **Body Text:** Regular, 17pt.  
  * **Button Text:** Medium, 17pt.  
* **Iconography:**  
  * Icons should be simple, line-art style, and universally recognizable (e.g., a downward arrow for download, a checkmark for completion, a play symbol for audio).  
* **Components:**  
  * **Buttons:** Solid fill for primary actions (Download), with a minimum tap target size of 44x44px.  
  * **Lists:** Clear separators between tappable rows.  
  * **Status Indicators:** Use a combination of text, color, and iconography to show download status clearly (e.g., "Downloading..." text next to a circular progress bar).