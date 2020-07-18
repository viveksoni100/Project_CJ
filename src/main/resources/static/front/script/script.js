//graphs for super admin starts from here...
$(document).ready(function () {
    window.chartColors = {
        blue: 'rgb(103, 153, 204)',
        darkblue: 'rgb(36, 47, 67)',
        gray: 'rgb(204, 204, 204)',
        color1: 'rgba(217, 202, 227, 0.8)',
        color11: 'rgba(217, 202, 227, 0)',
        color2: 'rgba(203, 211, 211, 0.8)',
        color3: '#ef8157',
        color22: 'rgba(203, 211, 211, 0)',
        transparent: 'rgba(0,0,0,0)'
    };

    if ($("#canvas1SA").length > 0) {
        // Dashboard chart 1
        /*var line1 = $("#monthWiseAmt").val().split(",");*/
        var line2 = $("#monthwiseIncome").val().split(",");
        var MONTHS12 = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        /*var MONTHS = $("#monthsList").val().split(",");*/
        var productsDataTitle = $("#productDataTitles").val().split(",");
        var productsAPITitle = $("#productAPITitles").val().split(",");
        var line3 = $("#productDataAmt").val().split(",");
        var line4 = $("#productAPIAmt").val().split(",");
        /*var config = {
            type: 'bar',
            data: {
                labels: MONTHS,
                datasets: [{
                    label: "Earnings (in $)",
                    backgroundColor: window.chartColors.color3,
                    borderColor: window.chartColors.color11,
                    data: line1,
                }, /!*{
                        label: "Check In",
                        backgroundColor: window.chartColors.color2,
                        borderColor: window.chartColors.color22,
                        data: line2,
                    }*!/]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: true,
                    text: 'Monthly Earning (' + $('#prev').val() + ' - ' + $('#now').val() + ')',
                    position: 'top'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    caretSize: 10,
                    backgroundColor: 'rgba(230,230,230,1)',
                    xPadding: 15,
                    yPadding: 10,
                    titleFontColor: '#000',
                    titleFontSize: 13,
                    bodyFontColor: '#000',
                    bodyFontSize: 14,
                    bodySpacing: 4,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true,   // minimum value will be 0.
                            userCallback: function (label, index, labels) {
                                if (Math.floor(label) === label) {
                                    return label;
                                }
                            }
                        },
                        scaleLabel: {
                            display: true,
                        },
                    }]
                }
            }
        };*/
        var config1 = {
            type: 'bar',
            data: {
                labels: MONTHS12,
                datasets: [{
                    label: 'Earnings (in $)',
                    backgroundColor: window.chartColors.color3,
                    borderColor: window.chartColors.color11,
                    data: line2,
                },  /*{
                        label: "Check In",
                        backgroundColor: window.chartColors.color2,
                        borderColor: window.chartColors.color22,
                        data: line2,
                    }*/]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: true,
                    text: 'Earnings per month',
                    position: 'top'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    caretSize: 10,
                    backgroundColor: 'rgba(230,230,230,1)',
                    xPadding: 15,
                    yPadding: 10,
                    titleFontColor: '#000',
                    titleFontSize: 13,
                    bodyFontColor: '#000',
                    bodyFontSize: 14,
                    bodySpacing: 4,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,

                        },
                    }]
                }
            }
        };
        var config2 = {
            type: 'bar',
            data: {
                labels: productsDataTitle,
                datasets: [{
                    label: 'Earnings (in $)',
                    backgroundColor: window.chartColors.color3,
                    borderColor: window.chartColors.color11,
                    data: line3,
                },  /*{
                        label: "Check In",
                        backgroundColor: window.chartColors.color2,
                        borderColor: window.chartColors.color22,
                        data: line2,
                    }*/]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: true,
                    text: 'Top 5 Highest earning Data products',
                    position: 'top'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    caretSize: 10,
                    backgroundColor: 'rgba(230,230,230,1)',
                    xPadding: 15,
                    yPadding: 10,
                    titleFontColor: '#000',
                    titleFontSize: 13,
                    bodyFontColor: '#000',
                    bodyFontSize: 14,
                    bodySpacing: 4,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,

                        },
                    }]
                }
            }
        };

        var config3 = {
            type: 'bar',
            data: {
                labels: productsAPITitle,
                datasets: [{
                    label: 'Earnings (in $)',
                    backgroundColor: window.chartColors.color3,
                    borderColor: window.chartColors.color11,
                    data: line4,
                },  /*{
                        label: "Check In",
                        backgroundColor: window.chartColors.color2,
                        borderColor: window.chartColors.color22,
                        data: line2,
                    }*/]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: true,
                    text: 'Top 5 Highest earning API products',
                    position: 'top'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    caretSize: 10,
                    backgroundColor: 'rgba(230,230,230,1)',
                    xPadding: 15,
                    yPadding: 10,
                    titleFontColor: '#000',
                    titleFontSize: 13,
                    bodyFontColor: '#000',
                    bodyFontSize: 14,
                    bodySpacing: 4,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,

                        },
                    }]
                }
            }
        };

        /*var ctx = document.getElementById("canvasSA").getContext("2d");
        var myLine = new Chart(ctx, config);*/

        var ctx1 = document.getElementById("canvas1SA").getContext("2d");
        var myLine1 = new Chart(ctx1, config1);

        var ctx2 = document.getElementById("canvas2SA").getContext("2d");
        var myLine2 = new Chart(ctx2, config2);

        var ctx3 = document.getElementById("canvas3SA").getContext("2d");
        var myLine3 = new Chart(ctx3, config3);

        function beforePrintHandler() {
            for (var id in Chart.instances) {
                Chart.instances[id].resize()
            }
        }

    }
});