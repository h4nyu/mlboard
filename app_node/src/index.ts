const sub = async () => {
}

const main = async () => {
  const { job, start, stop } = require("microjob");
  try {
    // start the worker pool
    await start();

    // this function will be executed in another thread
    const myJob = async () => {
      const { job, start } = require("microjob");
      await start();
      const subjob = async () => {
        let i = 0;
        for (i = 0; i < 10000000000; i++) {
          // heavy CPU load ...
        }
        console.log('subjob done');
      }
      job(subjob);
      let i = 0;
      for (i = 0; i < 10000000000; i++) {
        // heavy CPU load ...
      }
      await subjob();
      console.log('mobjob done');
    };
    await Promise.all([
      job(myJob),
      job(myJob),
      job(myJob),
      job(myJob),
    ]);

  } catch (err) {
    console.error(err);
  } finally {
    // shutdown worker pool
    await stop();
  }
}

main();
