const selectors = {
  toggle: "input[type=checkbox]",
};

const toggleEle = document.querySelector(selectors.toggle);

const getStorage = (storageKey) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(storageKey, (result) => {
      resolve(result[storageKey]);
    });
  });
};

const setStorage = (data) => {
  return new Promise((resolve) => {
    chrome.storage.local.set(data, resolve);
  });
};

const updateUI = async () => {
  const data = await getStorage(["redirect"]);
  toggleEle.checked = data;
};

updateUI();
toggleEle.addEventListener("change", async (event) => {
  await setStorage({ redirect: event.target.checked });
  updateUI();
});
