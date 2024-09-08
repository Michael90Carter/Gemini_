"use strict";
// Class definition

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
        console.log ('Modal hidden')
    })

})