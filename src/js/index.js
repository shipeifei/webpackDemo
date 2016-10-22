var login = require('./login');
var data = require('data');
require('./../css/index.css');
require('./../css/login.less');
import generateText from './sub';
var httpRequestUrl = require("./httpUrl.js");
var httpRequestService = require("./httpRequestService.js");
var request = new httpRequestService();

function getTeacherList(parames, successCallback, failCallback) {
    request.get(httpRequestUrl.teacherList, parames, successCallback, failCallback, 'json', false);

}

getTeacherList({

    },
    function(data) {

        console.log(data);
    },
    function(error) {

    }
);