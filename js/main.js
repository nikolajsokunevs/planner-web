var selectedDay;
var selectedEventId;

$(function () {


  // page is now ready, initialize the calendar...
  $('#calendar').fullCalendar({
    dayClick: function (date, jsEvent, view) {
      $('#dialog').dialog('open')
      selectedDay=date._d;
    },
    theme: true,

    eventSources: [

    {
        url: 'http://localhost:8080/myapp/event/all',
        type: 'GET',
        error: function (result) {
          alert('there was an error while fetching events!');
        }
      }
    ],

    eventClick: function (calEvent, jsEvent, view) {
      $('#dialog').dialog('open')
      $('#event').val(calEvent.title)
      $('#name').val(calEvent.clientName)
      $('#phoneNumber').val(calEvent.cliectPhoneNumber)
      $('#delete').prop("disabled", false)
      $('#delete').removeClass("disabled")
      selectedEventId=calEvent.id
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

  $('#submit').click(function () {
    let jsonObjects = {
      title: $('#event').val(),
      clientName: $('#name').val(),
      cliectPhoneNumber: $('#phoneNumber').val(),
      start: selectedDay.getFullYear()+'-'+String(selectedDay.getMonth()+1).padStart(2, "0")+'-'+String(selectedDay.getDate()).padStart(2, "0")+'T'+$('#startTime option:selected').text(),
      end: selectedDay.getFullYear()+'-'+String(selectedDay.getMonth()+1).padStart(2, "0")+'-'+String(selectedDay.getDate()).padStart(2, "0")+'T'+$('#endTime option:selected').text(),
    };


    $.ajax({
      async: false,
      url: 'http://localhost:8080/myapp/event/add',
      method: 'POST',
      data: JSON.stringify(jsonObjects),
      crossDomain: true,
      contentType: 'application/json',
      success: function (result) {
        alert('success');
      },
      error: function (result) {
        alert(JSON.stringify(result));
      }
    });
  });

  $('#delete').click(function () {
    $.ajax({
      async: false,
      url: 'http://localhost:8080/myapp/event/delete/'+selectedEventId,
      method: 'DELETE',
      crossDomain: true,
      //contentType: 'application/json',
      success: function (result) {
        alert(JSON.stringify(result));
      },
      error: function (result) {
        alert(JSON.stringify(result));
      }
    });
  });
});


function generateOptions(select, from, till) {
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
