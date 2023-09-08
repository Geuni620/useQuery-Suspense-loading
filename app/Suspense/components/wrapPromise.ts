function wrapPromise(promise: any) {
  let status = 'pending';
  let response: any;

  console.log(
    'promise 들어왔니?',
    promise.then(
      (res: any) => {
        console.log('res', res);
      },
      (err: any) => {
        console.log('err', err);
      },
    ),
  );

  const suspender = promise.then(
    (res: any) => {
      status = 'success';
      response = res;
    },
    (err: any) => {
      status = 'error';
      response = err;
    },
  );

  const read = () => {
    console.log('status', status);
    switch (status) {
      case 'pending':
        throw suspender;
      case 'error':
        throw response;
      default:
        return response;
    }
  };

  return { read };
}

export default wrapPromise;
