// Initialization
$("body").css("background", "#f8f9fa");

$(document).ready(function () {
    // Init select2
    $("#ifcSelection").select2({
        data: data,
        placeholder: "Select which IFC entities to include",
        theme: "bootstrap4",
        allowClear: true,
    });
    // Populate select2 with prevoius selection
    var ifcEntities = localStorage.getItem("ifcEntities");
    if (ifcEntities) {
        $("#ifcSelection").val(ifcEntities.split(",")).trigger("change");
    }
});
