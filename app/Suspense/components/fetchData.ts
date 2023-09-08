import wrapPromise from './wrapPromise';

function fetchData(url: string) {
  // console.log('여기는 url', url);
  const promise = fetch(url)
    .then((res) => res.json())
    .then((res) => res.data);

  return wrapPromise(promise);
}

export default fetchData;
