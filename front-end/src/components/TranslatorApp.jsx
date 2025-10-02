import React, { useState, useRef, useEffect } from 'react';
import LanguageSelector from './LanguageSelector';
import TranslationPanel from './TranslationPanel';

// Complete NLLB language mapping
const languages = {
    'Acehnese (Arabic)': 'ace_Arab',
    'Acehnese (Latin)': 'ace_Latn', 
    'Arabic (Mesopotamian)': 'acm_Arab',
    'Arabic (Ta\'izzi-Adeni)': 'acq_Arab',
    'Arabic (Tunisian)': 'aeb_Arab',
    'Afrikaans': 'afr_Latn',
    'Arabic (South Levantine)': 'ajp_Arab',
    'Akan': 'aka_Latn',
    'Amharic': 'amh_Ethi',
    'Arabic (North Levantine)': 'apc_Arab',
    'Arabic (Standard)': 'arb_Arab',
    'Arabic (Najdi)': 'ars_Arab',
    'Arabic (Moroccan)': 'ary_Arab',
    'Arabic (Egyptian)': 'arz_Arab',
    'Assamese': 'asm_Beng',
    'Asturian': 'ast_Latn',
    'Awadhi': 'awa_Deva',
    'Aymara': 'ayr_Latn',
    'Azerbaijani (South)': 'azb_Arab',
    'Azerbaijani (North)': 'azj_Latn',
    'Bashkir': 'bak_Cyrl',
    'Bambara': 'bam_Latn',
    'Balinese': 'ban_Latn',
    'Belarusian': 'bel_Cyrl',
    'Bemba': 'bem_Latn',
    'Bengali': 'ben_Beng',
    'Bhojpuri': 'bho_Deva',
    'Banjar (Arabic)': 'bjn_Arab',
    'Banjar (Latin)': 'bjn_Latn',
    'Tibetan': 'bod_Tibt',
    'Bosnian': 'bos_Latn',
    'Buginese': 'bug_Latn',
    'Bulgarian': 'bul_Cyrl',
    'Catalan': 'cat_Latn',
    'Cebuano': 'ceb_Latn',
    'Czech': 'ces_Latn',
    'Chokwe': 'cjk_Latn',
    'Kurdish (Central)': 'ckb_Arab',
    'Crimean Tatar': 'crh_Latn',
    'Welsh': 'cym_Latn',
    'Danish': 'dan_Latn',
    'German': 'deu_Latn',
    'Dinka': 'dik_Latn',
    'Dyula': 'dyu_Latn',
    'Dzongkha': 'dzo_Tibt',
    'Greek': 'ell_Grek',
    'English': 'eng_Latn',
    'Esperanto': 'epo_Latn',
    'Estonian': 'est_Latn',
    'Basque': 'eus_Latn',
    'Ewe': 'ewe_Latn',
    'Faroese': 'fao_Latn',
    'Persian': 'pes_Arab',
    'Fijian': 'fij_Latn',
    'Finnish': 'fin_Latn',
    'Fon': 'fon_Latn',
    'French': 'fra_Latn',
    'Friulian': 'fur_Latn',
    'Nigerian Fulfulde': 'fuv_Latn',
    'Scottish Gaelic': 'gla_Latn',
    'Irish': 'gle_Latn',
    'Galician': 'glg_Latn',
    'Guarani': 'grn_Latn',
    'Gujarati': 'guj_Gujr',
    'Haitian Creole': 'hat_Latn',
    'Hausa': 'hau_Latn',
    'Hebrew': 'heb_Hebr',
    'Hindi': 'hin_Deva',
    'Chhattisgarhi': 'hne_Deva',
    'Croatian': 'hrv_Latn',
    'Hungarian': 'hun_Latn',
    'Armenian': 'hye_Armn',
    'Igbo': 'ibo_Latn',
    'Ilocano': 'ilo_Latn',
    'Indonesian': 'ind_Latn',
    'Icelandic': 'isl_Latn',
    'Italian': 'ita_Latn',
    'Javanese': 'jav_Latn',
    'Japanese': 'jpn_Jpan',
    'Kabyle': 'kab_Latn',
    'Jingpho': 'kac_Latn',
    'Kamba': 'kam_Latn',
    'Kannada': 'kan_Knda',
    'Kashmiri (Arabic)': 'kas_Arab',
    'Kashmiri (Devanagari)': 'kas_Deva',
    'Georgian': 'kat_Geor',
    'Kanuri (Arabic)': 'knc_Arab',
    'Kanuri (Latin)': 'knc_Latn',
    'Kazakh': 'kaz_Cyrl',
    'Kabiyè': 'kbp_Latn',
    'Kabuverdianu': 'kea_Latn',
    'Khmer': 'khm_Khmr',
    'Kikuyu': 'kik_Latn',
    'Kinyarwanda': 'kin_Latn',
    'Kyrgyz': 'kir_Cyrl',
    'Kimbundu': 'kmb_Latn',
    'Kongo': 'kon_Latn',
    'Korean': 'kor_Hang',
    'Kurdish (Northern)': 'kmr_Latn',
    'Lao': 'lao_Laoo',
    'Latvian': 'lvs_Latn',
    'Ligurian': 'lij_Latn',
    'Limburgish': 'lim_Latn',
    'Lingala': 'lin_Latn',
    'Lithuanian': 'lit_Latn',
    'Lombard': 'lmo_Latn',
    'Latgalian': 'ltg_Latn',
    'Luxembourgish': 'ltz_Latn',
    'Luba-Kasai': 'lua_Latn',
    'Ganda': 'lug_Latn',
    'Luo': 'luo_Latn',
    'Mizo': 'lus_Latn',
    'Magahi': 'mag_Deva',
    'Maithili': 'mai_Deva',
    'Malayalam': 'mal_Mlym',
    'Marathi': 'mar_Deva',
    'Minangkabau': 'min_Latn',
    'Macedonian': 'mkd_Cyrl',
    'Plateau Malagasy': 'plt_Latn',
    'Maltese': 'mlt_Latn',
    'Manipuri': 'mni_Beng',
    'Mongolian': 'khk_Cyrl',
    'Mossi': 'mos_Latn',
    'Māori': 'mri_Latn',
    'Malay': 'zsm_Latn',
    'Burmese': 'mya_Mymr',
    'Dutch': 'nld_Latn',
    'Norwegian Nynorsk': 'nno_Latn',
    'Norwegian Bokmål': 'nob_Latn',
    'Nepali': 'npi_Deva',
    'Northern Sotho': 'nso_Latn',
    'Nuer': 'nus_Latn',
    'Nyanja': 'nya_Latn',
    'Occitan': 'oci_Latn',
    'West Central Oromo': 'gaz_Latn',
    'Odia': 'ory_Orya',
    'Pangasinan': 'pag_Latn',
    'Punjabi': 'pan_Guru',
    'Papiamento': 'pap_Latn',
    'Polish': 'pol_Latn',
    'Portuguese': 'por_Latn',
    'Persian (Dari)': 'prs_Arab',
    'Pashto': 'pbt_Arab',
    'Quechua': 'quy_Latn',
    'Romanian': 'ron_Latn',
    'Rundi': 'run_Latn',
    'Russian': 'rus_Cyrl',
    'Sango': 'sag_Latn',
    'Sanskrit': 'san_Deva',
    'Santali': 'sat_Beng',
    'Sicilian': 'scn_Latn',
    'Shan': 'shn_Mymr',
    'Sinhala': 'sin_Sinh',
    'Slovak': 'slk_Latn',
    'Slovenian': 'slv_Latn',
    'Samoan': 'smo_Latn',
    'Shona': 'sna_Latn',
    'Sindhi': 'snd_Arab',
    'Somali': 'som_Latn',
    'Southern Sotho': 'sot_Latn',
    'Spanish': 'spa_Latn',
    'Albanian (Tosk)': 'als_Latn',
    'Sardinian': 'srd_Latn',
    'Serbian': 'srp_Cyrl',
    'Swati': 'ssw_Latn',
    'Sundanese': 'sun_Latn',
    'Swedish': 'swe_Latn',
    'Swahili': 'swh_Latn',
    'Silesian': 'szl_Latn',
    'Tamil': 'tam_Taml',
    'Tatar': 'tat_Cyrl',
    'Telugu': 'tel_Telu',
    'Tajik': 'tgk_Cyrl',
    'Tagalog': 'tgl_Latn',
    'Thai': 'tha_Thai',
    'Tigrinya': 'tir_Ethi',
    'Tamasheq (Latin)': 'taq_Latn',
    'Tamasheq (Tifinagh)': 'taq_Tfng',
    'Tok Pisin': 'tpi_Latn',
    'Tswana': 'tsn_Latn',
    'Tsonga': 'tso_Latn',
    'Turkmen': 'tuk_Latn',
    'Tumbuka': 'tum_Latn',
    'Turkish': 'tur_Latn',
    'Twi': 'twi_Latn',
    'Central Atlas Tamazight': 'tzm_Tfng',
    'Uyghur': 'uig_Arab',
    'Ukrainian': 'ukr_Cyrl',
    'Umbundu': 'umb_Latn',
    'Urdu': 'urd_Arab',
    'Uzbek (Northern)': 'uzn_Latn',
    'Venetian': 'vec_Latn',
    'Vietnamese': 'vie_Latn',
    'Waray': 'war_Latn',
    'Wolof': 'wol_Latn',
    'Xhosa': 'xho_Latn',
    'Yiddish': 'ydd_Hebr',
    'Yoruba': 'yor_Latn',
    'Cantonese': 'yue_Hant',
    'Chinese (Simplified)': 'zho_Hans',
    'Chinese (Traditional)': 'zho_Hant',
    'Zulu': 'zul_Latn'
};

const languageNames = Object.keys(languages);

// Speech Recognition language codes mapping
const speechRecognitionLanguages = {
    'English': 'en-US',
    'Spanish': 'es-ES',
    'French': 'fr-FR',
    'German': 'de-DE',
    'Italian': 'ita',
    'Portuguese': 'pt-PT',
    'Russian': 'ru-RU',
    'Japanese': 'ja-JP',
    'Korean': 'ko-KR',
    'Chinese (Simplified)': 'zh-CN',
    'Chinese (Traditional)': 'zh-TW',
    'Arabic (Standard)': 'ar-SA',
    'Hindi': 'hi-IN',
    'Dutch': 'nl-NL',
    'Polish': 'pl-PL',
    'Turkish': 'tr-TR',
    'Swedish': 'sv-SE',
    'Norwegian': 'no-NO',
    'Danish': 'da-DK',
    'Finnish': 'fi-FI',
    'Greek': 'el-GR',
    'Hebrew': 'he-IL',
    'Czech': 'cs-CZ',
    'Hungarian': 'hu-HU',
    'Romanian': 'ro-RO',
    'Bulgarian': 'bg-BG',
    'Croatian': 'hr-HR',
    'Slovak': 'sk-SK',
    'Slovenian': 'sl-SI',
    'Estonian': 'et-EE',
    'Latvian': 'lv-LV',
    'Lithuanian': 'lt-LT',
    'Ukrainian': 'uk-UA',
    'Bengali': 'bn-IN',
    'Gujarati': 'gu-IN',
    'Kannada': 'kn-IN',
    'Malayalam': 'ml-IN',
    'Marathi': 'mr-IN',
    'Tamil': 'ta-IN',
    'Telugu': 'te-IN',
    'Urdu': 'ur-PK',
    'Thai': 'th-TH',
    'Vietnamese': 'vi-VN',
    'Indonesian': 'id-ID',
    'Malay': 'ms-MY',
    'Catalan': 'ca-ES',
    'Basque': 'eu-ES',
    'Galician': 'gl-ES',
    'Welsh': 'cy-GB',
    'Irish': 'ga-IE',
    'Scottish Gaelic': 'gd-GB',
    'Afrikaans': 'af-ZA',
    'Swahili': 'sw-KE',
    'Zulu': 'zu-ZA',
    'Yoruba': 'yo-NG',
    'Hausa': 'ha-NG',
    'Igbo': 'ig-NG',
    'Amharic': 'am-ET',
    'Somali': 'so-SO',
    'Icelandic': 'is-IS',
    'Maltese': 'mt-MT',
    'Albanian': 'sq-AL',
    'Macedonian': 'mk-MK',
    'Serbian': 'sr-RS',
    'Bosnian': 'bs-BA',
    'Montenegrin': 'me-ME'
};

// Check for browser support for the Web Speech API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function TranslatorApp({ isExtension = false, platformName = 'Meeting Platform' }) {
    // State management
    const [sourceLang, setSourceLang] = useState('English');
    const [targetLang, setTargetLang] = useState('Spanish');
    const [isListening, setIsListening] = useState(false);
    const [interimTranscript, setInterimTranscript] = useState('');
    const [finalTranscript, setFinalTranscript] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [statusMessage, setStatusMessage] = useState('Click "Start Translating" to begin.');
    
    // Using useRef to hold the full transcript to avoid stale state in callbacks
    const transcriptRef = useRef('');
    
    // Track if user manually stopped (to prevent auto-restart)
    const [shouldContinueListening, setShouldContinueListening] = useState(false);
    const shouldContinueRef = useRef(false);
    
    // Keep ref in sync with state
    useEffect(() => {
        shouldContinueRef.current = shouldContinueListening;
    }, [shouldContinueListening]);
    
    // Speech recognition instance ref
    const recognitionRef = useRef(null);

    // Language change handlers with validation
    const handleSourceLanguageChange = (newLang) => {
        if (newLang === targetLang) {
            setStatusMessage('⚠️ Source and target languages cannot be the same. Please select different languages.');
            return;
        }
        setSourceLang(newLang);
        setStatusMessage('Source language updated.');
        
        // If recognition is currently running, restart it with the new language
        if (isListening && recognitionRef.current) {
            console.log(`Restarting recognition with new language: ${newLang}`);
            const recognition = recognitionRef.current;
            recognition.stop(); // This will trigger onend and restart with new language
        }
    };

    const handleTargetLanguageChange = (newLang) => {
        if (newLang === sourceLang) {
            setStatusMessage('⚠️ Source and target languages cannot be the same. Please select different languages.');
            return;
        }
        setTargetLang(newLang);
        setStatusMessage('Target language updated.');
    };

    // API call to the backend for translation
    const handleTranslate = async (text, source, target) => {
        if (!text.trim()) return;
        console.log('Translating:', { text, source, target });
        setStatusMessage('Translating...');
        try {
            const response = await fetch('http://localhost:8000/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: text,
                    source_language: source, // Send full language name like "English"
                    target_language: target  // Send full language name like "Spanish"
                }),
            });

            if (!response.ok) {
                throw new Error(`Translation failed: ${response.status}`);
            }

            const data = await response.json();
            console.log('Translation result:', data);
            // Replace the entire translated text instead of appending chunks
            setTranslatedText(data.translated_text);
            console.log('Setting translated text:', data.translated_text);
            setStatusMessage(isListening ? 'Listening... (Translation updated)' : 'Translation complete.');

        } catch (error) {
            console.error('Translation error:', error);
            setStatusMessage(`Error: ${error.message}`);
        }
    };

    // Setup and manage speech recognition events
    useEffect(() => {
        if (!SpeechRecognition) {
            setStatusMessage("Sorry, your browser doesn't support speech recognition.");
            return;
        }

        // Initialize recognition if not already done
        if (!recognitionRef.current) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
        }

        const recognition = recognitionRef.current;
        recognition.lang = speechRecognitionLanguages[sourceLang] || 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            setInterimTranscript('');
            transcriptRef.current = finalTranscript; // Continue from where we left off
            setStatusMessage('🎤 Listening continuously... Speak into your microphone.');
        };

        recognition.onend = () => {
            console.log('Recognition ended, shouldContinueListening:', shouldContinueRef.current);
            // Use a ref to get the current value to avoid stale closure
            setTimeout(() => {
                if (shouldContinueRef.current && recognitionRef.current) {
                    console.log('Auto-restarting recognition...');
                    try {
                        // Update language before restarting
                        recognitionRef.current.lang = languages[sourceLang];
                        recognitionRef.current.start();
                    } catch (error) {
                        console.error('Error restarting recognition:', error);
                        setIsListening(false);
                        setStatusMessage('Error restarting speech recognition.');
                    }
                }
            }, 100); // Small delay to prevent rapid restart issues
            
            if (!shouldContinueRef.current) {
                setIsListening(false);
                setStatusMessage('Mic is off. Click "Start" to speak again.');
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setStatusMessage(`Error: ${event.error}. Please check microphone permissions.`);
            setIsListening(false);
        };

        recognition.onresult = (event) => {
            console.log('Speech recognition result received:', event.results.length);
            let interim = '';
            let final = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final += event.results[i][0].transcript;
                } else {
                    interim += event.results[i][0].transcript;
                }
            }

            console.log('Interim:', interim, 'Final:', final);
            setInterimTranscript(interim);

            if (final) {
                const newFinalText = final.trim();
                transcriptRef.current = transcriptRef.current ? `${transcriptRef.current} ${newFinalText}` : newFinalText;
                console.log('Setting final transcript:', transcriptRef.current);
                setFinalTranscript(transcriptRef.current);
                // Translate the entire accumulated text instead of just the new chunk
                handleTranslate(transcriptRef.current, sourceLang, targetLang);
            }
        };

        // Update recognition language when source language changes
        return () => {
            recognition.onstart = null;
            recognition.onend = null;
            recognition.onerror = null;
            recognition.onresult = null;
        };
    }, [sourceLang, targetLang, shouldContinueListening]); // Remove finalTranscript and isListening from dependencies

    // Start/Stop button handler
    const toggleListen = () => {
        if (!SpeechRecognition || !recognitionRef.current) return;
        
        const recognition = recognitionRef.current;
        
        if (isListening || shouldContinueListening) {
            // Stop listening completely
            setShouldContinueListening(false);
            recognition.stop();
            setIsListening(false);
            setStatusMessage('Stopped listening.');
        } else {
            // Start continuous listening
            setShouldContinueListening(true);
            // Reset state for a new session
            setFinalTranscript('');
            setTranslatedText('');
            transcriptRef.current = '';
            recognition.lang = speechRecognitionLanguages[sourceLang] || 'en-US';
            recognition.start();
        }
    };

    const clearTranslations = () => {
        setFinalTranscript('');
        setTranslatedText('');
        setInterimTranscript('');
        transcriptRef.current = '';
        setStatusMessage('Translations cleared. Ready to start.');
    };

    // Use same styling for both extension and web app
    const containerClasses = isExtension 
        ? "bg-white text-gray-900 p-4 font-sans"
        : "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center min-h-screen p-4 font-sans transition-colors duration-500";
    const cardClasses = isExtension
        ? "w-full bg-white rounded-lg p-4"
        : "w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8";

    // Return same UI for both extension and web app
    return (
        <div className={containerClasses}>
            <div className={cardClasses}>
                <header className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
                        {isExtension ? `${platformName} Translator` : 'Real-Time Speech Translator'}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        {isExtension ? 'Live translation for your meetings and calls.' : 'Speak and get instant translations. Powered by React & FastAPI.'}
                    </p>
                </header>

                {/* Language Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label htmlFor="source-lang" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From (Your Language)</label>
                        <LanguageSelector id="source-lang" value={sourceLang} onChange={(e) => handleSourceLanguageChange(e.target.value)}>
                            {languageNames.map((name) => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </LanguageSelector>
                    </div>
                    <div>
                        <label htmlFor="target-lang" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To (Target Language)</label>
                        <LanguageSelector id="target-lang" value={targetLang} onChange={(e) => handleTargetLanguageChange(e.target.value)}>
                            {languageNames.map((name) => (
                                <option key={name} value={name} disabled={name === sourceLang}>{name}</option>
                            ))}
                        </LanguageSelector>
                    </div>
                </div>

                {/* Control Button */}
                <div className="text-center my-6">
                     <button 
                        id="start-btn" 
                        onClick={toggleListen}
                        className={`px-8 py-4 text-white font-semibold rounded-full shadow-lg focus:outline-none focus:ring-4 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center mx-auto ${
                            shouldContinueListening || isListening
                            ? 'bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:focus:ring-red-800' 
                            : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 dark:focus:ring-blue-800'
                        }`}
                    >
                        {shouldContinueListening || isListening ? (
                            <>
                                <svg className="w-6 h-6 mr-3 animate-pulse" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z" clipRule="evenodd"></path></svg>
                                <span>Stop Translating</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                                <span>Start Translating</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Status Message */}
                <div className="text-center mb-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">{statusMessage}</p>
                </div>

                {/* Translation Display */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TranslationPanel 
                        title="What you're saying"
                        text={finalTranscript + (interimTranscript ? ` ${interimTranscript}` : '')}
                        placeholder="Your speech will appear here as you talk..."
                        bgColor="bg-blue-50 dark:bg-blue-900/20"
                        borderColor="border-blue-200 dark:border-blue-700"
                    />
                    <TranslationPanel 
                        title="Translation"
                        text={translatedText}
                        placeholder="Translated text will appear here..."
                        bgColor="bg-green-50 dark:bg-green-900/20"
                        borderColor="border-green-200 dark:border-green-700"
                    />
                </div>

                {/* Clear Button */}
                <div className="text-center mt-6">
                    <button 
                        onClick={clearTranslations}
                        className="px-6 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                        Clear All Text
                    </button>
                </div>
            </div>
        </div>
    );

}

export default TranslatorApp;