function build(data) {
    console.log("In build");
    return 1;
  }
  
  console.log("Before");
  (async () => {
    console.log("In async");
    let result = await build([1, 3, 5]);
    console.log(result); // 2
  })();
  console.log("After");