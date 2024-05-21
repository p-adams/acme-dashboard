export function render(element: HTMLElement, h: string) {
  element.innerHTML = h;
}

export async function getAPOD() {
  return await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${
      import.meta.env.VITE_API_KEY
    }`
  ).then((res) => res.json());
}

export const DOM_UTILS = {
  withSelectors: <T extends HTMLElement>(selectors: string) => {
    return document.querySelector<T>(selectors);
  },

  getCurrentTab(element: any) {
    if (!element) {
      return null;
    }
    const tabItems = element?.firstChild?.children;
    let curr = null;
    for (const tabItem of tabItems) {
      for (const tab of tabItem.children) {
        console.log("TAB: ", tab);
        if (tab.checked) {
          curr = tab;
        }
      }
    }
    return curr;
  },
};
