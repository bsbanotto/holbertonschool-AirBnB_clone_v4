$(document).ready(function () {
    //This is the stuff for task 2
    const amenities = [];
    const amenitiesName = [];
    $('li :checkbox').change(function() {
    if (this.checked) {
      amenities.push($(this).attr('data-id'));
      amenitiesName.push($(this).attr('data-name'));
    } else {
      amenities.splice($.inArray($(this).attr('data-id'), amenities), 1);
      amenitiesName.splice($.inArray($(this).attr('data-name'), amenitiesName), 1);
    }
    $('.amenities h4').html(amenitiesName.join(', '));
    });
    //This is the stuff for task 3
    const url = 'http://0.0.0.0:5001/api/v1/status/';
    $.get(url, function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').toggleClass('available');
      }
    });
    //Stuff for task 4 goes here
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function(data) {
          $.each(data, function (key, value) {
            $(`<article>
                <div class="title_box">
                  <h2>${ value.name }</h2>
                  <div class="price_by_night">$${ value.price_by_night }</div>
                </div>
                <div class="information">
                  <div class="max_guest">${ value.max_guest } Guest{% if place.max_guest != 1 %}s{% endif %}</div>
                  <div class="number_rooms">${ value.number_rooms } Bedroom{% if place.number_rooms != 1 %}s{% endif %}</div>
                  <div class="number_bathrooms">${ value.number_bathrooms } Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}</div>
                </div>
                <div class="user">
                </div>
                <div class="description">
                  ${ place.description | safe }
                </div>
              </article>`).appendTo('.places');
          });
          }
        });
      });
  