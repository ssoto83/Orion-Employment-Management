const connectDb = require("../config/connection");
const { User,Employee } = require("../models");
const userSeeds = require("./userSeeds.json");
const employeeSeeds = require("./employeeSeeds.json");
const timeOffRequestsSeeds = require("./timeOffRequestsSeeds.json");
const cleanDB = require("./cleanDB");

connectDb.once("open", async () => {
  try {
    await cleanDB(connectDb);
    console.log("cleaned");
    await User.create(userSeeds);

    await Employee.create(employeeSeeds);

    // await TimeOffRequest.create(timeOffRequestsSeeds);
    console.log("all done!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
