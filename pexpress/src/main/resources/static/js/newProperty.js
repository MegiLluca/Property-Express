$(document).ready(function() {

    var propertyError = $("#property-error");

    var errorMsg = `
    <div class="alert alert-danger" role="alert">
        Something went wrong with your registration
    </div>`;

    $("#property-register-btn").on('click', function(e) {
        e.preventDefault();

        var title = $("#prop-title").val();
        var description = $("#description").val();
        var country = $("#country").val();
        var city = $("#city").val();
        var street = $("#street").val();
        var building = $("#building-number").val();
        var apt = $("#apt-number").val();

        var beds = $("#beds").val();
        var bathrooms = $("#bathrooms").val();
        var balcony = $("#balcony").val();

        var price = $("#price").val();
        var currency = $("#currency").val();

        var property = {
            title: title,
            description: description,
            country: country,
            city: city,
            street: street,
            buildingNumber: building,
            aptNumber: apt,
            no_beds: beds,
            no_bathroom: bathrooms,
            no_balcony: balcony,
            price: price,
            currency: currency
        };





        $.ajax({
            url: "http://localhost:8080/api/v1/property",
            type: "POST",
            data: JSON.stringify(property),
            contentType: "application/json",
            success: function(response) {
                if (response.property_id) {
                    uploadMainPicture(response.property_id);
                }

            },
            error: function(xhr) {
                console.log("errorr");
                propertyError.append(errorMsg);
            }
        });


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
                        console.log(response)

                    },
                    error: function(xhr) {
                        console.log("errorr");
                        propertyError.append(errorMsg);
                    }
                });
            }
        }

    });
});