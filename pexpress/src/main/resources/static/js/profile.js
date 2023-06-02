propertiesExampleData = [{
        'id': '1',
        'name': 'Property 1',
        'location': 'Tirana, Albania',
        'img': '',
        'details': {
            'description': 'Studio apartment in Tirana',
            'type': 'whole appartment',
            'beds': '2',
            'bathroom': '1',
            'pricePerNight': '30',
            'currency': 'eur',
            'rating': '4'
        }
    },
    {
        'id': '2',
        'name': 'Property 2',
        'location': 'Tirana, Albania',
        'img': '',
        'details': {
            'description': 'Room in Tirana',
            'type': 'private room',
            'beds': '1',
            'bathroom': '1',
            'pricePerNight': '20',
            'currency': 'eur',
            'rating': '3.9'
        }
    },
    {
        'id': '3',
        'name': 'Property 3',
        'location': 'Vlore, Albania',
        'img': '',
        'details': {
            'description': 'Spacious beach villa in Vlore',
            'type': 'whole appartment',
            'beds': '6',
            'bathroom': '2',
            'pricePerNight': '90',
            'currency': 'eur',
            'rating': '4.1'
        }
    }
]


function populatePropertyList(properties, propertyDiv) {
    properties.forEach(function(property) {

        var el = `<a href="#" class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
            <h3 class="mb-1">${property.title}</h3>
            <p>
                <small class="text-muted" style="display: block"><b>${property.price} ${property.currency}/night </b></small>
                <button class="btn btn-secondary view-property" property-id="${property.property_id}"> View </button>
                <button class="btn btn-secondary edit-property" property-id="${property.property_id}"> Edit </button>
            </p>

        </div>
        <p class="mb-1">${property.description}</p>
        <small> ${property.city}, ${property.country}</small>
        <small><span>
            <i class="fa-solid fa-bed"></i> ${property.no_beds}
        </span>
        <span>
            <i class="fa-solid fa-toilet"></i> ${property.no_bathroom}
        </span></small>
    </a>`;

        propertyDiv.append(el);
    })
}

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

function editProperty(id) {
    const url = "http://localhost:8080/editProperty.html"
    window.location = generateUrl(url, {
        id: id
    });
}

function viewProperty(id) {
    const url = "http://localhost:8080/property.html"
    window.location = generateUrl(url, {
        id: id
    });
}


function populateReservationList(reservations, propertiesDiv) {
    reservations.forEach(function(reservation) {

        var e =
            `<a href="#" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${reservation.property.title}</h5>
                <small>${reservation.startDate} - ${reservation.endDate}</small>
            </div>
            <p class="mb-1">Reserved by: ${reservation.firstName} ${reservation.lastName} (${reservation.email})</p>
            <small> ${reservation.property.city}, ${reservation.property.country}.</small>
        </a>`;
        propertiesDiv.append(e);
    })

}

jQuery(() => {
    var profile

    var firstName = $("#edit-firstName");
    var lastName = $("#edit-lastName");
    var birthday = $("#edit-birthday");
    var email = $("#edit-email");
    var country = $("#edit-country");
    var city = $("#edit-city");
    var description = $("#edit-description");
    var mainPicture = $("#edit-mainPicture");

    var propertiesDiv = $('#user-properties');
    var reservationsDiv = $('#user-reservations');

    $("#profile-toggle-btn").on("click", function() {
        $("#profile-container").toggle();
        $("#property-container").hide();
        $("#reservation-container").hide();
    });

    $("#property-toggle-btn").on("click", function() {
        $("#property-container").toggle();
        $("#profile-container").hide();
        $("#reservation-container").hide();
    });

    $("#reservation-toggle-btn").on("click", function() {
        $("#reservation-container").toggle();
        $("#profile-container").hide();
        $("#property-container").hide();
    });

    $.ajax({
        url: "http://localhost:8080/api/v1/profile",
        type: "GET",
        success: function(response) {
            profile = response
            firstName.val(profile.firstName);
            lastName.val(profile.lastName);
            email.val(profile.email);
            birthday.val(profile.birthday);
            country.val(profile.country);
            city.val(profile.city);
            description.val(profile.description);
        },
        error: function(xhr) {
            console.log(xhr);
        }
    });

    $.ajax({
        url: "http://localhost:8080/api/v1/properties",
        type: "GET",
        success: function(response) {
            var properties = response;

            if (response.length === 0) {
                var noPropertiesMsg = `<div class="alert alert-secondary" role="alert">No properties here yet! Register a new Property</div>`
                propertiesDiv.empty();
                propertiesDiv.append(noPropertiesMsg);
            }

            populatePropertyList(properties, propertiesDiv);

            $('.edit-property').on('click', function(e) {
                var id = $(this).attr('property-id')
                editProperty(id);
            })

            $('.view-property').on('click', function(e) {
                var id = $(this).attr('property-id')
                viewProperty(id);
            })
        },
        error: function(xhr) {
            console.log(xhr);
            populatePropertyList(propertiesExampleData, propertiesDiv);
        }
    });

    $.ajax({
        url: "http://localhost:8080/api/v1/reservations",
        type: "GET",
        success: function(response) {
            var reservations = response;
            populateReservationList(reservations, reservationsDiv);
        },
        error: function(xhr) {
            console.log(xhr);
        }
    });


    $("#logout-btn").on('click', function(e) {
        e.preventDefault();

        $.ajax({
            url: "http://localhost:8080/api/v1/logout",
            type: "DELETE",
            success: function(response) {
                console.log(response)
            },
            error: function(xhr) {
                console.log(xhr);
            }
        });
    });


    $("#profile-edit-btn").on('click', function(e) {
        e.preventDefault();
        var user = {
            firstName: firstName.val(),
            lastName: lastName.val(),
            email: email.val(),
            birthday: birthday.val(),
            country: country.val(),
            city: city.val(),
            description: description.val()
        };

        $.ajax({
            url: "http://localhost:8080/api/v1/user/" + profile.user_id,
            type: "PUT",
            data: JSON.stringify(user),
            contentType: "application/json",
            success: function(response) {
                console.log(response)
            },
            error: function(xhr) {
                console.log("errorr");

            }
        });
    });

    $('#upload-button').on('click', function() {
        var fileInput = document.getElementById('main-picture');
        var file = fileInput.files[0];
        if (file) {
            var formData = new FormData();
            formData.append('file', file);
            $.ajax({
                url: '/api/v1/user/picture' + profile.user_id,
                type: 'PUT',
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                    console.log('File uploaded successfully');
                    // Handle success response
                },
                error: function(xhr, status, error) {
                    console.error('File upload failed');
                    // Handle error response
                }
            });
        } else {
            console.error('No file selected');
        }

    })
})