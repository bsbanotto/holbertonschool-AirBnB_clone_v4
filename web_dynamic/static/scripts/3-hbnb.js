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
      $('#api_status').removeClass('available');
    }
  });
  //Stuff for task 4 goes here
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    contentType: 'application/json; charset=UTF-8',
    dataType: 'json',
    data: '{}',
    success: function(data) {
        for (const place of data) {
            let html = '';
            html += '    <article>';
            html += '      <div class="title_box">';
            html += '        <h2>{{ place.name }}</h2>';
            html += '        <div class="price_by_night">${{ place.price_by_night }}</div>';
            html += '      </div>';
            html += '      <div class="information">';
            html += '        <div class="max_guest">{{ place.max_guest }} Guest{% if place.max_guest != 1 %}s{% endif %}</div>';
            html += '        <div class="number_rooms">{{ place.number_rooms }} Bedroom{% if place.number_rooms != 1 %}s{% endif %}</div>';
            html += '        <div class="number_bathrooms">{{ place.number_bathrooms }} Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}</div>';
            html += '      </div>';
            html += '      <div class="user">';
            html += '        <b>Owner:</b> {{ place.user.first_name }} {{ place.user.last_name }}';
            html += '      </div>';
            html += '      <div class="description">';
            html += '        {{ place.description | safe }}';
            html += '      </div>';
            html += '    </article>';
        }
    }
  });
});
