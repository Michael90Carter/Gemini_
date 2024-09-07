"use strict";
// Class definition


/*let CountriesDatatable = function () {

    $.fn.editableform.buttons =
        '<button type="submit" class="btn btn-outline-primary editable-submit btn-sm"><i class="mdi mdi-check"></i></button>' +
        '<button type="button" class="btn btn-outline-danger editable-cancel btn-sm"><i class="mdi mdi-close"></i></button>';
    $.fn.editable.defaults.mode = 'inline';
    $.fn.editable.defaults.ajaxOptions = { type: "PUT" };


    let countries = function () {
        let datatable = $('#countries-datatable').DataTable({

            responsive: true,
            lengthChange: false,
            processing: true,
            searching: false,
            language: {
                processing: '<div class="spinner-border text-dark" role="status"></div>',
                emptyTable: "No Countries available at the moment"
            },
            ajax: {
                url: 'https://localhost:44376/api/countries',
                method: 'GET',

                dataFilter: function (data) {
                    var json = jQuery.parseJSON(data);
                    json.recordsTotal = json.totalCount;
                    json.recordsFiltered = json.totalCount;
                    json.data = json.countries;

                    return JSON.stringify(json); // return JSON string
                }
            },
            order: [[0, 'asc']],
            columns: [
                { data: 'id' },
                { data: 'flag' },
                { data: 'countryCode' },
                { data: 'countryName' },
                { data: "status" },
                { data: 'Actions', responsivePriority: -1 }
            ],
            columnDefs: [
                {
                    targets: -1,
                    title: 'Action',
                    autoHide: false,
                    render: function (data, type, full, meta) {
                        return `<div class="dropdown d-inline-block">
									<a class="dropdown-toggle arrow-none" id="dLabel11" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" 
										aria-expanded="false">
									<i class="las la-ellipsis-v font-20 text-muted"></i>
										</a>
									<div class="dropdown-menu dropdown-menu-end" aria-labelledby="dLabel11">
										<a class="dropdown-item" href="#" data-view-record-id="${full.id}"><i class ="las la-eye text-secondary me-2"></i>View Details</a>
										<a class="dropdown-item" href="#" data-delete-record-id="${full.id}"><i class ="las la-trash-alt  text-secondary me-2"></i>Delete</a>
									</div>
								</div>`;
                    }
                },
                {
                    targets: -2,
                    render: function (data, type, full, meta) {
                        var status = {
                            'true': { 'title': 'Active', 'class': 'badge-soft-success' },
                            'false': { 'title': 'Inactive', 'class': ' badge-soft-danger' },
                        };
                        if (typeof status[data] === 'undefined') {
                            return data;
                        }
                        return `<span class="badge badge-boxed ${status[data].class}">${status[data].title}</span>`;
                    },
                }

            ]

        });

		datatable.on('click', '[data-view-record-id]', (e) => {
			e.preventDefault();
			//XenteApp.block($('#pricings-datatable'));
			let id = e.currentTarget.getAttribute('data-view-record-id');
			fetch(`https://localhost:44376/api/countries/${id}`).then((response) => response.text()).then((data) => {

				

				
			});
		});
    }

    return {
        init: () => {

            countries();
        }
    }

}();

*/



$(document).ready(function () {


    // show modal
    function showModal() {
        $('#exampleModal').modal('show');
    }

    //Hide modal

    function hideModal() {
        $('#exampleModal').modal('hide');
    }

    //Button When clicked event
    $('#showModalButton').click(function () {
        showModal();
    })


    $('#exampleModal').on('hidden.bs.modal', function () {
        console.log('Modal hidden')
    })


    $.ajax({
        url: 'https://localhost:44376/api/countries',
        method: 'Get',
        success: function (data) {
            $('#countriesTable').DataTable({
                data: data,
                order: [[0, 'asc']],
                columns: [
                    { data: 'id' },
                    { data: 'flag' },
                    { data: 'countryCode' },
                    { data: 'countryName' },
                    { data: "status" },
                    { data: 'Actions', responsivePriority: -1 }
                ],
                columnDefs: [
                    {
                        targets: -1,
                        title: 'Action',
                        autoHide: false,
                        render: function (data, type, full, meta) {
                            return `<div class="dropdown d-inline-block">
                                    <a class="dropdown-toggle arrow-none" id="dLabel11" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" 
                                        aria-expanded="false">
                                    <i class="las la-ellipsis-v font-20 text-muted"></i>
                                        </a>
                                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dLabel11">
                                        <a class="dropdown-item" href="#" data-view-record-id="${full.id}"><i class ="las la-eye text-secondary me-2"></i>View Details</a>
                                        <a class="dropdown-item" href="#" data-delete-record-id="${full.id}"><i class ="las la-trash-alt  text-secondary me-2"></i>Delete</a>
                                    </div>
                                </div>`;
                        }
                    },
                    {
                        targets: -2,
                        title: 'status',
                        render: function (data, type, full, meta) {
                            var status = {
                                'true': { 'title': 'Active', 'class': 'badge-soft-success' },
                                'false': { 'title': 'Inactive', 'class': ' badge-soft-danger' },
                            };
                            if (typeof status[data] === 'undefined') {
                                return data;
                            }
                            return `<span class="badge badge-boxed ${status[data].class}">${status[data].title}</span>`;
                        },
                    }
                ]
            });
        },
        error: function (xhr, status, error) {
            console.error('Error fetching data', error);
        }
    });
    

});