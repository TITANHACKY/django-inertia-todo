from ajax_datatable import AjaxDatatableView

class CustomDatatable(AjaxDatatableView):  # pragma: no cover
    """
    This class provides the feature of sending a list of dictionaries
    as input to the datatable
    """

    show_column_filters = False

    # It is used to ommit 'arguments-differ'.In this case, the
    # `get_table_row_id` method in the `CustomDatatable` class has a different
    # signature than the method it is overriding from the
    # pylint: disable=arguments-differ
    def get_table_row_id(self, request, obj, i):  # pylint: disable=unused-argument
        """
        Provides a specific ID for the table row; default: "row-ID"
        Override to customize as required.

        Do to a limitation of datatables.net, we can only supply to table rows
        a id="row-ID" attribute, and not a data-row-id="ID" attribute
        """
        result = ""
        if self.table_row_id_fieldname:
            if isinstance(obj, dict):
                try:
                    result = self.table_row_id_prefix + str(i + 1)
                except AttributeError:
                    result = ""
            else:
                try:
                    result = self.table_row_id_prefix + str(
                        getattr(obj, self.table_row_id_fieldname)
                    )
                except AttributeError:
                    result = ""
        return result

    def render_dict_column(self, row, column):
        """This function is responsible for assigning values to the respective
        columns in a row"""
        return row.get(column, None)

    def prepare_results(self, request, qs):
        """This function is responsible for preparing the json data which
        should be returned as response when the datatable is called
        """
        json_data = []
        columns = [c["name"] for c in self.column_specs]
        if len(qs) > 0 and isinstance(qs[0], dict):
            func = getattr(self, "render_dict_column")
        else:
            func = getattr(self, "render_column")
        for i, cur_object in enumerate(qs):
            retdict = {
                # fieldname: '<div class="field-%s">%s</div>'
                # % (fieldname, self.render_column(cur_object, fieldname))
                fieldname: func(cur_object, fieldname)
                for fieldname in columns
                if fieldname
            }

            self.customize_row(retdict, cur_object)
            self.clip_results(retdict)

            row_id = self.get_table_row_id(request, cur_object, i)

            if row_id:
                # "Automatic addition of row ID attributes"
                # https://datatables.net/examples/server_side/ids.html
                retdict["id"] = retdict.pop("pk", None)
                retdict["DT_RowId"] = row_id

            json_data.append(retdict)
        return json_data
