'use strict';

(function () {
  var formFilters = document.querySelector('.map__filters');
  // window.data.PIN_NUMBER;


  var housingType = document.getElementById('housing-type');
  var housingPrice = document.getElementById('housing-price');
  var housingRooms = document.getElementById('housing-rooms');
  var housingGuests = document.getElementById('housing-guests');
  var housingFeatures = document.querySelectorAll('.map__checkbox');

  var filterType = function (objectItem) {
    return objectItem.offer.type === housingType.value || housingType.value === 'any';
  };

  var filterPrice = function (objectItem) {
    switch (housingPrice.value) {
      case 'low':
        return objectItem.offer.price <= 10000;
      case 'middle':
        return objectItem.offer.price > 10000 && objectItem.offer.price < 50000;
      case 'high':
        return objectItem.offer.price >= 50000;
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
    var filteredAds = copyObjectsList.filter(function (objectItem) {
      return filterType(objectItem) && filterPrice(objectItem) && filterRooms(objectItem) && filterGuests(objectItem) && filterFeatures(objectItem);
    }).slice(0, window.data.PIN_NUMBER);
    return filteredAds;
  };

  formFilters.addEventListener('change', window.debounce(filterAllAds));

  window.filters = {
    filterAllAds: filterAllAds
  };

})();
