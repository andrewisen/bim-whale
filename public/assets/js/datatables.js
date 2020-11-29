function buildTable(dataSet) {
    $("#ifcFileInput").hide();

    var ifcTable = $("#ifcTable").DataTable({
        data: dataSet,
        columns: [
            {
                className: "details-control",
                orderable: false,
                data: null,
                defaultContent: "",
            },
            {
                title: "ID",
                data: "instanceId",
            },
            {
                title: "GLOBAL ID",
                data: "attributes.parsed.0",
            },
            {
                title: "ENTITY",
                data: "entityName",
            },
            {
                title: "NAME",
                data: "attributes.parsed.2",
            },
        ],
        order: [[1, "asc"]],
    });

    $("#ifcTable tbody").on("click", "td.details-control", function () {
        console.log("child row");
        var tr = $(this).closest("tr");
        var row = ifcTable.row(tr);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass("shown");
        } else {
            row.child(generateChildData(row.data())).show();
            $("#" + row.data().instanceId).jsonViewer(row.data().properties, {
                collapsed: true,
                rootCollapsable: false,
                withLinks: false,
            });
            tr.addClass("shown");
        }
    });
}
