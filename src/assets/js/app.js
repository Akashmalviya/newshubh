function navbarToggle() {
    $(document).ready(function() {
        // header sticky start
        if ($(window).width() > 767) {
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();
                if (scroll >= 300) {
                    $("header.header").addClass('affix');
                } else {
                    $("header.header").removeClass('affix');
                }
            });
        }
        // header sticky END
        // navbar collapse start
        $(document).click(function(event) {
            var clickover = $(event.target);
            var _opened = $(".navbar-collapse").hasClass("show");
            if (_opened === true && !clickover.hasClass("navbar-toggler") && !clickover.hasClass("navbar-collapse")) {
                $(".navbar-toggler").click();
            }
        });
        // navbar collapse END
    });
}

function goToStep(step) {
    $('.sp-step').removeClass('active');
    $('.step-data').hide();
    $('.step-data-' + step).show();
    if (step == 1) {

    }
    if (step == 2) {
        $('.sp-step-1').addClass('active')
    }
    if (step == 3) {
        $('.sp-step-1, .sp-step-2').addClass('active')
    }
    if (step == 4) {
        $('.sp-step-1, .sp-step-2, .sp-step-3').addClass('active')
    }
}

function initializeTooltips() {
    $(document).find('[data-toggle="tooltip"]').tooltip();
}

function toggleSidebar() {
    $(document).on('click', '.sidebarToggler', function() {
        $('body').toggleClass('SidebarToggle');
    });
    $(document).on('click', '#content-wrapper', function(event) {
        var clickover = $(event.target);
        if ($(window).width() < 992 && clickover.hasClass("content-wrapper-overlay")) {
            $('body').removeClass('SidebarToggle');
        }
    });
}

function dashboardGraph() {
    if ($(document).find('#myChart').length) {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1 Nov 2019', '2 Nov 2019', '3 Nov 2019', '4 Nov 2019', '5 Nov 2019', '6 Nov 2019'],
                datasets: [{
                    label: '# of Votes',
                    data: [4, 6, 3, 5, 2, 3],
                    backgroundColor: 'rgba(42, 65, 232, .1)',
                    borderColor: '#2A41E8',

                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}

function OrderToggle() {
    $(document).on('click', '[data-toggle-orderDiv]', function() {
        var _item = $(this).attr('data-toggle-orderDiv');
        $('.dropdown-toggle-orderDiv').text(_item + ' Orders');
        $('.open-next-collapseble-row.open').click();
        $("[class*='orderDiv-']").hide();
        $('.orderDiv-' + _item).show();
    });
}

function toggleRowData() {
    $(document).on('click', '.open-next-collapseble-row', function() {
        console.log('t')
        $(this).toggleClass('open');
        var id = $(this).attr('data-id');
        var _parentTable = $(this).parents('table');
        _parentTable.find('tr[data-row-id="' + id + '"]').toggleClass('hideRow')
    });
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $(document).find('#blah').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function initFormInput() {
    $(document).on('focus', '.form-group.animate-lable .form-control', function() {
        $(this).parents('.form-group').addClass('focused');
    });
    $(document).on('blur', '.form-group.animate-lable .form-control', function() {
        var inputValue = $(this).val();
        if (inputValue == "") {
            $(this).parents('.form-group').removeClass('focused');
        } else {
            $(this).parents('.form-group').addClass('focused');
        }
    })
}

function showAlertModal(text) {
    $('#alert_modal').modal('show')
    $('#alert_modal .alert-text').text(text);
}

function ImagePreview() {
    $(document).on('change', '#userImg', function() {
        readURL(this);
    });
}

function DashbaordTableSwitch() {
    $(document).on('click', '#showCurrentOrder', function() {
        $('#showCompetedOrder').removeClass('active');
        $(this).addClass('active');
        $('#CompetedOrders').hide();
        $('#CurrentOrder').fadeIn();
    });
    $(document).on('click', '#showCompetedOrder', function() {
        $('#showCurrentOrder').removeClass('active');
        $(this).addClass('active');
        $('#CurrentOrder').hide();
        $('#CompetedOrders').fadeIn();
    });
}

function initHome() {
    navbarToggle();
    goToStep();
    initializeTooltips();
}

function initUser() {
    //toggleSidebar();
    console.log('l')
    dashboardGraph();
    OrderToggle();
    toggleRowData();
    ImagePreview();
    initFormInput();
    DashbaordTableSwitch();
}
$(document).ready(function() {

})