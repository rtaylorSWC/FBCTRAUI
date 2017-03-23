angular.module('TranslationModule', ['ApiModule'])
.factory('TranslationService', ['apiService',
    function (apiService) {
        'use strict';

        var apiUri = '/translation';
        return {
            getTranslationData: function (lang, callback) {
                var params = {
                    language: lang
                };
                //return apiService.get(apiUri, params)
	            //                 .then(function successCallback(response) {
	            //                     callback(response.data);
	            //                 }, function errorCallback(response) {
	            //                     callback(false);
                //                 });

                return apiService.get(apiUri, params)
                                 .then(function successCallback(response) {
                                     callback(response.data);
                                 }, function errorCallback(response) {
                                     callback(params.language == 'en' ?
                                                {
                                                    "BUTTON_LANG_EN": "English",
                                                    "BUTTON_LANG_ES": "Spanish",
                                                    "BUTTON_LOGIN": "Login",
                                                    "BUTTON_LOGOUT": "Logout",

                                                    "CONTENT_CUS_SUPPORT_CENTER": "The Fort Bend County Toll Road Authority electronic toll collection system operates toll lanes exclusively for authorized TxTAG (Texas Tollways), EZ Tag (Harris County Toll Road Authority), or TollTag (North Texas Tollway Authority) account holders. Non account holders that use the dedicated toll lanes incur violations and have images of their license plates recorded by a video system.",
                                                    "CONTENT_DONT_OWN_VEHICLE": "I No Longer Own This Vehicle. What Do I Do?",
                                                    "CONTENT_DONT_PAY": "What Happens If I don't pay",
                                                    "CONTENT_FAQS": "FAQs",
                                                    "CONTENT_PAY": "How Can I Pay?",
                                                    "CONTENT_PAY_IN_PERSON": "Pay in Person",
                                                    "CONTENT_RECIEVE_NOTICE": "Why Did I Receive a Notice/Violation?",
                                                    "CONTENT_ROADMAPS": "Fort Bend Toll Roads Map",
                                                    "CONTENT_TOLL_PLAZA": "Toll Plaza Info",
                                                    "CONTENT_TOLL_RATES": "Toll Rates",
                                                    "CONTENT_TOLLTAG_NOTICE": "I Have a Toll Tag. Why Did I Get a Notice?",
                                                    "CONTENT_VIOLATION": "Pursuant to the Texas Transportation Code, Chapter 284, the registered owner or renter of record of a vehicle (not necessarily the driver of the vehicle) that passes through a toll facility is responsible for payment of tolls associated with said toll facility. Failure to pay toll charges is against the law and results in a Toll Violation.",
                                                    "CONTENT_VIOLATOR": "Don't Become A Violator",

                                                    "LABEL_INFO_CUS_SUPPORT_CENTER": "Customer Support Center",
                                                    "LABEL_INFO_DONT_OWN_VEHICLE": "I No Longer Own This Vehicle. What Do I Do?",
                                                    "LABEL_INFO_DONT_PAY": "What Happens If I don't pay",
                                                    "LABEL_INFO_FAQS": "FAQs",
                                                    "LABEL_INFO_PAY": "How Can I Pay?",
                                                    "LABEL_INFO_PAY_IN_PERSON": "Pay in Person",
                                                    "LABEL_INFO_RECIEVE_NOTICE": "Why Did I Receive a Notice/Violation?",
                                                    "LABEL_INFO_ROADMAPS": "Fort Bend Toll Roads Map",
                                                    "LABEL_INFO_TOLL_PLAZA": "Toll Plaza Info",
                                                    "LABEL_INFO_TOLL_RATES": "Toll Rates",
                                                    "LABEL_INFO_TOLLTAG_NOTICE": "I Have a Toll Tag. Why Did I Get a Notice?",
                                                    "LABEL_INFO_VIOLATION": "What is A Toll Violation?",
                                                    "LABEL_INFO_VIOLATOR": "Don't Become A Violator",
                                                    "LABEL_COPYRIGHT": "© 2017 Fort Bend County",
                                                    "LINK_HELP": "Need help?",
                                                    "TAB_NOTICES": "Notices",
                                                    "TEXTBOX_INVOICE": "Invoice #",
                                                    "TEXTBOX_LICENSEPLATE": "License Plate"
                                                }
                                                :
                                                {
                                                    "BUTTON_LANG_EN": "Inglés",
                                                    "BUTTON_LANG_ES": "Español",
                                                    "BUTTON_LOGIN": "Iniciar sesión",
                                                    "BUTTON_LOGOUT": "Cerrar sesión",

                                                    "LABEL_INFO_CUS_SUPPORT_CENTER": "Centro de atención al cliente",
                                                    "LABEL_INFO_DONT_OWN_VEHICLE": "Ya no tengo este vehículo. ¿Qué debo hacer?",
                                                    "LABEL_INFO_DONT_PAY": "Qué sucede si no pago",
                                                    "LABEL_INFO_FAQS": "Preguntas Frecuentes",
                                                    "LABEL_INFO_PAY": "¿Como puedo pagar?",
                                                    "LABEL_INFO_PAY_IN_PERSON": "Pago en persona",
                                                    "LABEL_INFO_RECIEVE_NOTICE": "¿Por qué recibí un Aviso / Violación?",
                                                    "LABEL_INFO_ROADMAPS": "Mapa de carreteras de peaje de Fort Bend",
                                                    "LABEL_INFO_TOLL_PLAZA": "Información de estaciones de peaje",
                                                    "LABEL_INFO_TOLL_RATES": "Tarifas de peaje",
                                                    "LABEL_INFO_TOLLTAG_NOTICE": "Tengo una etiqueta de peaje. ¿Por qué recibí un aviso?",
                                                    "LABEL_INFO_VIOLATION": "¿Qué es una violación de peaje?",
                                                    "LABEL_INFO_VIOLATOR": "¿Qué es una violación de peaje?",
                                                    "LABEL_COPYRIGHT": "© 2017 Condado de Fort Bend",
                                                    "LINK_HELP": "¿Necesitas ayuda?",
                                                    "TAB_NOTICES": "Avisos",
                                                    "TEXTBOX_INVOICE": "Factura #",
                                                    "TEXTBOX_LICENSEPLATE": "Placa"
                                                });
                                 });
            }
        }
    }
]);