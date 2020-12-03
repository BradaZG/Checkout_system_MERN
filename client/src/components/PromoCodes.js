import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { addPromotion, removePromotion } from '../redux/checkoutActions';
import { useDispatch, useSelector } from 'react-redux';

const PromoCodes = () => {
  const [promoCode, setPromoCode] = useState('');
  const [errorMessagePromo, setErrorMessagePromo] = useState('');
  const promotions = useSelector((state) => state.promotions);
  const itemsInBasket = useSelector((state) => state.orderItems);
  const motionDiscount = useSelector((state) => state.motionDiscount);
  const smokeDiscount = useSelector((state) => state.smokeDiscount);
  const [motionCount, setMotionCount] = useState(0);
  const [smokeCount, setSmokeCount] = useState(0);
  const total = useSelector((state) => state.total);
  const totalDiscounts = useSelector((state) => state.totalDiscounts);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setPromoCode(e.target.value);
    setErrorMessagePromo('');
  };

  const removePromoCode = (id, code) => {
    dispatch(removePromotion(id, code));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    itemsInBasket.map((item) => {
      if (item.itemName === 'Motion Sensor') {
        setMotionCount(item.count);
      }
      if (item.itemName === 'Smoke Sensor') {
        setSmokeCount(item.count);
      }
      return null;
    });
  }, [itemsInBasket]);

  const handleAddCode = () => {
    if (
      promoCode !== '20%OFF' &&
      promoCode !== '5%OFF' &&
      promoCode !== '20EUROFF'
    ) {
      setErrorMessagePromo('Code not valid!');
      setPromoCode('');
    } else if (
      promotions.some((promotion) => promotion.code === '20%OFF') &&
      (promoCode === '5%OFF' || promoCode === '20EUROFF')
    ) {
      setErrorMessagePromo("Can't combine these codes!");
      setPromoCode('');
    } else if (
      (promotions.some((promotion) => promotion.code === '5%OFF') ||
        promotions.some((promotion) => promotion.code === '20EUROFF')) &&
      promoCode === '20%OFF'
    ) {
      setErrorMessagePromo("Can't combine these codes!");
      setPromoCode('');
    } else if (
      promotions.some((promotion) => promotion.code === '5%OFF') &&
      promoCode === '5%OFF'
    ) {
      setErrorMessagePromo('Code already used!');
      setPromoCode('');
    } else if (
      promotions.some((promotion) => promotion.code === '20%OFF') &&
      promoCode === '20%OFF'
    ) {
      setErrorMessagePromo('Code already used!');
      setPromoCode('');
    } else if (
      promotions.some((promotion) => promotion.code === '20EUROFF') &&
      promoCode === '20EUROFF'
    ) {
      setErrorMessagePromo('Code already used!');
      setPromoCode('');
    } else if (total > 0) {
      dispatch(addPromotion({ code: promoCode, id: promoCode }));
      setPromoCode('');
      setErrorMessagePromo('');
    } else {
      setErrorMessagePromo('First add some items to the basket...');
    }
  };

  return (
    <div className='checkout__total'>
      <div>
        <h4>
          TOTAL: € {Number(Math.round(parseFloat(total + 'e' + 2)) + 'e-' + 2)}
        </h4>
        {errorMessagePromo && <h4>{errorMessagePromo}</h4>}
        <div className='basket__code'>
          <form onSubmit={handleSubmit}>
            <input
              className='basket__input'
              type='text'
              value={promoCode}
              onChange={handleInput}
            />
            <button
              className='basket__button'
              type='submit'
              onClick={handleAddCode}
            >
              ADD PROMO CODE
            </button>
          </form>
        </div>
        {promotions.length ? <h4>PROMO CODES:</h4> : null}
        {motionCount >= 3 ? (
          <h4>
            3 Motion sensors for 65.00 EUR x {Math.floor(motionCount / 3)}
          </h4>
        ) : null}
        {smokeCount >= 2 ? (
          <h4>2 Smoke sensors for 35.00 EUR x {Math.floor(smokeCount / 2)}</h4>
        ) : null}
        {promotions &&
          promotions.map((promotion) => (
            <div key={promotion.id} className='basket__codes'>
              <h4>{promotion.code}</h4>
              <button
                onClick={() => removePromoCode(promotion.id, promotion.code)}
              >
                <DeleteIcon style={{ cursor: 'pointer' }} />
              </button>
            </div>
          ))}
      </div>
      <h4 className='checkout__amount'>
        FINAL AMOUNT: €{' '}
        {Number(
          Math.round(
            parseFloat(
              total - totalDiscounts - motionDiscount - smokeDiscount + 'e' + 2
            )
          ) +
            'e-' +
            2
        )}
      </h4>
    </div>
  );
};

export default PromoCodes;
