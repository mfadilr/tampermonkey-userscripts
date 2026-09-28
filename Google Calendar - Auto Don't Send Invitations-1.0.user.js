// ==UserScript==
// @name         Google Calendar - Auto Don't Send Invitations
// @namespace    https://calendar.google.com/
// @version      1.0
// @description  Automatically dismisses the invitation email dialog by choosing "Don't send".
// @match        https://calendar.google.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    const DIALOG_TEXT = 'Would you like to send invitation emails to Google Calendar guests?';
    const DONT_SEND_TEXT = "Don't send";

    function clickDontSend() {
        // Google dialogs normally use role="dialog"
        const dialogs = document.querySelectorAll('[role="dialog"]');

        for (const dialog of dialogs) {
            const text = dialog.textContent || '';

            // Only act on the invitation-email confirmation dialog
            if (!text.includes(DIALOG_TEXT)) {
                continue;
            }

            // Find the "Don't send" button inside this specific dialog
            const candidates = dialog.querySelectorAll(
                'button, [role="button"]'
            );

            for (const element of candidates) {
                const label = (
                    element.innerText ||
                    element.textContent ||
                    element.getAttribute('aria-label') ||
                    ''
                ).trim();

                if (label === DONT_SEND_TEXT) {
                    element.click();
                    return true;
                }
            }
        }

        return false;
    }

    // Check immediately in case the dialog is already open
    clickDontSend();

    // Google Calendar is a dynamic SPA, so watch for dialogs being inserted
    const observer = new MutationObserver(() => {
        clickDontSend();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();