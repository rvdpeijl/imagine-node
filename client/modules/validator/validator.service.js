(function() {
    'use strict';

    angular
        .module('app')
        .factory('Validator', Validator);

    /* @ngInject */
    function Validator() {
        var service = {
            validate: validate,
            error: error
        };
        return service;

        ////////////////

        function validate(model, rules) {

        	var validated = {
        		valid: true,
        		errors: []
        	};

        	var validations = {
        		required: required
        	}

        	function required(input, required) {
	        	if (required) {
	        		return input !== '' && input !== undefined;
	        	}
	        	return true;
	        }

        	angular.forEach(model, function(modelValue, modelKey) {
        		angular.forEach(rules[modelKey], function(ruleValue, ruleName) {
        			if(!validations[ruleName](modelValue, ruleValue)) {
        				validated.valid = false;
        				validated.errors.push(ruleValue.message);
        			}
        		});
        	});

        	return validated;
        }

        function error (model) {
        	console.log('Error!');
        }
    }
})();