// use API to git list of triggers such as temperature and time of year

const alertUrls = [];

    // Find alert files that contain the clicked element's id
    $.ajax({
      url: '/alerts/',
      async: false,
      success: function(data) {
        $(data).find('a[href$=".html"]').each(function(){
          const url = $(this).attr('href');
          $.ajax({
            url: url,
            async: false,
            success: function(data){
              if($(data).find(TRIGGER).length){
                alertUrls.push(url);
              }
            }
          });
        });
      }
    });

    // creates placeholders for alerts
    let alertsPlaceholder = "";
    for (let i = 0; i < alertUrls.length; i++) {
        alertsPlaceholder += `<a id="alert${i}" class="alert"></a>`;
    }
    document.getElementById("index_container").innerHTML = alertsPlaceholder;

    // subs in each alertx.html for the placeholder
    for (let i = 0; i < alertUrls.length; i++) {
        $.ajax({
        url: alertUrls[i],
        success: function(data) {
            $(`#alert${i}`).html(data);
        }
        });
    }

// load placeholders based on list of active triggers

function displayAlert() {

    //  loads the page with all alerts regardless of tags
    $(document).ready(function() {
        // get number of alert.html files to put on page
        var numberOfActiveAlerts = 0;
        $.ajax({
        url: '/alerts/',
        async: false,
        success: function(data) {
            numberOfActiveAlerts = $(data).find('a[href$=".html"]').length;
        }
        });
    
        // creates placeholders for alerts
        let alertsPlaceholder = "";
        for (let n = 1; n <= numberOfActiveAlerts; n++) {
        alertsPlaceholder += "<a id=\"alert" + n + "\" class=\"alert\"></a>"
        }
        document.getElementById("index_container").innerHTML = alertsPlaceholder;
    
        // subs in each alertx.html for the placeholder
        for (var i = 1; i <= numberOfActiveAlerts; i++) {
        $.ajax({
            url: '/alerts/alert' + i + '.html',
            success: function(data) {
            $('#alert' + this.index).html(data);
            },
            index: i
        });
        }
        console.log("alerts.js ran successfully.");
    });


    let alertsPlaceholder = "";
    for (let i = 0; i < alertUrls.length; i++) {
    alertsPlaceholder += `<a id="alert${i}" class="alert"></a>`;
    }
    document.getElementById("index_container").innerHTML = alertsPlaceholder;

    // subs in each alertx.html for the placeholder
    for (let i = 0; i < alertUrls.length; i++) {
    $.ajax({
        url: alertUrls[i],
        success: function(data) {
        $(`#alert${i}`).html(data);
        }
    });
    }
  
}

displayAlert();

