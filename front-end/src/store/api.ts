export const fetchData = async (url: string) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/events/${url}`);
    const data = await response.json();
    return data;
  } catch (e) {
    // Could handle this with a little more care :(
    /* tslint:disable:no-console */
    console.error(e);
  }
};
