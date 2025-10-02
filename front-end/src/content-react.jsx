import React from 'react';
import { createRoot } from 'react-dom/client';
import TranslatorApp from './components/TranslatorApp';
import './index.css';

// Chrome extension content script
console.log('Extension content script loaded!');

// Create extension UI container
const createExtensionContainer = () => {
    // Remove any existing extension UI
    const existingContainer = document.querySelector('#speech-translator-extension');
    if (existingContainer) {
        existingContainer.remove();
    }

    // Create the main container
    const container = document.createElement('div');
    container.id = 'speech-translator-extension';
    
    // Modern extension container styling that matches web app
    container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        width: 420px;
        max-height: 80vh;
        background: #111827;
        border-radius: 16px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        border: 1px solid #e5e7eb;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        overflow: hidden;
        resize: both;
        min-width: 380px;
        min-height: 500px;
        backdrop-filter: blur(8px);
    `;

    // Create and inject a comprehensive style tag for the extension
    const extensionStyles = document.createElement('style');
    extensionStyles.id = 'translator-extension-styles';
    extensionStyles.textContent = `
        /* Import Inter font */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        /* Tailwind CSS reset and utilities for extension */
        #speech-translator-extension * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        #speech-translator-extension {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            line-height: 1.5;
            color: #374151;
            background-color: #111827; /* gray-900 equivalent */
        }
        
        /* Utility classes that match Tailwind */
        #speech-translator-extension .bg-gray-100 { background-color: #f3f4f6; }
        #speech-translator-extension .bg-white { background-color: #ffffff; }
        #speech-translator-extension .bg-gray-800 { background-color: #1f2937; }
        #speech-translator-extension .bg-gray-50 { background-color: #f9fafb; }
        #speech-translator-extension .bg-blue-50 { background-color: #eff6ff; }
        #speech-translator-extension .bg-green-50 { background-color: #f0fdf4; }
        #speech-translator-extension .bg-blue-600 { background-color: #2563eb; }
        #speech-translator-extension .bg-red-600 { background-color: #dc2626; }
        #speech-translator-extension .bg-gray-900\/20 { background-color: rgba(17, 24, 39, 0.2); }
        #speech-translator-extension .bg-blue-900\/20 { background-color: rgba(30, 58, 138, 0.2); }
        #speech-translator-extension .bg-green-900\/20 { background-color: rgba(20, 83, 45, 0.2); }
        
        /* Dark mode background classes - matches web app exactly */
        #speech-translator-extension.dark .bg-gray-100 { background-color: #1f2937; }
        #speech-translator-extension.dark .bg-white { background-color: #1f2937; }
        #speech-translator-extension.dark .bg-gray-50 { background-color: rgba(17, 24, 39, 0.2); }
        #speech-translator-extension.dark .bg-gray-800 { background-color: #111827; }
        #speech-translator-extension.dark .bg-gray-900\/20 { background-color: rgba(17, 24, 39, 0.2); }
        #speech-translator-extension.dark .bg-blue-50 { background-color: rgba(30, 58, 138, 0.2); }
        #speech-translator-extension.dark .bg-green-50 { background-color: rgba(20, 83, 45, 0.2); }
        #speech-translator-extension.dark .bg-blue-900\/20 { background-color: rgba(30, 58, 138, 0.2); }
        #speech-translator-extension.dark .bg-green-900\/20 { background-color: rgba(20, 83, 45, 0.2); }
        
        #speech-translator-extension .text-gray-800 { color: #1f2937; }
        #speech-translator-extension .text-gray-900 { color: #111827; }
        #speech-translator-extension .text-gray-600 { color: #4b5563; }
        #speech-translator-extension .text-gray-500 { color: #6b7280; }
        #speech-translator-extension .text-gray-400 { color: #9ca3af; }
        #speech-translator-extension .text-white { color: #ffffff; }
        #speech-translator-extension .text-gray-100 { color: #f3f4f6; }
        #speech-translator-extension .text-gray-700 { color: #374151; }
        #speech-translator-extension .text-gray-300 { color: #d1d5db; }
        
        /* Dark mode text colors - matches web app exactly */
        #speech-translator-extension.dark .text-gray-800 { color: #ffffff; }
        #speech-translator-extension.dark .text-gray-900 { color: #f3f4f6; }
        #speech-translator-extension.dark .text-gray-600 { color: #d1d5db; }
        #speech-translator-extension.dark .text-gray-500 { color: #6b7280; }
        #speech-translator-extension.dark .text-gray-400 { color: #6b7280; }
        #speech-translator-extension.dark .text-gray-700 { color: #d1d5db; }
        #speech-translator-extension.dark .text-gray-300 { color: #9ca3af; }
        #speech-translator-extension.dark .text-gray-100 { color: #f3f4f6; }
        
        #speech-translator-extension .border { border-width: 1px; border-style: solid; }
        #speech-translator-extension .border-gray-200 { border-color: #e5e7eb; }
        #speech-translator-extension .border-gray-300 { border-color: #d1d5db; }
        #speech-translator-extension .border-blue-200 { border-color: #bfdbfe; }
        #speech-translator-extension .border-green-200 { border-color: #bbf7d0; }
        #speech-translator-extension .border-gray-700 { border-color: #374151; }
        #speech-translator-extension .border-blue-700 { border-color: #1d4ed8; }
        #speech-translator-extension .border-green-700 { border-color: #15803d; }
        #speech-translator-extension .border-gray-600 { border-color: #4b5563; }
        
        /* Dark mode border colors - exact Tailwind values */
        #speech-translator-extension.dark .border-gray-200 { border-color: #374151; }
        #speech-translator-extension.dark .border-gray-300 { border-color: #4b5563; }
        #speech-translator-extension.dark .border-gray-600 { border-color: #4b5563; }
        #speech-translator-extension.dark .border-gray-700 { border-color: #374151; }
        #speech-translator-extension.dark .border-blue-200 { border-color: #1d4ed8; }
        #speech-translator-extension.dark .border-green-200 { border-color: #15803d; }
        #speech-translator-extension.dark .border-blue-700 { border-color: #1d4ed8; }
        #speech-translator-extension.dark .border-green-700 { border-color: #15803d; }
        
        #speech-translator-extension .rounded-lg { border-radius: 0.5rem; }
        #speech-translator-extension .rounded-xl { border-radius: 0.75rem; }
        #speech-translator-extension .rounded-2xl { border-radius: 1rem; }
        #speech-translator-extension .rounded-full { border-radius: 9999px; }
        
        #speech-translator-extension .min-h-\[150px\] { min-height: 150px; }
        #speech-translator-extension .whitespace-pre-wrap { white-space: pre-wrap; }
        #speech-translator-extension .leading-relaxed { line-height: 1.625; }
        #speech-translator-extension .italic { font-style: italic; }
        
        #speech-translator-extension .p-4 { padding: 1rem; }
        #speech-translator-extension .p-6 { padding: 1.5rem; }
        #speech-translator-extension .p-8 { padding: 2rem; }
        #speech-translator-extension .px-4 { padding-left: 1rem; padding-right: 1rem; }
        #speech-translator-extension .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
        #speech-translator-extension .px-8 { padding-left: 2rem; padding-right: 2rem; }
        #speech-translator-extension .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
        #speech-translator-extension .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        #speech-translator-extension .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
        #speech-translator-extension .pb-6 { padding-bottom: 1.5rem; }
        #speech-translator-extension .pt-4 { padding-top: 1rem; }
        
        #speech-translator-extension .m-4 { margin: 1rem; }
        #speech-translator-extension .mb-2 { margin-bottom: 0.5rem; }
        #speech-translator-extension .mb-3 { margin-bottom: 0.75rem; }
        #speech-translator-extension .mb-4 { margin-bottom: 1rem; }
        #speech-translator-extension .mb-6 { margin-bottom: 1.5rem; }
        #speech-translator-extension .mt-2 { margin-top: 0.5rem; }
        #speech-translator-extension .mt-6 { margin-top: 1.5rem; }
        #speech-translator-extension .mx-auto { margin-left: auto; margin-right: auto; }
        
        #speech-translator-extension .w-full { width: 100%; }
        #speech-translator-extension .max-w-4xl { max-width: 56rem; }
        #speech-translator-extension .min-h-screen { min-height: 100vh; }
        
        #speech-translator-extension .relative { position: relative; }
        #speech-translator-extension .absolute { position: absolute; }
        #speech-translator-extension .inset-y-0 { top: 0; bottom: 0; }
        #speech-translator-extension .right-0 { right: 0; }
        #speech-translator-extension .pointer-events-none { pointer-events: none; }
        
        #speech-translator-extension .flex { display: flex; }
        #speech-translator-extension .items-center { align-items: center; }
        #speech-translator-extension .justify-center { justify-content: center; }
        #speech-translator-extension .text-center { text-align: center; }
        
        #speech-translator-extension .grid { display: grid; }
        #speech-translator-extension .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        #speech-translator-extension .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        #speech-translator-extension .gap-4 { gap: 1rem; }
        #speech-translator-extension .gap-6 { gap: 1.5rem; }
        
        #speech-translator-extension .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
        #speech-translator-extension .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
        #speech-translator-extension .text-2xl { font-size: 1.5rem; line-height: 2rem; }
        #speech-translator-extension .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
        #speech-translator-extension .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
        
        #speech-translator-extension .font-medium { font-weight: 500; }
        #speech-translator-extension .font-semibold { font-weight: 600; }
        #speech-translator-extension .font-bold { font-weight: 700; }
        
        #speech-translator-extension .fill-current { fill: currentColor; }
        #speech-translator-extension .cursor-pointer { cursor: pointer; }
        
        #speech-translator-extension .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
        #speech-translator-extension .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
        #speech-translator-extension .shadow-inner { box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06); }
        
        /* SVG size constraints */
        #speech-translator-extension svg {
            max-width: 100%;
            max-height: 100%;
        }
        
        #speech-translator-extension .h-4 { height: 1rem; }
        #speech-translator-extension .w-4 { width: 1rem; }
        #speech-translator-extension .h-6 { height: 1.5rem; }
        #speech-translator-extension .w-6 { width: 1.5rem; }
        
        /* Button styles */
        #speech-translator-extension button {
            cursor: pointer;
            border: none;
            outline: none;
            transition: all 0.3s ease-in-out;
            background-color: #1f2937;
        }
        
        #speech-translator-extension button:hover {
            transform: translateY(-1px);
        }
        
        #speech-translator-extension button:focus {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
        }
        
        /* Clear button hover states */
        #speech-translator-extension .hover\:bg-gray-50:hover { background-color: #f9fafb; }
        #speech-translator-extension.dark .hover\:bg-gray-50:hover,
        #speech-translator-extension.dark .hover\:bg-gray-700:hover { background-color: #374151; }
        
        #speech-translator-extension .transition-colors { transition: color 0.2s, background-color 0.2s, border-color 0.2s; }
        #speech-translator-extension .duration-200 { transition-duration: 200ms; }
        
        /* Input styles */
        #speech-translator-extension select {
            width: 100%;
            padding: 0.75rem;
            background-color: #f9fafb;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            transition: all 0.2s;
            appearance: none;
            color: #111827;
            /* Removed background-image since LanguageSelector component has its own arrow */
        }
        
        /* Dark mode select styling */
        #speech-translator-extension.dark select {
            background-color: #374151;
            border-color: #4b5563;
            color: #f9fafb;
        }
        
        #speech-translator-extension select:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        /* Animation */
        #speech-translator-extension .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        /* Responsive grid */
        @media (min-width: 640px) {
            #speech-translator-extension .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            #speech-translator-extension .sm\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
            #speech-translator-extension .sm\\:p-8 { padding: 2rem; }
            #speech-translator-extension .sm\\:mb-8 { margin-bottom: 2rem; }
        }
        
        @media (min-width: 1024px) {
            #speech-translator-extension .lg\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
    `;
    
    // Only add styles if not already present
    if (!document.querySelector('#translator-extension-styles')) {
        document.head.appendChild(extensionStyles);
    }

    document.body.appendChild(container);
    
    // Apply dark mode detection
    applyDarkModeDetection(container);
    
    return container;
};

// Dark mode detection function
const applyDarkModeDetection = (container) => {
    const updateDarkMode = () => {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Check if document has dark class (like web app)
        const documentHasDark = document.documentElement.classList.contains('dark') || 
                               document.body.classList.contains('dark');
        
        // Apply dark mode if system prefers dark OR document has dark class
        if (prefersDark || documentHasDark) {
            container.classList.add('dark');
            // Update container background for dark mode
            container.style.background = '#111827';
            container.style.borderColor = '#374151';
        } else {
            container.classList.remove('dark');
            // Update container background for light mode  
            container.style.background = '#ffffff';
            container.style.borderColor = '#e5e7eb';
        }
    };
    
    // Initial check
    updateDarkMode();
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateDarkMode);
    
    // Listen for document class changes (in case web app toggles dark mode)
    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
};

// Function to detect platform and get name
const getPlatformName = () => {
    const hostname = window.location.hostname.toLowerCase();
    
    if (hostname.includes('zoom')) return 'Zoom';
    if (hostname.includes('teams.microsoft')) return 'Teams';
    if (hostname.includes('meet.google')) return 'Google Meet';
    if (hostname.includes('webex')) return 'Webex';
    if (hostname.includes('gotomeeting')) return 'GoToMeeting';
    if (hostname.includes('skype')) return 'Skype';
    if (hostname.includes('discord')) return 'Discord';
    if (hostname.includes('slack')) return 'Slack';
    
    return 'Meeting Platform';
};

// Message listener for popup communication
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Content script received message:', request);
    
    switch (request.action) {
        case 'togglePanel':
            const existingPanel = document.querySelector('#speech-translator-extension');
            if (existingPanel) {
                existingPanel.style.display = existingPanel.style.display === 'none' ? 'block' : 'none';
                sendResponse({ visible: existingPanel.style.display !== 'none' });
            } else {
                initializeExtension();
                sendResponse({ visible: true });
            }
            break;
            
        case 'checkPanel':
            const panel = document.querySelector('#speech-translator-extension');
            sendResponse({ 
                visible: panel && panel.style.display !== 'none' 
            });
            break;
            
        default:
            sendResponse({ error: 'Unknown action' });
    }
    
    return true; // Keep message channel open
});

// Initialize the extension
const initializeExtension = () => {
    const container = createExtensionContainer();
    const platformName = getPlatformName();
    
    // Wait a bit for styles to be applied, then render React component
    setTimeout(() => {
        // Create React root and render the TranslatorApp with same styling as web app
        const root = createRoot(container);
        root.render(
            <TranslatorApp 
                isExtension={true} 
                platformName={platformName}
            />
        );
        
        console.log(`Extension initialized for ${platformName} with styling`);
    }, 100); // Small delay to ensure styles are loaded
};

// Wait for page to load, then initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeExtension);
} else {
    initializeExtension();
}