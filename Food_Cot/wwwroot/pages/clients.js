"use strict";

const ClientsDatatable = (function () {
    // Private functions
    const initializeDatatable = () => {
        $.fn.editableform.buttons =
            '<button type="submit" class="btn btn-outline-primary editable-submit btn-sm"><i class="mdi mdi-check"></i></button>' +
            '<button type="button" class="btn btn-outline-danger editable-cancel btn-sm"><i class="mdi mdi-close"></i></button>';
        $.fn.editable.defaults.mode = 'inline';
        $.fn.editable.defaults.ajaxOptions = { type: "PUT" };

        $('#clients-datatable').DataTable({
            responsive: true,
            lengthChange: false,
            processing: true,
            searching: false,
            language: {
                processing: '<div class="spinner-border text-dark" role="status"></div>',
                emptyTable: "No clients available at the moment"
            },
            serverSide: true,
            ajax: {
                url: `https://localhost:44376/api/Client`,
                method: 'GET',
                dataSrc: ''
            },
            order: [[0, 'asc']],
            columns: [
                { data: "id" },
                { data: "firstName" },
                { data: "lastName" },
                { data: "niN_No" },
                { data: "telephoneNo" },
                { data: "countryPlacement" },
                { data: 'Actions', responsivePriority: -1 },
            ],
            columnDefs: [
                {
                    targets: -1,
                    title: 'Action',
                    autoHide: false,
                    render: function (data, type, full, meta) {
                        return `<div class="dropdown d-inline-block">
                                    <a href="#" data-view-record-id="${full.id}" class="text-info me-2" title="View Client Details">
                                        <i class="las la-eye text-secondary font-16"></i>
                                    </a>
                                </div>`;
                    }
                }
            ]
        });
    };

    const bindViewRecordEvent = () => {
        $('#clients-datatable').on('click', '[data-view-record-id]', function (e) {
            e.preventDefault();
            let id = $(this).data('view-record-id');
            fetch(`https://localhost:44376/api/Client/${id}`)
                .then(response => response.text())
                .then(data => {
                    $('#clients-details-container').html(data);
                    $('#view_clients_modal').modal('show');
                })
                .catch(error => console.error('Error fetching client details:', error))
                .finally(() => {
                    $('#view_clients_modal').on('hidden.bs.modal', () => {
                        $('#clients-datatable').DataTable().ajax.reload();
                    });
                });
        });
    };

    // Public functions
    return {
        init: () => {
            if ($('#clients-datatable').length) {
                initializeDatatable();
                bindViewRecordEvent();
            }
        }
    };
})();

$(document).ready(function () {
    ClientsDatatable.init();
});
