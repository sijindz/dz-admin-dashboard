configureJsGrid();

function configureJsGrid() {
    jsGrid.setDefaults({
        tableClass: "jsgrid-table table table-hover"
    }), jsGrid.setDefaults("text", {
        _createTextBox: function () {
            return $("<input>").attr("type", "text").attr("class", "form-control input-sm")
        }
    }), jsGrid.setDefaults("number", {
        _createTextBox: function () {
            return $("<input>").attr("type", "number").attr("class", "form-control input-sm")
        }
    }), jsGrid.setDefaults("textarea", {
        _createTextBox: function () {
            return $("<input>").attr("type", "textarea").attr("class", "form-control")
        }
    }), jsGrid.setDefaults("control", {
        _createGridButton: function (cls, tooltip, clickHandler) {
            var grid = this._grid;
            return $("<button>").addClass(this.buttonClass).addClass(cls).attr({
                type: "button",
                title: tooltip
            }).on("click", function (e) {
                clickHandler(grid, e)
            })
        }
    }),

        jsGrid.setDefaults("select", {
            _createSelect: function () {
                var $result = $("<select>").attr("class", "form-control input-sm"),
                    valueField = this.valueField,
                    textField = this.textField,
                    selectedIndex = this.selectedIndex;
                return $.each(this.items, function (index, item) {
                    var value = valueField ? item[valueField] : index,
                        text = textField ? item[textField] : item,
                        $option = $("<option>").attr("value", value).text(text).appendTo($result);
                    $option.prop("selected", selectedIndex === index)
                }), $result
            }
        });

    (function (jsGrid, $) {
        var NumberField = jsGrid.NumberField;

        function DecimalField(config) {
            NumberField.call(this, config);
        }

        DecimalField.prototype = new NumberField({

            step: 0.01,

            filterValue: function () {
                return this.filterControl.val() ? parseFloat(this.filterControl.val()) : undefined;
            },

            insertValue: function () {
                return this.insertControl.val() ? parseFloat(this.insertControl.val()) : undefined;
            },

            editValue: function () {
                return this.editControl.val() ? parseFloat(this.editControl.val()) : undefined;
            },

            _createTextBox: function () {
                return NumberField.prototype._createTextBox.call(this)
                    .attr("step", this.step);
            }
        });

        jsGrid.fields.decimal = jsGrid.DecimalField = DecimalField;

        var MyDateField = function (config) {
            jsGrid.Field.call(this, config);
        };

        MyDateField.prototype = new jsGrid.Field({

            css: "",            // redefine general property 'css'
            align: "",              // redefine general property 'align'

            myCustomProperty: "foo",      // custom property

            sorter: function (date1, date2) {
                return new Date(date1) - new Date(date2);
            },

            itemTemplate: function (value) {
                return value;
            },
            filterTemplate: function () {
                if (!this.filtering)
                    return "";
                var grid = this._grid,
                    $result = this._filterControl = $("<input>").attr({ type: "date", "class": "form-control" });
                $result.on("change", function (e) {
                    grid.search();
                });
                return $result;
            },
            insertTemplate: function (value) {
                return this._insertControl = $("<input>").attr({ type: "date", "class": "form-control" }).val(value);
            },

            editTemplate: function (value) {
                return this._editControl = $("<input>").attr({ type: "date", "class": "form-control" }).val(value);
            },
            filterValue: function () {
                return this._filterControl.val();
            },
            insertValue: function () {
                return this._insertControl.val();
            },

            editValue: function () {
                return this._editControl.val();
            }
        });

        jsGrid.fields.date = MyDateField;

    }(jsGrid, jQuery));

}

var clients = [
    { "Name": "Otto Clay", "Age": 25, "Country": 1, "Address": "Ap #897-1459 Quam Avenue", "Married": false },
    { "Name": "Connor Johnston", "Age": 45, "Country": 2, "Address": "Ap #370-4647 Dis Av.", "Married": true },
    { "Name": "Lacey Hess", "Age": 29, "Country": 3, "Address": "Ap #365-8835 Integer St.", "Married": false },
    { "Name": "Timothy Henson", "Age": 56, "Country": 1, "Address": "911-5143 Luctus Ave", "Married": true },
    { "Name": "Ramona Benton", "Age": 32, "Country": 3, "Address": "Ap #614-689 Vehicula Street", "Married": false },
    { "Name": "Ramona Benton", "Age": 32, "Country": 3, "Address": "Ap #614-689 Vehicula Street", "Married": false },
    { "Name": "Ramona Benton", "Age": 32, "Country": 3, "Address": "Ap #614-689 Vehicula Street", "Married": false },
    { "Name": "Ramona Benton", "Age": 32, "Country": 3, "Address": "Ap #614-689 Vehicula Street", "Married": false },
    { "Name": "Ramona Benton", "Age": 32, "Country": 3, "Address": "Ap #614-689 Vehicula Street", "Married": false },
    { "Name": "Ramona Benton", "Age": 32, "Country": 3, "Address": "Ap #614-689 Vehicula Street", "Married": false },
    { "Name": "Ramona Benton", "Age": 32, "Country": 3, "Address": "Ap #614-689 Vehicula Street", "Married": false },
    
];

var clients = [
    { "title": "Alice in Wonderland", "bookNumber": 1001, "author": "Lewis Carrol", "language": 1, "publishYear": "1865","status":true },
    { "title": "Geetanjali", "bookNumber": 1002, "author": "Rabindra Nath Tagore", "language": 4, "publishYear": "1910","status":true },
    { "title": "Anna Karenina", "bookNumber": 1003, "author": "Leo Tolstoy", "language": 1, "publishYear": "1878","status":false },
    { "title": "War and Peace", "bookNumber": 1004, "author": "Leo Tolstoy", "language": 1, "publishYear": "1863","status":false },
    { "title": "Origin of Species", "bookNumber": 1005, "author": "Charles Darwin", "language": 1, "publishYear": "1859","status":true },
    { "title": "The Tempest", "bookNumber": 1006, "author": "William Shakespeare", "language": 1, "publishYear": "1610","status":true },
    { "title": "Illiad", "bookNumber": 1007, "author": "Homer", "language": 1, "publishYear": "1598","status":true },
    { "title": "The god of small things", "bookNumber": 1008, "author": "Arundhati Roy", "language": 1, "publishYear": "1997","status":true },
    { "title": "Romeo and Juliet", "bookNumber": 1009, "author": "William Shakespeare", "language": 1, "publishYear": "1597","status":true },
    { "title": "Mein Kamph", "bookNumber": 1010, "author": "Adolf Hitler", "language": 1, "publishYear": "1925","status":true },
    
];

var countries = [
    { Name: "", Id: 0 },
    { Name: "United States", Id: 1 },
    { Name: "Canada", Id: 2 },
    { Name: "United Kingdom", Id: 3 }
];

var languages = [
    { Name: "", Id: 0 },
    { Name: "English", Id: 1 },
    { Name: "Malayalam", Id: 2 },
    { Name: "Hindi", Id: 3 },
    { Name: "Bengali", Id: 4 }
];

$("#jsGrid").jsGrid({
    width: "100%",
    height: "auto",
    filtering: true,
    inserting: true,
    editing: true,
    sorting: true,
    paging: true,
    autoload: true,
    pageSize: 5,
    pageButtonCount: 5,

    data: clients,

    fields: [
        { name: "title",title:"Book Title", type: "text", width: 150, validate: "required" },
        { name: "bookNumber",title:"Book No", type: "number", width: 50 },
        { name: "author",title:"Author", type: "text", width: 100 },
        { name: "language",title:"Language", type: "select", items: languages, valueField: "Id", textField: "Name" },
        { name: "publishYear",title:"Publish Year", type: "text", sorting: false },
        { name: "status",title:"Status", type: "checkbox", sorting: false },
        { type: "control" }
    ]
});