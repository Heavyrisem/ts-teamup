// eslint-disable-next-line import/prefer-default-export
export const sleep = (timeout: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), timeout);
  });
