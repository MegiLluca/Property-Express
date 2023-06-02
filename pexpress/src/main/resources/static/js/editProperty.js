jQuery(() => {
    var property;
    var urlParams = parse_query_string(window.location.search.substring(1));

    var title = $("#prop-title")
    var description = $("#description")
    var country = $("#country")
    var city = $("#city")
    var street = $("#street")
    var building = $("#building-number")
    var apt = $("#apt-number")
    var beds = $("#beds")
    var bathrooms = $("#bathrooms")
    var balcony = $("#balcony")
    var price = $("#price")
    var currency = $("#currency")

    var img = document.querySelector("#imagePreview");

    function setPropertyDetails(property) {
        title.val(property.title);
        description.val(property.description);
        country.val(property.country);
        city.val(property.city);
        street.val(property.street);
        building.val(property.buildingNumber);
        apt.val(property.aptNumber);
        beds.val(property.no_beds);
        bathrooms.val(property.no_bathroom);
        balcony.val(property.no_balcony);
        price.val(property.price);
        currency.val(property.currency);
        img.src = blob_image(property.mainPicture);
    }

    if (urlParams.id) {
        // get property details
        $.ajax({
            url: "http://localhost:8080/api/v1/property/" + urlParams.id,
            type: "GET",
            success: function(response) {
                property = response
                setPropertyDetails(property)
            },
            error: function(xhr) {
                if (xhr.status === 404) {
                    var errorMag = `<div class="alert alert-danger" role="alert">An error occurred. Please try refreshing.</div>`
                    $('#property-error').empty();
                    $('#property-error').append(errorMag);
                }
            }
        });

    }

    $('#property-edit-btn').on('click', function(e) {
        e.preventDefault();
        var property = {
            title: title.val(),
            description: description.val(),
            country: country.val(),
            city: city.val(),
            street: street.val(),
            buildingNumber: building.val(),
            aptNumber: apt.val(),
            no_beds: beds.val(),
            no_bathroom: bathrooms.val(),
            no_balcony: balcony.val(),
            price: price.val(),
            currency: currency.val()
        };



        $.ajax({
            url: "http://localhost:8080/api/v1/property/" + urlParams.id,
            type: "PUT",
            data: JSON.stringify(property),
            contentType: "application/json",
            success: function(response) {
                console.log(response)
            },
            error: function(xhr) {
                console.log("errorr");

            }
        });
    })

    $('#upload-button').on('click', function() {
        uploadMainPicture(property.property_id);
    })

    function uploadMainPicture(propertyId) {
        var fileInput = document.getElementById('main-picture');
        var file = fileInput.files[0];
        if (file) {
            var formData = new FormData();
            formData.append('file', file);
            $.ajax({
                url: "http://localhost:8080/api/v1/property/picture/" + propertyId,
                type: "PUT",
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                    if (response.mainPicture) {
                        img.src = blob_image(property.mainPicture);
                    }
                },
                error: function(xhr) {
                    console.log("errorr");
                    propertyError.append(errorMsg);
                }
            });
        }
    }
})