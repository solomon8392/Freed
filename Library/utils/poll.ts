let cancelCallback = () => {};

var sleep = (period: number | undefined) => {
  return new Promise((resolve) => {
    cancelCallback = () => {
      console.log("Canceling...");
      // send cancel message...
      return resolve("Canceled");
    };
    setTimeout(() => {
      resolve("tick");
    }, period);
  });
};

const poll = async ({
  callFn,
  period,
  condition,
}: {
  callFn: () => void;
  period: number;
  condition: () => boolean;
}) => {
  callFn();
  console.log("running");

  let asleep = async (period: any) => {
    let response = await sleep(period);
    return response;
  };

  if (condition()) {
    console.log("cancel");
    return cancelCallback();
  }

  do {
    let response = await asleep(period);
    if (response === "Canceled") {
      break;
    }
    callFn();
  } while (!condition());
};

export default poll;
