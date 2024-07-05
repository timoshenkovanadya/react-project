export function search(name: string) {

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `name=${name}`,
  };

  return fetch(
    "https://stapi.co/api/v1/rest/animal/search?pageNumber=0&pageSize=20",
    options,
  );
}
