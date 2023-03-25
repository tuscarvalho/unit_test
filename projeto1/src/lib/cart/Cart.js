import Dinero from 'dinero.js';
import { calculateDiscount } from '../discount.utils';

const Money = Dinero;
Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

class Cart {
    constructor() {
        this.items = []
    };

    add(item) {
        try {
            if(this.items.length > 0) { 
                for (const iterator of this.items) {
                    if(iterator.product.id !== item.product.id) {
                        this.items.push(item);
                    };
                };
            }else {
                this.items.push(item);
            };
        } catch (e) {
            console.log(e);
        };      
    };

    remove(item) {
        this.items = this.items.filter(i => i.product.id !== item.product.id);
    };

    getTotal() {
        return this.items.reduce((acc, { product, quantity, condition }) => {
            const amount = Money({ amount: product.price * quantity });
            let discount = Money({ amount: 0 });
            
            if(condition) {
                discount = calculateDiscount(amount, quantity, condition);
            };

            return acc.add(amount).subtract(discount);
        }, Money({ amount: 0 }));
    };

    summary() {
        const total = this.getTotal();
        const formatted = total.toFormat('$0,0.0');
        const items = this.items;

        return { total, formatted, items };
    };

    checkout() {
        const {total, items} = this.summary();
        this.items = [];
        
        return {
            total,
            items
        };
    };
};

export default Cart; 