export function getPromiseData(promises) {
  return new Promise((resolve, reject) => {
    Promise.all(promises)
      .then(res => {
        Promise.all(res)
          .then(resolve)
      })
      .catch(reject);
  });
}
