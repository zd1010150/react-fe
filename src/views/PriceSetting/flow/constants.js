export const SET_PRICE_TABLE = 'SET_PRICE_TABLE';
export const CHANGE_GROUP = 'CHANGE_GROUP';
export const SET_EDITABLE = 'SET_EDITABLE';
export const CHANGE_CELL = 'CHANGE_CELL';
export const SAVE_ROW = 'SAVE_ROW';
export const CANCEL_ROW = 'CANCEL_ROW';

export const roleGroups = [{
  id: 1,
  name: 'No Profits',
  dataIndex: 'base',
}, {
  id: 2,
  name: 'SVIP Clients',
  dataIndex: 'svip',
}, {
  id: 3,
  name: 'VVIP Clients',
  dataIndex: 'vvip',
}, {
  id: 4,
  name: 'VIP Clients',
  dataIndex: 'vip',
}, {
  id: 5,
  name: 'Normal Clients',
  dataIndex: 'normal',
}, {
  id: 6,
  name: 'Family',
  dataIndex: 'family',
}, {
  id: 7,
  name: 'Friends',
  dataIndex: 'friends',
}];

// A Mapping [id] : [dataIndex] for roleGroups
export const roleGroupIdToKeyMapping = roleGroups.reduce((keyMap, item) => ({
  ...keyMap,
  [item.id]: item.dataIndex,
}), {});

const roleValue = roleGroups.reduce((keyMap, item) => ({
  ...keyMap,
  [item.dataIndex]: 8,
}), {});

const categories = [{
  id: 1,
  name: 'Hot',
}, {
  id: 2,
  name: 'Sale',
}, {
  id: 3,
  name: 'Milk Power',
}, {
  id: 4,
  name: 'Health Care Products',
}, {
  id: 5,
  name: 'Food',
}, {
  id: 6,
  name: 'Baby Products',
}];

export const generatePriceTable = () => (
  categories.map(category => ({
    ...roleValue,
    ...category,
  }))
);
