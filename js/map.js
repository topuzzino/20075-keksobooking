'use strict';

var OBJECT_NUMBER = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;

var MIN_X = 300;
var MAX_X = 900;

var MIN_Y = 130;
var MAX_Y = 630;


// функция получает рандомное число между min и max
var randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};


var randomItem = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};


// функция рандомно перемешивает элементы массива, не повторяя их
var randomShuffleArray = function (arr) {
  var m = arr.length;
  var t;
  var i;

  // While there remain elements to shuffle …
  while (m) {
    // Pick a remaining element …
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
};


function getUserAvatar(index) {
  return 'img/avatars/user0' + index + '.png';
}
function getSchuffledAvatarArray(count) {
  var avatars = [];
  for (var i = 1; i <= count; i++) {
    avatars.push(getUserAvatar(i));
  }
  return randomShuffleArray(avatars);
}

/*
var avatarArray = [];
for (var i = 1; i <= OBJECT_NUMBER; i++) {
    avatarArray.push('img/avatars/user0' + i + '.png');
}
avatarArray = randomShuffleArray(avatarArray);
// console.log(avatarArray);

var getAvatar = function () {
  var avatarElement = avatarArray.pop();
  return avatarElement;
};
// console.log(getAvatar());
*/

var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var getTitle = function (titleArray) {
  var titleIndex = randomNumber(0, titleArray.length);
  return titleArray[titleIndex];
};
// console.log('getTitle:' + getTitle());


var getAddress = function (x, y) {
  return x + ', ' + y;
};
// console.log('getAddress:' + getAddress(600, 350));


var getPrice = randomNumber(MIN_PRICE, MAX_PRICE);
// console.log('getPrice:' + getPrice);


var typeArray = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};


var getTypeValue = function (type) {
  return typeArray[type];
};


var getType = function () {
  var type = Object.keys(typeArray);
  var typeIndex = randomNumber(0, type.length);
  return type[typeIndex];
};
// console.log('getType:' + getType());


// "rooms": число, случайное количество комнат от 1 до 5
var getRooms = randomNumber(MIN_ROOMS, MAX_ROOMS);
// console.log('getRooms:' + getRooms);


// "guests": число, случайное количество гостей, которое можно разместить
var getGuests = randomNumber(MIN_ROOMS * 2, MAX_ROOMS * 3);
// console.log('getGuests:' + getGuests);


// "checkin": строка с одним из трёх значений: 12:00, 13:00 или 14:00,
var getCheckin = function () {
  return randomItem(['12:00', '13:00', '14:00']);
};
// console.log('getCheckin:' + getCheckin());


// "checkout": строка с одним из трёх значений: 12:00, 13:00 или 14:00
var getCheckout = function () {
  return randomItem(['12:00', '13:00', '14:00']);
};
// console.log('getCheckout:' + getCheckout());


// "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var getFeatures = function () {
  var featuresIndex = randomNumber(1, featuresArray.length);
  var features = [];
  for (var i = 0; i < featuresIndex; i++) {
    features.push(featuresArray[i]);
  }
  return features;
};
// console.log('features:' + getFeatures());


var getDescription = function () {
  return '';
};


var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];


var getPhotos = function () {
  return randomShuffleArray(PHOTOS);
};
// console.log('getPhotos: ' + getPhotos());


var getLocationX = function (minx, maxx) {
  return randomNumber(minx, maxx);
};


var getLocationY = function (miny, maxy) {
  return randomNumber(miny, maxy);
};
// console.log('getLocationX:' + getLocationX() + '; getLocationY:' + getLocationY());


// функция генерирует объекты в ходе цикла
var generateObjectList = function (objNumber) {
  var shuffledAvatarArray = getSchuffledAvatarArray(objNumber);
  var objectsList = [];
  var objectItem = {};

  var locationX = '';
  var locationY = '';

  for (var i = 0; i < objNumber; i++) {

    locationX = getLocationX(MIN_X, MAX_X);
    locationY = getLocationY(MIN_Y, MAX_Y);

    objectItem = {
      'author': {
        'avatar': shuffledAvatarArray[i]
      },

      'offer': {
        'title': getTitle(titles),
        'address': getAddress(locationX, locationY),
        'price': getPrice,
        'type': getType(typeArray),
        'rooms': getRooms,
        'guests': getGuests,
        'checkin': getCheckin(),
        'checkout': getCheckout(),
        'features': getFeatures(),
        'description': getDescription(),
        'photos': getPhotos()
      },

      'location': {
        'x': locationX,
        'y': locationY
      }
    };
    objectsList.push(objectItem);
  }
  return objectsList;
};
var objectsList = generateObjectList(OBJECT_NUMBER);
// console.log(objectsList);


// отрисовывает пины и помещает их на карту
var makePin = function (objList) {
  // находит шаблон для отрисовки пина на карте
  var pinTemplate = document.querySelector('.map__pins');
  var similarPin = document.querySelector('template').content.querySelector('.map__pin');

  objList.forEach(function (obj, objIndex) {
    var pinElement = similarPin.cloneNode(true);
    var img = pinElement.querySelector('img');
    pinElement.style.left = obj.location.x - img.width / 2 + 'px';
    pinElement.style.top = obj.location.y - img.height + 'px';
    img.src = obj.author.avatar;
    img.alt = obj.offer.title;
    pinElement.setAttribute('data-ad-number', objIndex);

    // создает контейнер для будущих данных
    var fragment = document.createDocumentFragment();
    fragment.appendChild(pinElement);
    pinTemplate.appendChild(fragment);
  });
};


var renderFeatures = function (features) {
  var featureFragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var newElement = document.createElement('li');
    newElement.classList.add('popup__feature');
    newElement.classList.add('popup__feature--' + features[i]);
    featureFragment.appendChild(newElement);
  }
  return featureFragment;
};
// console.log(renderFeatures(featuresArray));


// фотки
var renderPhotos = function (photos) {
  var photosFragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var photoItem = document.createElement('img');
    // <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">
    photoItem.classList.add('popup__photo');
    photoItem.src = photos[i];
    photoItem.style.width = '45px';
    photoItem.style.height = '40px';
    photoItem.alt = 'Фотография жилья';
    photosFragment.appendChild(photoItem);
    // console.log(photosFragment);
  }
  return photosFragment;
};


// отрисовывает квартирные карточки с объявами
var makeAd = function (obje) {
  // находит шаблон для отрисовки квартирной карточки
  var adTemplate = document.querySelector('template').content.querySelector('.map__card');
  var adElement = adTemplate.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = obje.offer.title;
  adElement.querySelector('.popup__text--address').textContent = obje.offer.address;
  adElement.querySelector('.popup__text--price').textContent = obje.offer.price + ' ₽/ночь';
  adElement.querySelector('.popup__type').textContent = getTypeValue(obje.offer.type);
  adElement.querySelector('.popup__text--capacity').textContent = obje.offer.rooms + ' комнаты для ' + obje.offer.guests + ' гостей';
  adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + obje.offer.checkin + ', выезд до ' + obje.offer.checkout;
  adElement.querySelector('.popup__features').textContent = '';
  adElement.querySelector('.popup__features').appendChild(renderFeatures(obje.offer.features));
  adElement.querySelector('.popup__description').textContent = obje.offer.description;
  adElement.querySelector('.popup__photos').textContent = '';
  adElement.querySelector('.popup__photos').appendChild(renderPhotos(obje.offer.photos));
  adElement.querySelector('.popup__avatar').src = obje.author.avatar;

  return adElement;
};
/*
var adFragment = document.createDocumentFragment();
adFragment.appendChild(makeAd(objectsList));
document.querySelector('.map').insertBefore(adFragment, document.querySelector('.map__filters-container'));
*/

// -------------

// неактивное состояние в самом начале
var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
var addressValue = form.querySelector('#address');

var MAIN_PIN_WIDTH = mainPin.querySelector('img').width;
var MAIN_PIN_HEIGHT = mainPin.querySelector('img').height;


var setDefaultAddress = function () {
  var MAIN_PIN_X = parseInt(mainPin.style.left, 10) - MAIN_PIN_WIDTH / 2;
  var MAIN_PIN_Y = parseInt(mainPin.style.top, 10) - MAIN_PIN_HEIGHT / 2;
  // console.log(MAIN_PIN_X, MAIN_PIN_Y);
  addressValue.value = MAIN_PIN_X + ', ' + MAIN_PIN_Y;
};

form.classList.add('ad-form--disabled');

var activateMap = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  makePin(objectsList);
  document.querySelectorAll('form fieldset').disabled = false;
};


var pinContainer = document.querySelector('.map__pins');

var closeAd = function () {
  var popup = map.querySelector('.map__card');
  var popupClose = popup.querySelector('.popup__close');

  // map.removeChild(popup);
  popupClose.addEventListener('click', function () {
    popupClose.parentElement.remove();
    // map.querySelector('.map__card').remove();
  });
};

var deleteOldAd = function () {
  var oldAd = map.querySelector('.map__card.popup');
  if (oldAd) {
    oldAd.remove();
  }
};

var mouseOnPinHandler = function (evt) {
  evt.preventDefault();
  var clickedPin = evt.target;
  if (clickedPin) {
    deleteOldAd();
  }
  var pinId = clickedPin.dataset.adNumber;
  if (objectsList[pinId]) {
    pinContainer.appendChild(makeAd(objectsList[pinId]));
    closeAd();
  }
  // console.log(clickedPin);
};


pinContainer.addEventListener('click', mouseOnPinHandler);


// -------------


// синхронизация полей ввода типа аппартаментов и их мин цены
var flatType = document.getElementById('type');
var flatPrice = document.getElementById('price');

var minPrice = [0, 1000, 5000, 10000];
var flatTypeArray = Array.from(flatType.options);
// console.log(flatTypeArray);

var getMinPriceToType = function () {
  // var currentType = flatType.value;
  // console.log(currentType);

  flatTypeArray.forEach(function (option, index) {
    if (option.selected) {
      flatPrice.min = minPrice[index];
      flatPrice.placeholder = minPrice[index];
    }
  });
};

getMinPriceToType();

flatType.addEventListener('change', getMinPriceToType);


// синхронизация полей чекина и чекаута
var checkin = document.getElementById('timein');
var checkout = document.getElementById('timeout');

checkin.addEventListener('change', function () {
  checkout.value = checkin.value;
});

checkout.addEventListener('change', function () {
  checkin.value = checkout.value;
});


// синхронизация поля "количество комнат" с полем "Количество мест"
var roomNumber = document.getElementById('room_number');
var guestNumber = document.getElementById('capacity');

/*
roomNumber.value = 1; -> guestNumber.value = 1
roomNumber.value = 2; -> guestNumber.value = 1 && 2;
roomNumber.value = 3; -> guestNumber.value = 1 && 2 && 3;
roomNumber.value = 100; -> guestNumber.value = 0;
*/

var roomNumberToCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

var getRoomGuestsSynch = function () {
  // var roomArray = Array.from(roomNumber.options);
  var capacityArray = Array.from(guestNumber.options);

  var currentRoom = roomNumber.value;
  // console.log('currentRoom: ' + currentRoom);
  // var currentGuests = guestNumber.value;
  // console.log('currentGuests: ' + currentGuests);

  var maxCapacity = roomNumberToCapacity[currentRoom];
  // console.log('maxCapacity: ' + maxCapacity);

  capacityArray.forEach(function (option) {
    if (maxCapacity.includes(option.value)) {
      option.disabled = false;
      option.selected = true;
    } else {
      option.selected = false;
      option.disabled = true;
    }
  });
};
getRoomGuestsSynch();
roomNumber.addEventListener('change', getRoomGuestsSynch);
// guestNumber.addEventListener('change', );


// -------------

var mainPinArrow = 22;
var mainPinFullHeight = MAIN_PIN_HEIGHT + mainPinArrow;

var TOP_BORDER = 130 - mainPinFullHeight;
var BOTTOM_BORDER = 630;
var RIGHT_BORDER = map.offsetWidth;
var LEFT_BORDER = 150;

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  activateMap(evt);

  var startCoord = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoord.x - moveEvt.clientX,
      y: startCoord.y - moveEvt.clientY
    };

    startCoord = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (startCoord.x >= LEFT_BORDER && startCoord.x <= RIGHT_BORDER && startCoord.y >= TOP_BORDER && startCoord.y <= BOTTOM_BORDER) {
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    }

    setDefaultAddress();
  };


  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    setDefaultAddress();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
