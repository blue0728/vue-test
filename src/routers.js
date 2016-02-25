'use strict'

module.exports = function(router) {
    router.map({
        '/:id': {
            name: 'home',
            component: function(resolve) {
                require(['./views/index.vue'], resolve);
            }
        },
        '/category/:id': {
            name: 'category',
            component: function(resolve) {
                require(['./views/category.vue'], resolve);
            }
        },
        '/catepros/:id/:name': {
            name: 'catepros',
            component: function(resolve) {
                require(['./views/catepros.vue'], resolve);
            }
        },
        '/search/:id': {
            name: 'search',
            component: function(resolve) {
                require(['./views/search.vue'], resolve);
            }
        },
        'evaluate/:id': {
            name: 'evaluate',
            component: function(resolve) {
                require(['./views/evaluate.vue'], resolve);
            }
        },
        'notice/:id': {
            name: 'notice',
            component: function(resolve) {
                require(['./views/notice.vue'], resolve);
            }
        },
        'cart': {
            name: 'cart',
            component: function(resolve) {
                require(['./views/cart.vue'], resolve);
            }
        },
        'details/:id': {
            name: 'details',
            component: function(resolve) {
                require(['./views/details.vue'], resolve);
            }
        },
        'contact': {
            name: 'contact',
            component: function(resolve) {
                require(['./views/contact.vue'], resolve);
            }
        },
        'order': {
            name: 'order',
            component: function(resolve) {
                require(['./views/order.vue'], resolve);
            }
        },
        'user': {
            name: 'user',
            component: function(resolve) {
                require(['./views/user.vue'], resolve);
            }
        },
        'login': {
            name: 'login',
            component: function(resolve) {
                require(['./views/login.vue'], resolve);
            }
        },
        'forget/:id': {
            name: 'forget',
            component: function(resolve) {
                require(['./views/forget.vue'], resolve);
            }
        },
        'favorite': {
            name: 'favorite',
            component: function(resolve) {
                require(['./views/favorite.vue'], resolve);
            }
        },
        'bonus': {
            name: 'bonus',
            component: function(resolve) {
                require(['./views/bonus.vue'], resolve);
            }
        },
        'test/test': {
            name: 'test',
            component: function(resolve) {
                require(['./views/test.vue'], resolve);
            }
        }

    })
}