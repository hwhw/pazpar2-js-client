/**
 * Localisation functions and dictionary setup.
 */



/**
 * Return localised term using the passed dictionary
 *	or the one stored in localisations.default.
 * The localisation dictionary has ISO 639-1 language codes as keys.
 * For each of them there can be a dictionary with terms for that language.
 * In case the language dictionary is not present, the default ('en') is used.
 *
 * @param {string} term - the string to localise
 * @param {string} dictionaryName (optional) - name of localisation in the localisations object
 * @returns {string} localised string
 */
pz2_client.prototype.localise = function (term, dictionaryName) {
	var dictionary = localisations.general;
	if (dictionaryName && localisations[dictionaryName]) {
		dictionary = localisations[dictionaryName];
	}

	if (!pageLanguage) {
		pageLanguage = jQuery('html')[0].getAttribute('lang');
		if (!pageLanguage) {
			pageLanguage = 'en';
		}
	}

	var languageCode = pageLanguage;
	if (dictionary[pageLanguage] === null) {
		languageCode = 'en';
	}

	var localised = dictionary[languageCode][term];
	if (localised === undefined) {
		localised = term;
		// console.log('No localisation for: "' + term + '"');
	}

	return localised;
};



/**
 * Overwrite specific strings in the localisation dictionaries.
 * Figures out the correct dictionary based on the key.
 * Made to enable overwriting localisation strings from a CMS without
 * needing to touch the JavaScript code.
 *
 * @param {string} languageCode
 * @param {string} key
 * @param {string} localisedString
 * @returns {undefined}
 */
pz2_client.prototype.overrideLocalisation = function (languageCode, key, localisedString) {
	// First figure out the correct object to override the localisation in.
	var localisationObject = localisations.general;
	for (var localisationType in localisations) {
		if (key.substr(0, localisationType.length) === localisationType) {
			localisationObject = localisations[localisationType];
			key = key.substr(localisationType.length + 1);
			break;
		}
	}

	// Then override the localisation if the language exists.
	if (languageCode === 'default') {
		languageCode = 'en';
	}
	if (localisationObject[languageCode]) {
		localisationObject[languageCode][key] = localisedString;
	}
};



/**
 * Localisation dictionaries.
 * The object is filled with these from the files in localisation.
 *
 * @type {object}
 */
pz2_client.prototype.localisations = {};
