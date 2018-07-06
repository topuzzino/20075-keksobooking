'use strict';

(function () {
  var formFilters = document.querySelector('.map__filters');
  // window.data.PIN_NUMBER;
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;


  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('.map__checkbox');


  var filterType = function (objectItem) {
    return objectItem.offer.type === housingType.value || housingType.value === 'any';
  };


  var filterPrice = function (objectItem) {
    switch (housingPrice.value) {
      case 'low':
        return objectItem.offer.price <= MIN_PRICE;
      case 'middle':
        return objectItem.offer.price > MIN_PRICE && objectItem.offer.price < MAX_PRICE;
      case 'high':
        return objectItem.offer.price >= MAX_PRICE;
      default:
        return objectItem;
    }
  };

  var filterRooms = function (objectItem) {
    return objectItem.offer.rooms === housingRooms.value || housingRooms.value === 'any';
  };

  var filterGuests = function (objectItem) {
    return objectItem.offer.guests === housingGuests.value || housingGuests.value === 'any';
  };

  var filterFeatures = function (objectItem) {
    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked && objectItem.offer.features.indexOf(housingFeatures[i].value) < 0) {
        return false;
      }
    }
    return true;
  };


  var filterAllAds = function (objectsList) {
    var copyObjectsList = objectsList.slice();
    var filteredAds = copyObjectsList.filter(function (copyObjectsList) {
      return filterType(copyObjectsList) && filterPrice(copyObjectsList) && filterRooms(copyObjectsList) && filterGuests(copyObjectsList) && filterFeatures(copyObjectsList);
    });
    return filteredAds.clice(0, window.data.PIN_NUMBER);
  };

  console.log(filterAllAds(window.data.objectsList));

  formFilters.addEventListener('change', window.debounce(filterAllAds(window.data.objectsList)));

  /*
  housingType.addEventListener('change', function () {
      debugger
      if (window.data.objectsList) {
        filterType(window.data.objectsList);
      }
    });
  */

  window.filters = {
    filterAllAds: filterAllAds
  };

})();
