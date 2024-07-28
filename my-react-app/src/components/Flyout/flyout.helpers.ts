export const convertToCSV = (objArray: unknown[]) => {
  const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  let str = "";

  for (let i = 0; i < array.length; i++) {
    let line = "";
    for (const index in array[i]) {
      if (line !== "") line += ", ";
      if (index === "uid") continue;

      line += `${index}: ${array[i][index]}`;
    }
    str += line + "\r\n";
  }
  console.log(str);
  return str;
};
