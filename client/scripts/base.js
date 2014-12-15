/**
 * Created by WillieTran on 11/16/14.
 */

$(document).ready(function() {

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  var csrftoken = getCookie('csrftoken');

  function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
  }

  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      }
    }
  });

  console.log("ready");
  $('.post-submit').click(function(){
    e.preventDefault();
    var url = '/post_submit/';
    // Create a key value pairs to push into the model
    var data = {
      'title':$('#id_title')[0].value,
      'place':$('#id_place')[0].value,
      'idea':$('#id_idea')[0].value,
      'link':$('#id_link')[0].value,
      'labor':$('#id_labor')[0].value,
      'audience':$('#id_audience')[0].value,
      'result':$('#id_result')[0].value,
      'spend':$('#id_spend')[0].value,
      'story':$('#id_story')[0].value
    };
    $.ajax({
      url: url,
      type: "POST",
      data: data,
      success: function(response) {
        console.log(response);
      },
      error: function(response) {
        console.log("No good!");
        console.log(response);
      }
    });
  });
});
