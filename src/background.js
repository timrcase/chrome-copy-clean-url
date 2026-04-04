const DEFAULT_PARAMS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "fbclid", "gclid", "mc_eid", "ref", "source"
];

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "copy-clean-url") {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = new URL(tab.url);

    const { trackingParams = DEFAULT_PARAMS } = await chrome.storage.sync.get("trackingParams");
    trackingParams.forEach(p => url.searchParams.delete(p));

    // Copy to clipboard and show toast
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (cleanUrl) => {
        navigator.clipboard.writeText(cleanUrl).then(() => {
          // Avoid duplicate toasts
          if (document.getElementById('__clean-url-toast')) return;

          const toast = document.createElement('div');
          toast.id = '__clean-url-toast';
          toast.textContent = 'Copied Current URL';
          toast.style.cssText = `
            position: fixed;
            bottom: 32px;
            left: 50%;
            transform: translateX(-50%) translateY(12px);
            background: #3c3d41;
            color: #e8eaed;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            font-size: 15px;
            font-weight: 600;
            padding: 12px 22px;
            border-radius: 14px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.4);
            z-index: 2147483647;
            opacity: 0;
            transition: opacity 0.2s ease, transform 0.2s ease;
            pointer-events: none;
          `;

          document.body.appendChild(toast);

          // Animate in
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              toast.style.opacity = '1';
              toast.style.transform = 'translateX(-50%) translateY(0)';
            });
          });

          // Animate out and remove
          setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(12px)';
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
          }, 2000);
        });
      },
      args: [url.toString()]
    });
  }
});