# **5\. State Management**

For this MVP, complex global state management (like Redux or Zustand) is unnecessary. Component-level state (useState, useEffect) will be sufficient to manage UI state, such as the current playback time of an audio file or the selected answers in a quiz. All persistent state (download status, scores) will be read from and written to IndexedDB.
