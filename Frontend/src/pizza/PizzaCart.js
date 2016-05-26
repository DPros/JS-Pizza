/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var storage = require('../storage.js');
//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    var contains = false;
    Cart.forEach(function(item){
        if(item.pizza==pizza&&item.size==size){
            item.quantity+=1;
            contains = true;
            return;
        }
    });
    //Приклад реалізації, можна робити будь-яким іншим способом
    if(!contains){
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    }
    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити
    Cart = jQuery.grep(Cart, function(value) {
    return value != cart_item;
});
    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...
    Cart = (storage.get('cart') || []);
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
    storage.set('cart', Cart);
    //Очищаємо старі піци в кошику
    $cart.html("");
    var sum=0;
    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);
        sum+=cart_item.quantity*cart_item.pizza[cart_item.size].price;
        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            
            //Оновлюємо відображення
            updateCart();
        });
        
        $node.find(".minus").click(function(){
            //Збільшуємо кількість замовлених піц
            if(cart_item.quantity==1){
                removeFromCart(cart_item);
            }else{
                cart_item.quantity -= 1;
            }
            //Оновлюємо відображення
            updateCart();
        });
        
        $node.find(".remove").click(function(){
            //Збільшуємо кількість замовлених піц
            removeFromCart(cart_item);

            //Оновлюємо відображення
            updateCart();
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    $('#side-panel #bottom .sum span').text(sum);
    
    $('#side-panel .clear-cart').click(function(){
        Cart=[];
        updateCart();
    });
    $('#side-panel .order span').text(Cart.length);
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;