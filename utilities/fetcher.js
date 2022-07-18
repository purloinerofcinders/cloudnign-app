export const fetcher = async (uri, method, body) => {
  try {
    const res = await fetch(uri, {
      method: method,
      body: JSON.stringify(body)
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return {error: error};
  }
}