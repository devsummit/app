export const UPDATE_SINGLE_INPUT_FIELD = 'app/containers/Payment/UPDATE_SINGLE_INPUT_FIELD';
export const UPDATE_SINGLE_ERROR_FIELD = 'app/containers/Payment/UPDATE_SINGLE_ERROR_FIELD';
export const PAYMENT_METHODS = [
  {
    value: 'key0',
    label: 'Credit Card',
    payment_type: 'credit_card'
  },
  {
    value: 'key1',
    label: 'Bank Transfer',
    payment_type: 'bank_transfer'
  },
  {
    value: 'key2',
    label: 'BCA Klikpay',
    payment_type: 'bca_klikpay',
    bankDestination: 'bca',
    basicDetail: true
  },
  {
    value: 'key3',
    label: 'Klikbca',
    payment_type: 'bca_klikbca',
    bankDestination: 'bca',
    basicDetail: true,
    descriptionDetail: true
  },
  {
    value: 'key4',
    label: 'Mandiri Clickpay',
    payment_type: 'mandiri_clickpay',
    bankDestination: 'mandiri',
    basicDetail: true,
    extraInput: true
  },
  {
    value: 'key5',
    label: 'Epay BRI',
    payment_type: 'bri_epay',
    bankDestination: 'bri',
    basicDetail: true
  },
  {
    value: 'key6',
    label: 'CIMB Clicks',
    payment_type: 'cimb_clicks',
    bankDestination: 'cimb',
    basicDetail: true,
    descriptionDetail: true
  },
  {
    value: 'key7',
    label: 'Danamon Online Banking',
    payment_type: 'danamon_online',
    bankDestination: 'danamon',
    basicDetail: true
  },
  {
    value: 'key8',
    label: 'Indomaret Payment',
    payment_type: 'cstore',
    bankDestination: 'indomaret',
    basicDetail: true
  }
];

export const BANK_TRANSFERS = [
  {
    value: 'key0',
    label: 'Permata Virtual Account',
    bankDestination: 'permata'
  },
  {
    value: 'key1',
    label: 'BCA Virtual Account',
    bankDestination: 'bca',
    basicDetail: true,
    vaNumber: true
  },
  {
    value: 'key2',
    label: 'Mandiri Bill Payment',
    bankDestination: 'mandiri_bill'
  },
  {
    value: 'key3',
    label: 'BNI Virtual Account',
    bankDestination: 'bni',
    basicDetail: true,
    vaNumber: true
  }
];

export const CREDIT_CARD_LIST = [
  {
    value: 'key0',
    label: 'Mandiri',
    bankDestination: 'mandiri'
  },
  {
    value: 'key1',
    label: 'CIMB',
    bankDestination: 'cimb'
  },
  {
    value: 'key2',
    label: 'BNI',
    bankDestination: 'bni'
  },
  {
    value: 'key3',
    label: 'BCA',
    bankDestination: 'bca'
  },
  {
    value: 'key4',
    label: 'BRI',
    bankDestination: 'bri'
  },
  {
    value: 'key5',
    label: 'MAYBANK',
    bankDestination: 'maybank'
  }
];

export const CREDIT_CARD = {
  label: 'Credit card',
  basicDetail: true,
  ccDetail: true
};
