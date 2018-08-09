$(function() {
  // page is now ready, initialize the calendar...
  $('#calendar').fullCalendar({
    dayClick:function (){
      $('#dialog').dialog('open')
    },
    theme: true
  })

  $('#dialog').dialog({
    autoOpen: false,
    show:{
      effect:'drop',
      duration:500
    },
    hide:{
      effect:'clip',
      duration:300
    }
  });

  $('.datepicker').datepicker();

  $('#startTime').click(function(){

  }


  });
});

$(function() {
  let $select = jQuery("#startTime");
  for (let hr = 9; hr < 21; hr++) {
  let hrStr = hr.toString().padStart(2, "0") + ":";
  let val = hrStr + "00";
  $select.append('<option val="' + val + '">' + val + '</option>');
  val = hrStr + "30";
  $select.append('<option val="' + val + '">' + val + '</option>')

  });
