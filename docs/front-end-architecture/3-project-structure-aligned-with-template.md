# **3\. Project Structure (Aligned with Template)**

The project structure will be adapted to the provided Next.js template, leveraging its route groups and component organization.

/  
└── src/  
    ├── app/  
    │   ├── (sidebar)/              \# Route group for main app layout  
    │   │   ├── course/  
    │   │   │   ├── \[moduleId\]/  
    │   │   │   │   ├── \[contentId\]/  
    │   │   │   │   │   └── page.tsx  
    │   │   │   │   └── page.tsx      \# Module View Page  
    │   │   │   └── page.tsx          \# Course Home Page  
    │   │   └── layout.tsx            \# Sidebar layout  
    │   ├── api/  
    │   └── layout.tsx                \# Root layout  
    ├── components/  
    │   ├── AudioPlayer.tsx           \# (New component)  
    │   ├── ModuleListItem.tsx        \# (New component)  
    │   └── ... (existing components)  
    ├── data/  
    │   ├── course.ts                 \# Type-safe course structure & data  
    │   └── ... (existing data files)  
    └── lib/  
        └── ... (existing utility files)
