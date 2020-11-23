
$(document).ready(function () {
    $(".filter-button").on("click", function () {
      let catProject = $(this).attr("category");

      $(this).parent().find(".active").removeClass("active");
      $(this).addClass("active");
  
      //$(".caty").css("transform", "scale(0)");
      function hideProject() {
        $(".caty").hide();
      }
      setTimeout(hideProject, 300);
  
      function showProject() {
        $('.caty[category="' + catProject + '"]').show();
       // $('.caty[category="' + catProject + '"]').css("transform", "scale(1)");
      }
      setTimeout(showProject, 300);


    });
  
    $('.filter-button[category="All"]').click(function () {
      function showAll() {
        $(".caty").show();
      //  $(".caty").css("transform", "scale(1)");
      }
      setTimeout(showAll, 300);
    });

  });
  