propertyDetailsExample = {
    'title': 'Property 1',
    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce placerat velit nulla, nec gravida est pharetra at. Fusce mattis nunc vel porttitor scelerisque. Integer urna velit, interdum eu velit eu, posuere tempor mi. Curabitur lobortis libero at purus varius blandit. Vivamus sed tellus sed elit tincidunt tempor sed sit amet ligula. Nunc vitae sem sed odio facilisis mollis. Cras sed ipsum porta, pellentesque enim eget, euismod nibh. Proin a arcu ut turpis mollis varius vitae quis est. Cras elementum sed orci ac gravida.',
    'country': 'Albania',
    'city': 'Tirana',
    'street': 'Rr. Kavajes',
    'buildingNumber': '45',
    'aptNumber': 4,
    'no_beds': 3,
    'no_bathroom': 1,
    'no_balcony': 1,
    'price': 34,
    'currency': 'eur',
    'mainPicture': 'https://thumbs.dreamstime.com/b/modern-apartment-interior-grey-sofa-footstool-armcha-armchair-wooden-floor-tv-colorful-graphic-photo-concept-122713421.jpg',
    'host': {
        'name': 'host2',
        'firstName': 'John',
        'lastName': 'Doe',
        'details': {
            'description': 'lorem ipsum description, have been a host for 4 years'
        }
    },
    'images': [
        'https://thumbs.dreamstime.com/b/modern-apartment-interior-grey-sofa-footstool-armcha-armchair-wooden-floor-tv-colorful-graphic-photo-concept-122713421.jpg',
        'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?cs=srgb&dl=pexels-chait-goli-1918291.jpg&fm=jpg',
        'https://thumbs.dreamstime.com/b/apartment-building-balconies-photoof-34869405.jpg'
    ],
    'utilities': ['wholeUnit', 'balcony', 'shower', 'wc', 'hairdryer', 'oven', 'fridge', 'coffee', 'elevator', 'washingMachine'],
    'type': 'whole appartment',
    'rating': '4',
    'reviews': [{
        'author': 'Jane Doe',
        'rating': '4.5',
        'descriprion': 'great, clean and spatious appartment in the city center'
    }]
}

const utilitiesIconMap = {
    'wholeUnit': 'fa-house',
    'balcony': 'fa-tree-city',
    'shower': 'fa-shower',
    'wc': 'fa-toilet',
    'oven': 'fa-oven',
    'fridge': 'fa-refrigerator',
    'microwave': 'fa-microwave',
    'coffee': 'fa-mug-hot',
    'elevator': 'fa-elevator',
    'washingMachine': 'fa-washing-machine'
}

jQuery(() => {
    var property;
    var urlParams = parse_query_string(window.location.search.substring(1));
    $('#reserve').prop('disabled', true);

    var checkin = $('#checkin');
    var checkout = $('#checkout');
    var firstName = $('#first-name');
    var lastName = $('#last-name');
    var email = $('#email');


    if (urlParams.id) {
        // get property details
        $.ajax({
            url: "http://localhost:8080/api/v1/property/" + urlParams.id,
            type: "GET",
            success: function(response) {
                property = response;
                setHeader(property);
                setImages(property);
                setPrice(property);
                setPropertyDescription(property);
                setPropertyUtilities(property);
            },
            error: function(xhr) {
                console.log(xhr);
                if (xhr.status === 404) {
                    property = propertyDetailsExample;

                    setHeader(property);
                    setImages(property);
                    setPrice(property);
                    setPropertyDescription(property);
                    setPropertyUtilities(property);
                }
            }
        });

        // pre-fill reservation form 
        if (urlParams.checkInDate) {
            checkin.val(checkInDate);
        }

        if (urlParams.checkInDate) {
            checkout.val(checkOutDate)
        }
    }

    $('#check-availability').on('click', function(e) {
        e.preventDefault();
        checkAvailability()
    });

    $('#reserve').on('click', function(e) {
        e.preventDefault();
        checkAvailability();
        console.log($("#reserve").is(":disabled"));
        if ($("#reserve").is(":disabled") === false) {
            var reservation = {
                property_id: urlParams.id,
                startDate: checkin.val(),
                endDate: checkout.val(),
                firstName: firstName.val(),
                lastName: lastName.val(),
                email: email.val()
            };

            $.ajax({
                url: "http://localhost:8080/api/v1/reservation",
                type: "POST",
                data: JSON.stringify(reservation),
                contentType: "application/json",
                success: function(response) {
                    setSuccessReservation();
                },
                error: function(xhr) {
                    console.log(xhr);
                }
            });
        }
    })


    // set title, locaton, and host
    function setHeader(property) {
        var propertyTitleDiv = $("#property-header");
        var title = `<h2>${property.title}</h2>`;
        var host = `<h5>Hosted by Property-Express</h5>`;
        var location = `<h5> <span> <i class="fa-solid fa-map"></i></span> ${property.city}, ${property.country}</h5>`;

        propertyTitleDiv.append(title);
        propertyTitleDiv.append(host);
        propertyTitleDiv.append(location);
    }

    function setPrice(details) {
        var priceDiv = $("#property-price");
        var price = `<h5>${details.price} ${details.currency}/night </h5>`;
        priceDiv.append(price);
    }

    function setAvailability(isAvailable, numberOfNights, property) {
        var availableDiv = $("#property-available");
        availableDiv.empty();
        if (isAvailable) {
            var totalPrice = numberOfNights * parseInt(property.price);
            var msgAvailable = `<div class="alert alert-success" role="alert">This property is available for your dates!</div>`
            var msgTotalPrice = `<div class="alert alert-warning" role="alert">Total price for ${numberOfNights} nights is: ${totalPrice} ${property.currency}</h5>!</div>`
            availableDiv.append(msgAvailable);
            availableDiv.append(msgTotalPrice);
            $('#reserve').prop('disabled', false);
        } else {
            var msgNotAvailable = `<div class="alert alert-danger" role="alert">This property is not available for your dates! Please check for other dates.</div>`;
            availableDiv.append(msgNotAvailable);
            $('#reserve').prop('disabled', true);
        }
    }

    function setSuccessReservation() {
        var r = $('#property-available');
        r.empty();
        var success = `<div class="alert alert-success" role="alert">Reservation completed!</div>`
        r.append(success)

    }

    function setImages(details) {
        var galleryPreviewDiv = $("#gallery-preview");
        var carouselInnerDiv = $(".carousel-inner");
        var carouselIndicatorsDiv = $(".carousel-indicators");

        if (details.images.length > 2) {
            for (var i = 0; i < 3; i++) {
                var preview = `
                <div class="col-4 themed-grid-col height-300">
                    <img width="300" src="${details.images[i]}" class="img-fluid">
                </div>
                `;
                galleryPreviewDiv.append(preview);
            }
            details.images.forEach(function(image, i) {
                var button = `
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="active" aria-label="Slide 1"></button>
                `;
                carouselIndicatorsDiv.append(button);

                var image = `
                <div class="carousel-item active">
                    <img src="${image}" class="img-fluid">
                 </div>
                `;
                carouselInnerDiv.append(image)
            })
        }
    }

    function setPropertyDescription(details) {
        var propDescriptionDiv = $("#property-description");
        propDescriptionDiv.text(details.description)
    }


    function setPropertyUtilities(details) {
        var propertyUtilitiesDiv = $("#property-utilities");
        if (details.utilities) {
            details.utilities.forEach(function(utility) {
                var item = `<div> <span> <i class="fa-solid ${utilitiesIconMap[utility]} fa-2xl"></i></span></div>`;
                propertyUtilitiesDiv.append(item);
            });
        }
    }

    function checkAvailability() {
        var reservation = {
            property_id: urlParams.id,
            startDate: checkin.val(),
            endDate: checkout.val()
        };

        $.ajax({
            url: "http://localhost:8080/api/v1/reservation/check",
            type: "POST",
            data: JSON.stringify(reservation),
            contentType: "application/json",
            success: function(response) {
                setAvailability(response.available, 3, property);
            },
            error: function(xhr) {
                console.log(xhr);
            }
        });
    }
})