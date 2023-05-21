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

// Event listener for toggle change
toggleEle.addEventListener("change", async () => {
  const isEnabled = toggleEle.checked;
  await setStorage({ isEnabled });
});

getStorage("isEnabled").then((isEnabled) => {
  console.log("isEnabled", isEnabled)
  if (isEnabled === undefined) {
    // Set the default value to true if it's undefined in storage
    toggleEle.checked = true;
    setStorage({ isEnabled: true });
  } else {
    toggleEle.checked = isEnabled;
  }
});
