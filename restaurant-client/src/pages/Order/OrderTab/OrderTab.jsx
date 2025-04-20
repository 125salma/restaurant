
import FoodCart from '../../../components/FoodCart/FoodCart';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const OrderTab = ({ items }) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };
    return (
        <div>
            {/* pagination use daisyUi theke ekhono complete hoyenai */}
            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='grid md:grid-cols-3 gap-10'>
                        {
                            items.map(item => <FoodCart
                                key={item._id}
                                item={item}></FoodCart>)
                        }
                    </div>

                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default OrderTab;