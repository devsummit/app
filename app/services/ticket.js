import Api from './api';

export default {
  checkin: ticketCode => Api.post('api/v1/user/tickets/checkin', { ticket_code: ticketCode })
};
