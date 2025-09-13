export const siteConfig = {
    name: "Krishi Mitar",
    description: "Your AI-powered companion for modern farming. Get instant advice, diagnose crop issues, and access a wealth of agricultural knowledge.",
    nav: [
        { id: 'advice', href: "/advice", label: "Get Advice" },
        { id: 'dashboard', href: "/dashboard", label: "Dashboard" },
        { id: 'diagnose', href: "/diagnose", label: "Diagnose" },
        { id: 'library', href: "/library", label: "Library" },
        { id: 'history', href: "/history", label: "History" },
    ],
    cta: {
        home: "Get Started",
        getAdvice: "Get Advice",
        diagnose: "Diagnose",
    },
    dashboard: {
        weather: {
            title: "Weather",
        },
        quickActions: {
            title: "Quick Actions",
            description: "Get started with our AI tools",
            diagnose: {
                title: "Diagnose Plant",
                description: "Upload an image to check health",
            },
            advice: {
                title: "Get Advice",
                description: "Ask our AI for farming tips",
            },
        },
        recentActivity: {
            title: "Recent Activity",
            description: "A look at your recent queries and advisories.",
        },
    },
    diagnose: {
        title: "Diagnose Plant Health",
        description: "Upload a clear picture of an affected plant leaf or area to get an AI-powered diagnosis.",
        image: {
            upload: "Click to upload an image",
            change: "Image selected. Click to change.",
            formats: "PNG, JPG, or WEBP recommended.",
        },
        results: {
            title: "AI Diagnosis",
            description: "The analysis of your plant will appear here.",
            waiting: "Waiting for image submission...",
        },
        error: {
            title: "Diagnosis Failed",
        }
    },
    advice: {
        title: "AI Farm Advisor",
        description: "Ask questions and get instant agricultural advice.",
        placeholder: "e.g., 'How to prevent blight on tomato plants?'",
        language: {
            placeholder: "Select language",
            options: [
                { value: "en", label: "English" },
                { value: "hi", label: "Hindi" },
                { value: "te", label: "Telugu" },
                { value: "mr", label: "Marathi" },
                { value: "ta", label: "Tamil" },
            ]
        },
        voice: {
            start: "Start recording",
            stop: "Stop recording",
        },
        results: {
            title: "AI Recommendation",
            description: "The advice from our AI will appear here.",
            waiting: "Ask a question to get started...",
            audioNotSupported: "Your browser does not support the audio element.",
        },
        error: {
            title: "Failed to get advice",
            voiceNotSupported: {
                title: "Voice search not supported",
                description: "Your browser does not support voice recognition.",
            },
        }
    },
    history: {
        title: "Advisory History",
        description: "Review your past queries and the advice you received.",
    },
    library: {
        title: "Content Library",
        description: "Browse articles, guides, and videos to enhance your farming knowledge.",
    },
    header: {
        account: {
            label: "My Account",
            settings: "Settings",
            support: "Support",
            logout: "Logout",
            language: "Language",
        }
    }
}
