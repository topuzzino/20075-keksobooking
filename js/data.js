'use strict';

(function () {


  var PIN_NUMBER = 5;
  /*
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;

  var MIN_X = 300;
  var MAX_X = 900;

  var MIN_Y = 130;
  var MAX_Y = 630;
  */
  var ESC_KEYCODE = 27;


  var typeArray = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


  function getTypeValue(type) {
    return typeArray[type];
  }


  var objectsList = [];

  var generateObjectList = function (data) {
    data.forEach(function (objectItem) {
      objectsList.push(objectItem);
    });
  };


  window.backend.load(generateObjectList, window.utils.errorObject);


  window.data = {
    objectsList: objectsList,
    ESC_KEYCODE: ESC_KEYCODE,
    PIN_NUMBER: PIN_NUMBER,
    getTypeValue: getTypeValue,
    FEATURES: FEATURES
  };

})();
