mockProperties = [{
        'id': '1',
        'name': 'Property 1',
        'description': 'Studio apartment in Tirana',
        'longDescription': 'Studio apartment in Tirana',
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
        'type': 'whole appartment',
    },
    {
        'id': '1',
        'name': 'Property 1',
        'description': 'Studio apartment in Tirana',
        'longDescription': 'Studio apartment in Tirana',
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
        'type': 'whole appartment',
    },
    {
        'id': '1',
        'name': 'Property 1',
        'description': 'Studio apartment in Tirana',
        'longDescription': 'Studio apartment in Tirana',
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
        'type': 'whole appartment',
    }
]

exampleImage = "https://thumbs.dreamstime.com/b/modern-apartment-interior-grey-sofa-footstool-armcha-armchair-wooden-floor-tv-colorful-graphic-photo-concept-122713421.jpg"

jQuery(() => {
    var topPropertiesDiv = $('#top-properties');
    var topProperties = [];

    var checkin = $('#checkin');
    var checkout = $('#checkout');
    var city = $('#location');

    function generateUrl(url, params) {
        var i = 0,
            key;
        for (key in params) {
            if (i === 0) {
                url += "?";
            } else {
                url += "&";
            }
            url += key;
            url += '=';
            url += params[key];
            i++;
        }
        return url;
    }

    function goToProperty(id, checkIn, checkOut) {
        const url = "http://localhost:8080/property.html"
        window.location = generateUrl(url, {
            id: id,
            checkInDate: checkIn,
            checkOut: checkOut
        });
    }

    function setProperties(properties) {
        topPropertiesDiv.empty();

        properties.forEach(function(property) {

            // get image source in right format
            if (property.mainPicture) {
                property.mainPicture = blob_image(property.mainPicture);
            } else {
                property.mainPicture = exampleImage;
            }

            var propEl = `
            <div class="col property-click" property-id="${property.property_id}" >
                <div class="card shadow-sm">
                <div class="bd-placeholder-img card-img-top" style="max-width: 100%; height: auto;">
                    <img class="img-thumbnail" src="${property.mainPicture}">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${property.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${property.city}, ${property.country}</h6>
                    <p class="card-text">${property.description}</p>

                    <div class="d-flex justify-content-between align-items-center">
                        <div style="inline-block">
                            <span>
                                <i class="fa-solid fa-bed"></i> ${property.no_beds}
                            </span>
                            <span>
                                <i class="fa-solid fa-toilet"></i> ${property.no_bathroom}
                            </span>
                        </div>
                        <small class="text-muted"><b>${property.price} ${property.currency}/night </b></small>
                    </div>
                </div>
                </div>
            </div>`;
            topPropertiesDiv.append(propEl);
        });

        $('.property-click').on('click', function(e) {
            var id = $(this).attr('property-id');
            goToProperty(id, checkin.val(), checkout.val());
        })
    }

    function getAllProperties() {
        $.ajax({
            url: "http://localhost:8080/api/v1/properties",
            type: "GET",
            contentType: "application/json",
            success: function(response) {
                topProperties = response
                console.log(response)

                if (response.length === 0) {
                    topProperties = mockProperties;
                }

                setProperties(topProperties)
            },
            error: function(xhr) {
                console.log(xhr);
            }
        });
    }

    getAllProperties();

    $("#home-search-btn").on('click', function(e) {
        $.ajax({
            url: "http://localhost:8080/api/v1/properties/city/" + city.val(),
            type: "GET",
            success: function(response) {
                if (response.length > 0) {
                    $('#no-properties').empty();
                    setProperties(response);
                } else {
                    var noPropertiesMsg = `<div class="alert alert-warning" role="alert">No properties available for your location. Check out similar ones.</div>`
                    $('#no-properties').append(noPropertiesMsg);
                    getAllProperties();
                }

            },
            error: function(xhr) {
                console.log(xhr);
            }
        });

    });

})