"use strict";

define(['backbone'], function(Backbone) {
    var CreateAccount = Backbone.Model.extend({
        defaults: {
            name: null,
            email: null,
            password: null
        },
        url: function() {
            return 'http://localhost:8080/account/create';
        }
    });

    return CreateAccount;
});