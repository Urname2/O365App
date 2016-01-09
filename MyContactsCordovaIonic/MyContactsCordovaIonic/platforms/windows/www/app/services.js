(function () {
    "use strict";

    angular.module("myapp.services", []).factory("myappService", ["$rootScope", "$http", function ($rootScope, $http) {
        var myappService = {};

        //initialize authContact and getTokenForResource
        var authContext = null;
        var getTokenForResource = function (resource, callback) {
            if (!authContext)
                authContext = new O365Auth.Context();

            authContext.getAccessToken(resource).then(function (token) {
                callback(token);
            }, function (err) {
                $rootScope.$broadcast("error", "getting token");
            });
        };

        //get contacts
        myappService.getContacts = function (callback) {
            getTokenForResource("https://outlook.office365.com", function (token) {
                $http.defaults.headers.common["Authorization"] = "Bearer " + token;
                $http.defaults.headers.post["accept"] = "application/json;odata=none";
                $http.get("https://outlook.office.com/api/v2.0/me/contacts")
                .success(function (data) {
                    console.log(data)
                    callback(data["value"]);
                })
                .error(function (err) {
                    $rootScope.$broadcast("error", "getting contacts");
                });
            });
        };

        //add contact
        myappService.addContact = function (contact, callback) {
            getTokenForResource("https://outlook.office365.com", function (token) {
                $http.defaults.headers.common["Authorization"] = "Bearer " + token;
                $http.defaults.headers.post["accept"] = "application/json;odata=verbose";
                $http.post("https://outlook.office365.com/api/v1.0/me/contacts", JSON.stringify(contact))
                .success(function (data) {
                    callback(data);
                })
                .error(function (err) {
                    $rootScope.$broadcast("error", "add contact");
                });
            });
        };

        //update contact
        myappService.updateContact = function (contact, callback) {
            getTokenForResource("https://outlook.office365.com", function (token) {
                $http.defaults.headers.common["Authorization"] = "Bearer " + token;
                $http.defaults.headers.post["accept"] = "application/json;odata=verbose";
                $http.patch("https://outlook.office365.com/api/v1.0/me/contacts/" + contact.Id, JSON.stringify(contact))
                .success(function (data) {
                    callback(data);
                })
                .error(function (err) {
                    $rootScope.$broadcast("error", "update contact" + err.message);
                });
            });
        };

        //delete contact
        myappService.deleteContact = function (id, callback) {
            getTokenForResource("https://outlook.office365.com", function (token) {
                $http.defaults.headers.common["Authorization"] = "Bearer " + token;
                $http.defaults.headers.post["accept"] = "application/json;odata=verbose";
                $http.delete("https://outlook.office365.com/api/v1.0/me/contacts/" + id)
                .success(function (data) {
                    callback(data);
                })
                .error(function (err) {
                    $rootScope.$broadcast("error", "delete contact" + err.message);
                });
            });
        };

        //starts and stops the application waiting indicator
        myappService.wait = function (wait) {
            $rootScope.$broadcast("wait", wait);
        };

        //gets item by Id
        myappService.indexOf = function (array, id) {
            for (var i = 0; i < array.length; i++)
                if (array[i].Id == id)
                    return i;
            return -1;
        };


        myappService.getCalendars = function (callback) {
            getTokenForResource("https://outlook.office365.com"), function (token) {
                $http.defaults.headers.common["Authorization"] = "Bearer " + token;
                $http.defaults.headers.post["accept"] = "application/json;odata=none";
                $http.get("https://outlook.office.com/api/v2.0/me/calendarview?startdatetime=2016-01-05T23:00:00.000Z&enddatetime=3015-10-11T01:00:00Z&$top=10")
                .success(function (data) {
                    console.log(data);
                })
                .error(function (err) {
                    $rootScope.$broadcast("error", "getting calendars");
                });

            }
        }

        return myappService;
    }]);
})();