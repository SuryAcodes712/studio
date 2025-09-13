const translations = {
    en: {
        name: "Krishi Mitra AI",
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
            items: [
                {
                    query: { content: "Tomato Plant Diagnosis" },
                    response: "The plant appears to be suffering from early blight, characterized by the concentric rings on the lower leaves. It's recommended to apply a copper-based fungicide and ensure proper air circulation.",
                    date: "2 days ago",
                },
                {
                    query: { content: "How to deal with aphids on my cabbage?" },
                    response: "Aphids on cabbage can be controlled by introducing natural predators like ladybugs, or by spraying with insecticidal soap. Ensure you spray the undersides of the leaves where aphids tend to congregate.",
                    date: "1 week ago",
                },
                {
                    query: { content: "Best fertilizer for sandy soil?" },
                    response: "For sandy soil, it's best to use a slow-release nitrogen fertilizer. Incorporating organic matter like compost will also help improve water and nutrient retention.",
                    date: "3 weeks ago",
                }
            ]
        },
        library: {
            title: "Content Library",
            description: "Browse articles, guides, and videos to enhance your farming knowledge.",
            items: [
                { title: "Understanding Crop Cycles", description: "A comprehensive guide to seasonal crop planning and rotation." },
                { title: "Mastering Soil Health", description: "Learn how to test and improve your soil for better yields." },
                { title: "Beginner's Guide to Pesticides", description: "Safe and effective application of pesticides for common pests." },
                { title: "Modern Irrigation Techniques", description: "Watch and learn about drip irrigation, sprinklers, and more." },
                { title: "Weekly Market Trends", description: "An analysis of this week's crop prices and market demands." }
            ]
        },
        header: {
            account: {
                label: "My Account",
                settings: "Settings",
                support: "Support",
                logout: "Logout",
            },
            settings: {
                title: "Settings",
                description: "Manage your account and app preferences.",
                language: "Language",
            }
        },
        article: "Article",
        video: "Video",
        guide: "Guide",
    },
    hi: {
        name: "कृषि मित्र एआई",
        description: "आधुनिक खेती के लिए आपका एआई-संचालित साथी। तुरंत सलाह प्राप्त करें, फसल की समस्याओं का निदान करें, और कृषि ज्ञान का खजाना प्राप्त करें।",
        nav: [
            { id: 'advice', href: "/advice", label: "सलाह लें" },
            { id: 'dashboard', href: "/dashboard", label: "tableau" },
            { id: 'diagnose', href: "/diagnose", label: "निदान" },
            { id: 'library', href: "/library", label: "पुस्तकालय" },
            { id: 'history', href: "/history", label: "इतिहास" },
        ],
        cta: {
            home: "शुरू हो जाओ",
            getAdvice: "सलाह लें",
            diagnose: "निदान",
        },
        dashboard: {
            weather: {
                title: "मौसम",
            },
            quickActions: {
                title: "त्वरित कार्रवाई",
                description: "हमारे एआई उपकरणों के साथ आरंभ करें",
                diagnose: {
                    title: "पौधे का निदान करें",
                    description: "स्वास्थ्य जांचने के लिए एक छवि अपलोड करें",
                },
                advice: {
                    title: "सलाह लें",
                    description: "खेती युक्तियों के लिए हमारे एआई से पूछें",
                },
            },
            recentActivity: {
                title: "हाल की गतिविधि",
                description: "आपके हाल के प्रश्नों और सलाहों पर एक नज़र।",
            },
        },
        diagnose: {
            title: "पौधों के स्वास्थ्य का निदान करें",
            description: "एआई-संचालित निदान प्राप्त करने के लिए प्रभावित पौधे के पत्ते या क्षेत्र की एक स्पष्ट तस्वीर अपलोड करें।",
            image: {
                upload: "एक छवि अपलोड करने के लिए क्लिक करें",
                change: "छवि चयनित। बदलने के लिए क्लिक करें।",
                formats: "पीएनजी, जेपीजी, या वेबपी की सिफारिश की जाती है।",
            },
            results: {
                title: "एआई निदान",
                description: "आपके पौधे का विश्लेषण यहां दिखाई देगा।",
                waiting: "छवि प्रस्तुत करने की प्रतीक्षा कर रहा है...",
            },
            error: {
                title: "निदान विफल",
            }
        },
        advice: {
            title: "एआई कृषि सलाहकार",
            description: "प्रश्न पूछें और तत्काल कृषि सलाह प्राप्त करें।",
            placeholder: "जैसे, 'टमाटर के पौधों पर झुलसा कैसे रोकें?'",
            language: {
                placeholder: "भाषा चुनें",
                options: [
                    { value: "en", label: "English" },
                    { value: "hi", label: "हिंदी" },
                    { value: "te", label: "తెలుగు" },
                    { value: "mr", label: "मराठी" },
                    { value: "ta", label: "தமிழ்" },
                ]
            },
            voice: {
                start: "रिकॉर्डिंग शुरू करें",
                stop: "रिकॉर्डिंग बंद करें",
            },
            results: {
                title: "एआई सिफारिश",
                description: "हमारे एआई से सलाह यहां दिखाई देगी।",
                waiting: "शुरू करने के लिए एक प्रश्न पूछें...",
                audioNotSupported: "आपका ब्राउज़र ऑडियो तत्व का समर्थन नहीं करता है।",
            },
            error: {
                title: "सलाह प्राप्त करने में विफल",
                voiceNotSupported: {
                    title: "आवाज खोज समर्थित नहीं है",
                    description: "आपका ब्राउज़र आवाज पहचान का समर्थन नहीं करता है।",
                },
            }
        },
        history: {
            title: "परामर्श इतिहास",
            description: "अपने पिछले प्रश्नों और आपको मिली सलाह की समीक्षा करें।",
            items: [
                {
                    query: { content: "टमाटर के पौधे का निदान" },
                    response: "पौधे में प्रारंभिक झुलसा से पीड़ित प्रतीत होता है, जिसकी विशेषता निचली पत्तियों पर संकेंद्रित छल्ले हैं। तांबे पर आधारित कवकनाशी लगाने और उचित वायु परिसंचरण सुनिश्चित करने की सिफारिश की जाती है।",
                    date: "2 दिन पहले",
                },
                {
                    query: { content: "मेरे गोभी पर एफिड्स से कैसे निपटें?" },
                    response: "गोभी पर एफिड्स को लेडीबग्स जैसे प्राकृतिक शिकारियों को पेश करके, या कीटनाशक साबुन के साथ छिड़काव करके नियंत्रित किया जा सकता है। सुनिश्चित करें कि आप पत्तियों के नीचे स्प्रे करें जहां एफिड्स एकत्र होते हैं।",
                    date: "1 सप्ताह पहले",
                },
                {
                    query: { content: "रेतीली मिट्टी के लिए सबसे अच्छा उर्वरक?" },
                    response: "रेतीली मिट्टी के लिए, धीमी गति से निकलने वाले नाइट्रोजन उर्वरक का उपयोग करना सबसे अच्छा है। खाद जैसे कार्बनिक पदार्थों को शामिल करने से पानी और पोषक तत्वों की अवधारण में सुधार करने में भी मदद मिलेगी।",
                    date: "3 सप्ताह पहले",
                }
            ]
        },
        library: {
            title: "सामग्री पुस्तकालय",
            description: "अपने खेती के ज्ञान को बढ़ाने के लिए लेख, गाइड और वीडियो ब्राउज़ करें।",
            items: [
                { title: "फसल चक्र को समझना", description: "मौसमी फसल योजना और रोटेशन के लिए एक व्यापक गाइड।" },
                { title: "मृदा स्वास्थ्य में महारत हासिल करना", description: "बेहतर पैदावार के लिए अपनी मिट्टी का परीक्षण और सुधार करना सीखें।" },
                { title: "कीटनाशकों के लिए शुरुआती गाइड", description: "आम कीटों के लिए कीटनाशकों का सुरक्षित और प्रभावी अनुप्रयोग।" },
                { title: "आधुनिक सिंचाई तकनीकें", description: "ड्रिप सिंचाई, स्प्रिंकलर, और बहुत कुछ के बारे में देखें और जानें।" },
                { title: "साप्ताहिक बाजार के रुझान", description: "इस सप्ताह की फसल की कीमतों और बाजार की मांगों का विश्लेषण।" }
            ]
        },
        header: {
            account: {
                label: "मेरा खाता",
                settings: "समायोजन",
                support: "सहयोग",
                logout: "लॉग आउट",
            },
            settings: {
                title: "समायोजन",
                description: "अपने खाते और ऐप वरीयताओं का प्रबंधन करें।",
                language: "भाषा",
            }
        },
        article: "लेख",
        video: "वीडियो",
        guide: "गाइड",
    }
};

export type Translations = typeof translations.en;
export type LanguageCode = keyof typeof translations;

export const availableLanguages = Object.keys(translations).map(code => ({
    code,
    name: translations[code as LanguageCode].header.settings.language,
}));

export function getTranslations(lang: LanguageCode): Translations {
    return translations[lang] || translations.en;
}
