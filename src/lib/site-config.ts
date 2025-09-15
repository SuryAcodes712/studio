const translations = {
    en: {
        name: "Krishi Mitra AI",
        description: "Your AI-powered companion for modern farming. Get instant advice, diagnose crop issues, and access a wealth of agricultural knowledge.",
        languageName: "English",
        nav: [
            { id: 'chat', href: "/chat", label: "Chat" },
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
        chat: {
            title: "What can I help with?",
            placeholder: "Ask anything",
            upload: {
                title: "Add photos & files",
                description: "Upload images or PDF documents"
            },
            error: {
                title: "Something went wrong",
                fileRead: "There was an error reading the file.",
                noFile: "Please upload a file first.",
            }
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
                    title: "Chat with AI",
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
        schemes: {
            title: "Govt. Scheme Helper",
            description: "Upload a scheme document (PDF) and ask questions to understand it better.",
            placeholder: "e.g., 'What is the eligibility criteria for this scheme?'",
            results: {
                waiting: "Upload a document and ask a question to see the analysis here.",
            },
            error: {
                title: "Analysis Failed",
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
        languageName: "हिंदी",
        nav: [
            { id: 'chat', href: "/chat", label: "बातचीत" },
            { id: 'dashboard', href: "/dashboard", label: "डैशबोर्ड" },
            { id: 'diagnose', href: "/diagnose", label: "निदान" },
            { id: 'library', href: "/library", label: "पुस्तकालय" },
            { id: 'history', href: "/history", label: "इतिहास" },
        ],
        cta: {
            home: "शुरू हो जाओ",
            getAdvice: "सलाह लें",
            diagnose: "निदान",
        },
        chat: {
            title: "मैं कैसे मदद कर सकता हूँ?",
            placeholder: "कुछ भी पूछें",
            upload: {
                title: "तस्वीरें और फ़ाइलें जोड़ें",
                description: "छवियां या पीडीएफ दस्तावेज़ अपलोड करें"
            },
            error: {
                title: "कुछ गलत हो गया",
                fileRead: "फ़ाइल पढ़ने में एक त्रुटि थी।",
                noFile: "कृपया पहले एक फ़ाइल अपलोड करें।",
            }
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
                    title: "एआई से चैट करें",
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
        schemes: {
            title: "सरकारी योजना सहायक",
            description: "एक योजना दस्तावेज़ (पीडीएफ) अपलोड करें और इसे बेहतर ढंग से समझने के लिए प्रश्न पूछें।",
            placeholder: "जैसे, 'इस योजना के लिए पात्रता मानदंड क्या है?'",
            results: {
                waiting: "विश्लेषण यहाँ देखने के लिए एक दस्तावेज़ अपलोड करें और एक प्रश्न पूछें।",
            },
            error: {
                title: "विश्लेषण विफल",
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
    },
    mr: {
        name: "कृषी मित्र एआय",
        description: "आधुनिक शेतीसाठी तुमचा एआय-समर्थित सोबती. त्वरित सल्ला मिळवा, पिकांच्या समस्यांचे निदान करा आणि कृषी ज्ञानाचा खजिना मिळवा.",
        languageName: "मराठी",
        nav: [
            { id: 'chat', href: "/chat", label: "गप्पा" },
            { id: 'dashboard', href: "/dashboard", label: "डॅशबोर्ड" },
            { id: 'diagnose', href: "/diagnose", label: "निदान" },
            { id: 'library', href: "/library", label: "लायब्ररी" },
            { id: 'history', href: "/history", label: "इतिहास" },
        ],
        cta: {
            home: "सुरुवात करा",
            getAdvice: "सल्ला मिळवा",
            diagnose: "निदान करा",
        },
        chat: {
            title: "मी कशा प्रकारे मदत करू शकेन?",
            placeholder: "काहीही विचारा",
            upload: {
                title: "फोटो आणि फाइल्स जोडा",
                description: "प्रतिमा किंवा पीडीएफ दस्तऐवज अपलोड करा"
            },
            error: {
                title: "काहीतरी चूक झाली",
                fileRead: "फाइल वाचण्यात त्रुटी आली.",
                noFile: "कृपया प्रथम एक फाइल अपलोड करा.",
            }
        },
        dashboard: {
            weather: {
                title: "हवामान",
            },
            quickActions: {
                title: "द्रुत क्रिया",
                description: "आमच्या एआय साधनांसह प्रारंभ करा",
                diagnose: {
                    title: "वनस्पतीचे निदान करा",
                    description: "आरोग्य तपासण्यासाठी एक प्रतिमा अपलोड करा",
                },
                advice: {
                    title: "एआयशी गप्पा मारा",
                    description: "शेतीच्या टिप्ससाठी आमच्या एआयला विचारा",
                },
            },
            recentActivity: {
                title: "अलीकडील क्रियाकलाप",
                description: "तुमच्या अलीकडील शंका आणि सल्ल्यांवर एक नजर.",
            },
        },
        diagnose: {
            title: "वनस्पती आरोग्याचे निदान करा",
            description: "एआय-समर्थित निदान मिळविण्यासाठी प्रभावित वनस्पती पान किंवा क्षेत्राचे स्पष्ट चित्र अपलोड करा.",
            image: {
                upload: "प्रतिमा अपलोड करण्यासाठी क्लिक करा",
                change: "प्रतिमा निवडली. बदलण्यासाठी क्लिक करा.",
                formats: "PNG, JPG, किंवा WEBP शिफारस केलेले.",
            },
            results: {
                title: "एआय निदान",
                description: "तुमच्या वनस्पतीचे विश्लेषण येथे दिसेल.",
                waiting: "प्रतिमा सबमिशनची प्रतीक्षा आहे...",
            },
            error: {
                title: "निदान अयशस्वी",
            }
        },
        advice: {
            title: "एआय शेती सल्लागार",
            description: "प्रश्न विचारा आणि त्वरित कृषी सल्ला मिळवा.",
            placeholder: "उदा., 'टोमॅटोच्या रोपांवर करपा कसा टाळावा?'",
            language: {
                placeholder: "भाषा निवडा",
                options: [
                    { value: "en", label: "English" },
                    { value: "hi", label: "हिंदी" },
                    { value: "te", label: "తెలుగు" },
                    { value: "mr", label: "मराठी" },
                    { value: "ta", label: "தமிழ்" },
                ]
            },
            voice: {
                start: "रेकॉर्डिंग सुरू करा",
                stop: "रेकॉर्डिंग थांबवा",
            },
            results: {
                title: "एआय शिफारस",
                description: "आमच्या एआयकडून सल्ला येथे दिसेल.",
                waiting: "सुरुवात करण्यासाठी एक प्रश्न विचारा...",
                audioNotSupported: "तुमचा ब्राउझर ऑडिओ घटकास समर्थन देत नाही.",
            },
            error: {
                title: "सल्ला मिळविण्यात अयशस्वी",
                voiceNotSupported: {
                    title: "व्हॉइस शोध समर्थित नाही",
                    description: "तुमचा ब्राउझर व्हॉइस ओळखीस समर्थन देत नाही.",
                },
            }
        },
        schemes: {
            title: "शासकीय योजना मदतनीस",
            description: "योजनेचा दस्तऐवज (PDF) अपलोड करा आणि ते अधिक चांगल्या प्रकारे समजून घेण्यासाठी प्रश्न विचारा.",
            placeholder: "उदा., 'या योजनेसाठी पात्रता निकष काय आहेत?'",
            results: {
                waiting: "विश्लेषण येथे पाहण्यासाठी एक दस्तऐवज अपलोड करा आणि एक प्रश्न विचारा.",
            },
            error: {
                title: "विश्लेषण अयशस्वी",
            }
        },
        history: {
            title: "सल्ला इतिहास",
            description: "तुमचे मागील प्रश्न आणि तुम्हाला मिळालेल्या सल्ल्याचे पुनरावलोकन करा.",
            items: [
                {
                    query: { content: "टोमॅटो वनस्पती निदान" },
                    response: "वनस्पतीला लवकर येणाऱ्या करप्याचा त्रास होत असल्याचे दिसते, ज्याची खालच्या पानांवर वर्तुळाकार वलये दिसतात. तांब्यावर आधारित बुरशीनाशक लावण्याची आणि योग्य हवा खेळती राहील याची खात्री करण्याची शिफारस केली जाते.",
                    date: "2 दिवसांपूर्वी",
                },
                {
                    query: { content: "माझ्या कोबीवरील माव्याशी कसे सामोरे जावे?" },
                    response: "कोबीवरील मावा लेडीबगसारख्या नैसर्गिक शिकारी प्राण्यांना आणून किंवा कीटकनाशक साबणाने फवारणी करून नियंत्रित केला जाऊ शकतो. पानांच्या खालील बाजूस फवारणी करण्याची खात्री करा जिथे मावा जमा होतो.",
                    date: "1 आठवड्यापूर्वी",
                },
                {
                    query: { content: "वालुकामय जमिनीसाठी सर्वोत्तम खत कोणते?" },
                    response: "वालुकामय जमिनीसाठी, हळू-रिलीज नायट्रोजन खत वापरणे उत्तम आहे. कंपोस्टसारखे सेंद्रिय पदार्थ समाविष्ट केल्याने पाणी आणि पोषक तत्वे टिकवून ठेवण्यास मदत होईल.",
                    date: "3 आठवड्यांपूर्वी",
                }
            ]
        },
        library: {
            title: "सामग्री लायब्ररी",
            description: "तुमचे शेती ज्ञान वाढवण्यासाठी लेख, मार्गदर्शक आणि व्हिडिओ ब्राउझ करा.",
            items: [
                { title: "पीक चक्र समजून घेणे", description: "हंगामी पीक नियोजन आणि फेरपालटासाठी एक व्यापक मार्गदर्शक." },
                { title: "माती आरोग्यावर प्रभुत्व मिळवणे", description: "चांगल्या उत्पन्नासाठी आपल्या मातीची चाचणी आणि सुधारणा कशी करावी ते शिका." },
                { title: "कीटकनाशकांसाठी नवशिक्यांचे मार्गदर्शक", description: "सामान्य कीटकांसाठी कीटकनाशकांचा सुरक्षित आणि प्रभावी वापर." },
                { title: "आधुनिक सिंचन तंत्रज्ञान", description: "ठिबक सिंचन, स्प्रिंकलर आणि बरेच काही पहा आणि शिका." },
                { title: "साप्ताहिक बाजारपेठेतील ट्रेंड", description: "या आठवड्यातील पिकांच्या किमती आणि बाजारातील मागणीचे विश्लेषण." }
            ]
        },
        header: {
            account: {
                label: "माझे खाते",
                settings: "सेटिंग्ज",
                support: "समर्थन",
                logout: "लॉगआउट",
            },
            settings: {
                title: "सेटिंग्ज",
                description: "तुमचे खाते आणि ॲप प्राधान्ये व्यवस्थापित करा.",
                language: "भाषा",
            }
        },
        article: "लेख",
        video: "व्हिडिओ",
        guide: "मार्गदर्शक",
    }
};

export type Translations = typeof translations.en;
export type LanguageCode = keyof typeof translations;

export const availableLanguages = Object.keys(translations).map(code => ({
    code,
    name: translations[code as LanguageCode].languageName,
}));

export function getTranslations(lang: LanguageCode): Translations {
    return translations[lang] || translations.en;
}
