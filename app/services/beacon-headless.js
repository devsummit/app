import beacon from './beacon';
import { getProfileData } from '../helpers';
module.exports = async (taskData) => {
  if (taskData) {
    console.log('response', taskData.beacon);
    const data = await beacon.getBeacons();
    const user = await getProfileData();
    const beacons = JSON.parse(taskData.beacon);
    console.log(beacons);
    beacon.receiveBeacons(beacons, data, user, false);
  }
};
