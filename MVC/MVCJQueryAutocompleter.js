var $j = jQuery.noConflict();

var personnelController = function (data) {
    this.data = data;
    this.setAutocomplete = function () {
        var ctrlID = "#" + this.data.inputCtrl;
        $j(ctrlID).autocomplete({
            appendTo: "#" + this.data.menuCtrl,
            autoFocus: true,
            delay: 500,
            minLength: 2,
            data: this.data,
            select: this.data.onSelect,
            source: function (request, response) {
                var ctrlID = "#" + this.options.data.inputCtrl;
                this.options.data.reqParams[this.options.data.inputCtrl] = $j(ctrlID).val(); //source is called on entry of i/p, so need to reevaluate it each time
                var modelData = this.options.data;
                var model = new personnelModel(modelData); //model is called in controller
                model.getData(request, response);
            }
        }).data("ui-autocomplete")._renderItem = function (ul, item) {
            return this.options.data.renderItems(ul, item);
        }; //end of autocomplete
    }
};

var personnelModel = function (data) {
    this.data = data;
    this.getData = function (request, response) {
        var ctrlID = "#" + this.data.inputCtrl;
        this.data.reqParams[this.data.inputCtrl] = $j(ctrlID).val(); //source is called on entry of i/p, so need to reevaluate it each time
        $j.ajax({
            url: "employeeList.aspx",
            data: this.data.reqParams,
            dataType: "json",
            type: 'POST',
            params: this.data,
            success: function (data) {
                response($j.map(data, function (item) {                        
                    return { label: item.Label, value: item.Value, FirstName: item.FirstName, LastName: item.LastName, employeeNumber: item.EmployeeNo, SSN: item.SSN }
                }));
            }
        });
    } //end of getData
};