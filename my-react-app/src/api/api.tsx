const options = {
  method: "POST",
  headers: {
    accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export const search = (name: string, page: number = 0) => {
  return fetch(
    `https://stapi.co/api/v1/rest/animal/search?pageNumber=${page}&pageSize=20`,
    { ...options, body: `name=${name}` },
  );
};

export const fetchDetailed = (detailedId: string) => {
  return fetch(
    `https://stapi.co/api/v1/rest/animal?uid=${detailedId}`,
  );
};
