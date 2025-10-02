// Background script for Real-Time Meeting Translator extension
console.log('Real-Time Meeting Translator: Background script loaded');

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
    console.log('Extension installed/updated:', details.reason);
    
    if (details.reason === 'install') {
        console.log('Extension installed for the first time');
        // Could show welcome notification or open options page
    } else if (details.reason === 'update') {
        console.log('Extension updated to version:', chrome.runtime.getManifest().version);
    }
});

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Background received message:', message);
    
    switch (message.action) {
        case 'getActiveTab':
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                sendResponse({ tab: tabs[0] });
            });
            return true; // Keep message channel open for async response
            
        case 'checkMeetingPlatform':
            // Help popup determine if current tab is a meeting platform
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0]) {
                    const url = tabs[0].url;
                    const isMeetingPlatform = 
                        url.includes('meet.google.com') ||
                        url.includes('zoom.us') ||
                        url.includes('teams.microsoft.com') ||
                        url.includes('webex.com') ||
                        url.includes('whereby.com') ||
                        url.includes('discord.com');
                    
                    sendResponse({ 
                        isMeetingPlatform,
                        platform: url,
                        tabId: tabs[0].id 
                    });
                }
            });
            return true;
            
        case 'injectTranslator':
            // Inject translator into active tab
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0]) {
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        func: () => {
                            if (window.translatorExtension && window.translatorExtension.createPanel) {
                                window.translatorExtension.createPanel();
                                return { success: true };
                            }
                            return { success: false, error: 'Translator not available on this page' };
                        }
                    }, (results) => {
                        sendResponse(results[0]?.result || { success: false });
                    });
                }
            });
            return true;
            
        default:
            console.log('Unknown message action:', message.action);
    }
});

// Handle extension startup
chrome.runtime.onStartup.addListener(() => {
    console.log('Browser started, extension active');
});

// Keep service worker alive (for Chrome extensions)
const keepAlive = () => {
    console.log('Service worker keep-alive ping');
};

// Ping every 20 seconds to prevent service worker from sleeping
setInterval(keepAlive, 20000);