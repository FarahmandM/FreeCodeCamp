/*!
Author: Farahmand Moslemi
*/
var generateAlert = function(message, type = "info", closeBtn = true) { // success | info | warning | danger
  html = '<div class="alert alert-' + type + ' alert-dismissible fade in" role="alert">';
  if (closeBtn) {
    html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
  }
  html += message + '</div>';
  
  return html;
}

jQuery(document).ready(function($) {
  $('#txtSearch').focus();
  
  $('#result').on('click', '#btnClear', function() {
    $('#result').fadeOut(400, function(){
      $(this).html("").show();
      $('#txtSearch').val("").focus();
    })
    $("#messages").html("");
  });
  
  $('#frmSearch').submit(function(e) {
    e.preventDefault();
    return false;
  });
  $('#btnSearch').on('click', function() {
    $("#messages").html("");
    $('#result').html("");
    //$.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&namespaces=0&search=" + encodeURI($.trim($('#txtSearch').val())) + "&callback=?").done(function(data) {
    //$.getJSON("https://en.wikipedia.org/w/api.php?action=query&generator=search&format=json&prop=info&inprop=url&gsrsearch=" + encodeURI($.trim($('#txtSearch').val())) + "&callback=?").done(function(data) {
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&generator=search&format=json&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + encodeURI($.trim($('#txtSearch').val())) + "&callback=?").done(function(data) {
      if(data === undefined || data.error !== undefined) {
        $("#messages").append(generateAlert(data.error.info, "danger"));
      } else if(data.query === undefined || data.query.pages === undefined) {
        $("#messages").append(generateAlert("No result!", "danger"));
      } else {
        $('#result').append('<div class="sep"><button id="btnClear" class="btn btn-lg btn-danger" type="button">Clear All</button></sep>');
        //for (item in data.query.pages) { //alert(item.pageid);
        $.each(data.query.pages, function(k, v) {
          //alert (v.title);
          //$('#result').append('<a href="https://en.wikipedia.org/?curid=' + k + '" class="item" title="' + v.title + '" rel="nofollow" target="_blank"><div class="title"><strong>' + v.title + '</strong>: </div><div class="desc"><p>' + v.extract + '</p></div><a>');
          $('#result').append('<a href="https://en.wikipedia.org/?curid=' + k + '" class="item" title="' + v.title + '" data-toggle="tooltip" rel="nofollow" target="_blank"><h2 class="title">' + v.title + '</h2><div class="desc"><p>' + v.extract + '</p></div><a>');
        });
        
        $('[data-toggle="tooltip"]').tooltip();
        
        /*
        var i = 0;
        data[1].forEach(function(item) {
          $('#result').append('<div class="item" title="' + item + '"><div class="title"><strong>' + item + '</strong>: </div><div class="desc"><p>' + data[2][i] + '</p></div><div>');
          i++;
        });
        */
      }
      //$('#result').html(JSON.stringify(data));
    }).fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      $("#messages").append(generateAlert(err, "danger"));
    });
  });
});
