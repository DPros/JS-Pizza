/**
 * Created by chaika on 25.01.16.
 */


$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var API = require('./API');
    
    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();
    $('.filter .selects span').each(function(){
        $(this).click(function(){
            PizzaMenu.filterPizza($(this))
        });
    });
    $('#order-page button').click(function(){
        var form = $('#order-form');
        API.createOrder({name: form.find('#input-name').val(), tel: form.find('#input-tel').val(), address: form.find('#input-address').val()}, function(err, data){
            if(err){
                alert("Сталася помилка. Спробуйте, будь ласка, пізніше.");
                return;
            }
            alert("Ваше замовлення прийнято");
        });
    });
    $('#side-panel .order-btn').click(function(){
        $(this).hide();
        $('#content').hide();
        $('#side-panel .edit-btn').show();
        $('#order-page').show();
    });
});