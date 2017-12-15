import {
  SET_ORDERS_BOARD_COLLAPSE,
  SET_ORDER_COLLAPSE,
  SELECTING_GOODS_QUANTITY,
  ADD_GOODS_TO_ORDER,
  SET_ORDER_STATUS,
  CREATE_ORDER,
  DELETE_ORDER,
  DELETE_ORDER_GOODS,
  SET_ORDER_GOODS_QUANTITY } from './actionType';

  export const setOrderBoardStatus = (collapsed) => ({
      type: SET_ORDERS_BOARD_COLLAPSE,
      collapsed
  })
  export const setOrderCollapse = (orderId, collapsed) => ({
      type: SET_ORDER_COLLAPSE,
      orderId,
      collapsed,
  })
  export const selectingGoods = () => ({

  })
