import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const SuperCoin = () => {
    const [superCoin, setSuperCoin] = useState(0);

    const cartItems = useSelector(state => state.cart.cartItems);
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    useEffect(() => {
        if (totalAmount >= 300) {
            setSuperCoin(30);
        } else if (totalAmount >= 200) {
            setSuperCoin(20);
        } else if (totalAmount >= 100) {
            setSuperCoin(10);
        } else {
            setSuperCoin(0);
        }
    }, [totalAmount]);

    return (
        <div className="super-coin" style={{textAlign: "center"}}>
            <h2 className="super-coin-title">Super Coins</h2>
            <p className="super-coin-info">
                {superCoin > 0 ? (
                    <>
                        You will earn <strong style={{ color: '#ff5722' }}>{superCoin}</strong> Super Coins with this purchase
                    </>
                ) : (
                    <>
                        Spend at least <strong>$100</strong> to earn Super Coins
                    </>
                )
                }
            </p>
        </div>
    )

}

export default SuperCoin;