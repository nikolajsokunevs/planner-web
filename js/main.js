$(function () {
  // page is now ready, initialize the calendar...
  $('#calendar').fullCalendar({
    dayClick: function () {
      $('#dialog').dialog('open')
    },
    theme: true,

    eventSources: [

      {
        events: [
          {
            title: 'event1',
            start: '2018-08-01'
          },
          {
            title: 'event2',
            start: '2018-08-05',
            end: '2018-08-07'
          },
          {
            title: 'event7',
            start: '2018-08-09T12:45:00',
            end: '2018-08-09T12:50:00',
            allDay: false, // will make the time show
          }
        ],
        collor: 'yellow'
      }]
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
