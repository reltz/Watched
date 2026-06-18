export const environment = {
  production: false,

  // OMDB API used for searching and fetching movie/series details.
  omdb: {
    url: 'https://www.omdbapi.com',
    apiKey: '4ed90b3e',
    // How many result pages to pull per search (OMDB returns 10 items per page).
    searchPages: 4,
  },

  // Streaming availability lookups are proxied through our own Firebase
  // function (which holds the RapidAPI key as a server-side secret), so no
  // API key ever lives in this client bundle.
  streaming: {
    apiUrl: 'https://us-central1-tasklistdb.cloudfunctions.net/app/streaming',
    // ISO country code to look up availability in (e.g. 'us', 'br', 'gb').
    country: 'ca',
  },

  // Firebase Cloud Function REST API that stores user collections.
  collectionsApiUrl: 'https://us-central1-tasklistdb.cloudfunctions.net/app/collection',

  // Firebase project used for Google authentication.
  firebaseConfig: {
    apiKey: 'AIzaSyA2LwfQnRW4HeLfSrmn0w-J_4G3vIn-A80',
    authDomain: 'tasklistdb.firebaseapp.com',
    databaseURL: 'https://tasklistdb.firebaseio.com',
    projectId: 'tasklistdb',
    storageBucket: 'tasklistdb.appspot.com',
    messagingSenderId: '553700462852',
    appId: '1:553700462852:web:adbd8f5e317eace2e64051',
  },
};
