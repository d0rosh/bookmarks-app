// Initialize Firebase
var config = {
    apiKey: "AIzaSyAgYBr-Oi2kCkj7EvdCanKOZJC9DqH2jpY",
    authDomain: "bookma-1cd0d.firebaseapp.com",
    databaseURL: "https://bookma-1cd0d.firebaseio.com",
    projectId: "bookma-1cd0d",
    storageBucket: "bookma-1cd0d.appspot.com",
    messagingSenderId: "966173985427"
};
firebase.initializeApp(config);
var app = angular.module('app', ['ngRoute','firebase','ngStorage','ngAnimate']);
