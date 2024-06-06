export async function request(path: string) {
  return await $fetch(
    `${import.meta.env.VITE_BASE_URL}/${path}api_key=${
      import.meta.env.VITE_API_KEY
    }`
  );
}

async function $fetch(url: string) {
  return await fetch(url).then((res) => res);
}
