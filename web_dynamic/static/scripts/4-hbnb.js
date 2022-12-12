$(document).ready(function () {
  // This is the stuff for task 2
  const checkedAmenities = {};
  const amenitiesName = [];
  $('li :checkbox').change(function () {
    if (this.checked) {
      checkedAmenities[$(this).data('id')] = $(this).data('name');
      amenitiesName.push($(this).attr('data-name'));
    } else {
      delete checkedAmenities[$(this).data('id')];
      amenitiesName.splice($.inArray($(this).attr('data-name'), amenitiesName), 1);
    }
    $('.amenities h4').html(amenitiesName.join(', '));
  });
  // This is the stuff for task 3
  const url = 'http://35f944014d11.7399d2e2.hbtn-cod.io:5001/api/v1/status/';
  $.get(url, function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  // Stuff for task 4 goes here
  $.ajax({
    url: 'http://35f944014d11.7399d2e2.hbtn-cod.io:5001/api/v1/places_search/',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
      for (const place of data) {
        $.get('http://35f944014d11.7399d2e2.hbtn-cod.io:5001/api/v1/users/' + place.user_id, function (usrData) {
          const html = `<article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guests</div>
                <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
              </div>
              <div class="user">
              <b>Owner:</b> ${usrData.first_name} ${usrData.last_name}
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>`;
          $('.places').append(html);
        });
      }
    }
  });
  // Stuff for task 5
  $('button').on('click', function () {
    $('.places > article').remove();
    $.ajax({
      url: 'http://35f944014d11.7399d2e2.hbtn-cod.io:5001/api/v1/places_search/',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(checkedAmenities) }),
      success: function (data) {
        for (const place of data) {
          $.get('http://35f944014d11.7399d2e2.hbtn-cod.io:5001/api/v1/users/' + place.user_id, function (usrData) {
            const html = `<article>
                <div class="title_box">
                  <h2>${place.name}</h2>
                  <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                  <div class="max_guest">${place.max_guest} Guests</div>
                  <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                  <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                </div>
                <div class="user">
                <b>Owner:</b> ${usrData.first_name} ${usrData.last_name}
                </div>
                <div class="description">
                  ${place.description}
                </div>
              </article>`;
            $('.places').append(html);
          });
        }
      }
    });
  })
});
