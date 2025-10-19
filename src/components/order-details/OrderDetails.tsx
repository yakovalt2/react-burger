import React from 'react';
import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

type Props = {
  orderNumber: number;
};

const OrderDetails: React.FC<Props> = ({ orderNumber }) => {
  return (
    <div className={styles.container}>
      <p className={`text text_type_digits-large mb-8 ${styles.glowingText}`}>{orderNumber}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <CheckMarkIcon type="primary" />
      <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
};
