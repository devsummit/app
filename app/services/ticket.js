import Api from './api';

export default {
  checkin: ticketCode => Api.post('api/v1/users/tickets/checkin', { ticket_code: ticketCode })
};
