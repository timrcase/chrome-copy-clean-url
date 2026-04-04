const DEFAULT_PARAMS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "fbclid", "gclid", "mc_eid", "ref", "source"
];

let params = [];

function renderTags() {
  const list = document.getElementById("tagList");
  list.innerHTML = "";
  params.forEach((p, i) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = p;

    const btn = document.createElement("button");
    btn.textContent = "×";
    btn.title = `Remove ${p}`;
    btn.addEventListener("click", () => {
      params.splice(i, 1);
      renderTags();
    });

    tag.appendChild(btn);
    list.appendChild(tag);
  });
}

function addParam() {
  const input = document.getElementById("newParam");
  const value = input.value.trim().toLowerCase().replace(/[^a-z0-9_\-]/g, "");
  if (!value || params.includes(value)) { input.value = ""; return; }
  params.push(value);
  input.value = "";
  renderTags();
}

document.getElementById("addBtn").addEventListener("click", addParam);

document.getElementById("newParam").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addParam();
});

document.getElementById("saveBtn").addEventListener("click", async () => {
  await chrome.storage.sync.set({ trackingParams: params });
  const status = document.getElementById("status");
  status.classList.add("visible");
  setTimeout(() => status.classList.remove("visible"), 2000);
});

document.getElementById("resetBtn").addEventListener("click", () => {
  params = [...DEFAULT_PARAMS];
  renderTags();
});

// Show install banner on first open after installation
if (new URLSearchParams(location.search).get("installed") === "1") {
  document.getElementById("installBanner").classList.add("visible");
}

// Load saved params on open
chrome.storage.sync.get("trackingParams", ({ trackingParams }) => {
  params = trackingParams ?? [...DEFAULT_PARAMS];
  renderTags();
});
