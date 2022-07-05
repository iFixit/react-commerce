export const asyncTimings = async (
   name: string,
   asyncFunction: Function,
   ...params: any[]
) => {
   console.time(name);
   const response = asyncFunction(...params);
   response.then(() => console.timeEnd(name));
   return response;
};
