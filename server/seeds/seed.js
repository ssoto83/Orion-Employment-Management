const db = require('../config/connection');
const { User, Employee, TimeOffRequest } = require('../models');
const userSeeds = require('./userSeeds.json');
const employeeSeeds = require('./employeeSeeds.json');
const timeOffRequestsSeeds = require('./timeOffRequestsSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Employee ', 'employees');

    await cleanDB('Users', 'users');

    await cleanDB('TimeOffRequest', 'timeOffRequests');

    await User.create(userSeeds);

    await Employee.create(employeeSeeds);

    await TimeOffRequest.create(timeOffRequestsSeeds);

    for (let i = 0; i < Employee.length; i++) {
      const { _id, user } = await user.create(userSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            user: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
