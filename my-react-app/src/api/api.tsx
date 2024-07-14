const options = {
  method: "POST",
  headers: {
    accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export const search = (name: string, page: string = '0') => {
  return fetch(
    `https://stapi.co/api/v1/rest/animal/search?pageNumber=${Number(page)-1}&pageSize=10`,
    { ...options, body: `name=${name}` },
  );
};

export const fetchDetailed = (detailedId: string) => {
  return fetch(
    `https://stapi.co/api/v1/rest/animal?uid=${detailedId}`,
  );
};
