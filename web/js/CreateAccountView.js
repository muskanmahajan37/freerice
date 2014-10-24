define([
    'jquery',
    'underscore',
    'mustache',
    'text!/templates/create.html',
    'js/User'
],function($, _,  Mustache, createAccountTemplate, User){
    'use strict';
    var user = new User();

    var LoginView = Backbone.View.extend ({
        el: $("#content"),

        initialize: function(){
            console.log('login');
        },
        events: {
            "click #createAccount": "create_account"
        },
        create_account: function(event){
            event.preventDefault();
            var userInfo = {
                name: $('#fld_name').val(),
                password: $('#fld_password').val(),
                email: $('#fld_email').val()
            };
            user.create(userInfo);
        },
        render: function(){
            this.$el.html(Mustache.to_html(createAccountTemplate, {data:"data"}));
        }
    });

    return LoginView;
});