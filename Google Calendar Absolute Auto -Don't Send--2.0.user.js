// ==UserScript==
// @name         Google Calendar Absolute Auto "Don't Send"
// @namespace    http://tampermonkey.net
// @version      2.0
// @description  Finds the button containing the text "Don't send" and clicks it instantly.
// @author       AI
// @match        https://calendar.google.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const clickDontSend = () => {
        // Find every single button on the page
        const buttons = document.querySelectorAll('button');

        for (let btn of buttons) {
            // Check if the button text matches "Don't send" (case-insensitive)
            if (btn.textContent.trim().toLowerCase() === "don't send") {
                btn.click();
                break;
            }
        }
    };

    // Keep checking for the text "Don't send" whenever the screen updates
    const observer = new MutationObserver(clickDontSend);
    observer.observe(document.body, { childList: true, subtree: true });
})();
