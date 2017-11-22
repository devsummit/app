import beacon from './beacon';
import { getProfileData } from '../helpers';
module.exports = async (taskData) => {
  if (taskData) {
    const data = await beacon.getBeacons();
    const user = await getProfileData();
    const beacons = JSON.parse(taskData.beacon);
    beacon.receiveBeacons(beacons, data, user, false);
  }
};
