function generateChildData(json_object) {
    var table = "";
    table += '<pre id="' + json_object.instanceId + '"></pre>';
    return table;
}

function getRowId(json_object) {
    return json_object.instanceId;
}
function convert_camel_case(input_string) {
    var output_string = "";
    if (input_string[0] === "_") {
        input_string = input_string.substring(1);
    }
    output_string = input_string
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, function (str) {
            return str.toUpperCase();
        });
    return output_string;
}
