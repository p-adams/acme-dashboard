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
