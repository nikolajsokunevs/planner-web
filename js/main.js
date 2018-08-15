$(function () {
  // page is now ready, initialize the calendar...
  $('#calendar').fullCalendar({
    dayClick: function () {
      $('#dialog').dialog('open')
    },
    theme: true,

    eventSources: [

      {
        url: 'http://localhost:8080/myapp/event/all',
        type: 'GET',
        error: function() {
          alert('there was an error while fetching events!');
        }
      }
  
      // any other sources...
  
    ],

      eventClick: function(calEvent, jsEvent, view) {

        alert('Event: ' + calEvent.title);
        alert('Event: ' + calEvent.start);
        alert('Event: ' + calEvent.id);
        alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        alert('View: ' + view.name);
    
        // change the border color just for fun
        $(this).css('border-color', 'red');
    
      }
  })

  $.ajax({
    url:'http://localhost:8080/myapp/event/all',
    type:"GET",
    success: function(result){
      alert(result)
    },
    error: function(result){
      alert(result)
    }
  })


  $('#dialog').dialog({
    autoOpen: false,
    maxHeight: 800,
    show: {
      effect: 'drop',
      duration: 500
    },
    hide: {
      effect: 'clip',
      duration: 300
    }
  });

  $('.datepicker').datepicker();

  generateOptions(jQuery("#startTime"), 9.0, 15);


  $('#endTime').click(function () {
    var startTime = parseFloat($('#startTime option:selected').val());
    generateOptions(jQuery("#endTime"), startTime + 0.5, 15);
  });

});

function generateOptions(select, from, till) {
  //let $select = jQuery("#startTime");
  //for (let hr = from; hr <= till;) {
  select.find('option').remove();
  while (from <= till) {
    let hr = from
    let fullHours = hr.toString().split('.')[0];
    let minutes = hr.toString().split('.')[1];
    var hrStr = fullHours.padStart(2, "0") + ":";
    var hrStr = "";
    if (parseInt(minutes) == 5) {
      hrStr = fullHours + ":30";
    } else {
      hrStr = fullHours + ":00";
    }
    select.append('<option value="' + hr + '">' + hrStr + '</option>');
    from = hr + 0.5;
  }
}
