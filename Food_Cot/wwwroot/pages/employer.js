
     
"use strict";
// Class definition

$(document).ready(function () {
    var datatable = $('#employerTable').DataTable({
        "ajax": {
            "url": "https://localhost:44376/api/Employer",
            "method": "GET",
            "dataSrc": ""
        },
        "columns": [
            { "data": 'id' },
            { "data": 'companyName' },
            { "data": 'Status' },
            { "data": 'Actions' }
        ],
        "columnDefs": [
            {
                targets: 1,
               

            },
            {
                targets: 2,
                width: "30%"

            },
            {
                targets: -1,
                title: 'Action',
                width: '30%',

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
            }, {
                targets: -2,
                title: 'Status',
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

    // Handle form submission for creating new record
    $('#add-employer').submit(function (e) {
        e.preventDefault();

        // Create an empty object to hold form data
        var formData = {};

        // Iterate over each form field and add it to the formData object
        $(this).find('input, select').each(function () {
            // Exclude the id field from being included in the formData object
            
        });

        // Send the formData object as JSON in the AJAX request
        $.ajax({
            url: "https://localhost:44376/api/Employer",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                datatable.ajax.reload();
                $('#exampleModal').modal('hide');
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    });



    // Handle edit button click
    $('#employerTable').on('click', '.edit-btn', function () {
        var recordId = $(this).data('id');
        // Fetch record details from API and populate edit form
        $.get("https://localhost:44376/api/Employer/" + recordId, function (record) {
            $('#editForm input[name="id"]').val(record.id);
            $('#editForm input[name="companyName"]').val(record.companyName);
            $('#editModal').modal('show');
        });
    });

    // Handle edit form submission
    $('#editForm').submit(function (e) {
        e.preventDefault();
        var formData = $(this).serialize();
        var recordId = $(this).find('input[name="id"]').val();
        $.ajax({
            url: "https://localhost:44376/api/Employer/" + recordId,
            type: "PUT",
            data: formData,
            success: function (response) {
                datatable.ajax.reload();
                $('#editModal').modal('hide');
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    });

    // Handle delete button click
    $('#employerTable').on('click', '.delete-btn', function () {
        var recordId = $(this).data('id');
        if (confirm("Are you sure you want to delete this record?")) {
            $.ajax({
                url: "https://localhost:44376/api/Employer/" + recordId,
                type: "DELETE",
                success: function (response) {
                    datatable.ajax.reload();
                },
                error: function (xhr, status, error) {
                    console.error(error);
                }
            });
        }
    });

	datatable.on('click', '[data-view-record-id]', (e) => {
		e.preventDefault();
		//XenteApp.block($('#pricings-datatable'));
		let employerId = e.currentTarget.getAttribute('data-view-record-id');
		fetch(`https://localhost:44376/api/employers/${employerId}`).then((response) => response.text()).then((data) => {

			const pricingViewElement = document.getElementById('view_pricing_modal');
			pricingViewElement.innerHTML = data;
			//XenteApp.unblock($('#transactions-datatable'));

			var myCanvas = new bootstrap.Offcanvas(pricingViewElement)
			myCanvas.show();

			// reload table on pricing details modal close
			pricingViewElement.addEventListener('hidden.bs.offcanvas', () => {
				datatable.ajax.reload();
			});					
		});
	});

});



