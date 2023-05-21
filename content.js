const browser = chrome || browser;

function redirectToWatchPage() {
  const { origin, pathname } = location;
  const isShorts = pathname.startsWith("/shorts/");
  const newURL = `${origin}${pathname.replace("shorts/", "watch?v=")}`;
  isShorts && location.replace(newURL);
}

function run() {
  redirectToWatchPage();
  document.addEventListener("yt-navigate-start", redirectToWatchPage);
}

const setStorage = (data) => {
  return new Promise((resolve) => {
    chrome.storage.local.set(data, resolve);
  });
};

chrome.storage.local.set({ redirect: true });

chrome.storage.onChanged.addListener(function (event) {
  console.log(event);
});
