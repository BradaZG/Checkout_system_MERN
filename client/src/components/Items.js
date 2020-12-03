import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchItems } from '../redux/checkoutActions';
import Item from './Item';

const Items = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <section className='items__container'>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <article>
          <h2>SELECT ITEMS</h2>
          {items.map((item) => (
            <React.Fragment key={item._id}>
              <Item item={item} />
            </React.Fragment>
          ))}
        </article>
      )}
    </section>
  );
};

export default Items;
