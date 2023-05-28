const redirectToWatchPage = () => {
  const { origin, pathname } = location;
  const isShorts = pathname.startsWith("/shorts/");
  const newURL = `${origin}${pathname.replace("shorts/", "watch?v=")}`;
  isShorts && location.replace(newURL);
};

const run = () => {
  redirectToWatchPage();
  document.addEventListener("yt-navigate-start", redirectToWatchPage);
};

const setStorage = (data) => {
  return new Promise((resolve) => {
    chrome.storage.local.set(data, resolve);
  });
};

chrome.storage.local.get("isEnabled", (result) => {
  const isEnabled = result.isEnabled;
  if (isEnabled === undefined || isEnabled) {
    run();
  }
});
