        /* ==========================================================
         * jQuery-maxlength.js v1.0.0
         *
         * Copyright (c) 2020 Gururaj Nadager;
         *
         * Licensed under the terms of the MIT license.
         * See: https://github.com/GururajNadager/jQuery-maxlength/blob/master/LICENSE
         * ========================================================== */
        (function ($) {
            'use strict';

            var attrs = {
                maxLengthTemplate: "data-maxlength-template"
            }
            $.fn.maxlength = function (options) {
                var settings = $.extend({}, $.fn.maxlength.defaults, options);
                this.each(function () {
                    var ele = $(this);
                    insertTemplate(ele, settings)
                    ele.on("keyup", settings, keypress);

                });

                return this;
            };

            function insertTemplate(ele, settings) {
                $(settings.template).attr(attrs.maxLengthTemplate, "true")
                    .css("color", settings.color)
                    .css("font-size", settings.fontSize)
                    .css("text-align", settings.position)
                    .insertAfter(ele);
            }

            function show(event, length, maxLength) {
                if (event.data.show) {
                    if (length != 0)
                        $(event.target).next("[" + attrs.maxLengthTemplate + "='true']").text(format(event.data.text, length, maxLength));
                    else
                        $(event.target).next("[" + attrs.maxLengthTemplate + "='true']").text("");
                }

            }

            function format(text, length, maxLength) {
                return text.replace("{total}", length).replace("{maxLength}", maxLength);
            }


            function keypress(event) {
                var key = event.which;
                var maxLength = $(this).attr("maxlength");

                if (typeof maxLength != "undefined") {
                    var length = this.value.length;
                    if (key >= 33 || key == 13 || key == 32) {
                        if (length >= maxLength)
                            event.preventDefault();
                    }
                    show(event, length, maxLength);
                }

            }

            $.fn.maxlength.defaults = {
                text: "{total}/{maxLength}",
                position: "left",
                color: "green",
                fontSize: "12px",
                template: "<div/>",
                show: true
            };


        })(jQuery);
