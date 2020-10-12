export const loadMapApi = () => {
  const mapsURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}&map_ids=${process.env.NEXT_PUBLIC_MAPS_ID}`;
  const scripts = document.getElementsByTagName('script');

  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src.indexOf(mapsURL) === 0) {
      return scripts[i];
    }
  }

  const googleMapsScripts = document.createElement('script');
  googleMapsScripts.src = mapsURL;
  googleMapsScripts.async = true;
  googleMapsScripts.defer = true;
  window.document.body.appendChild(googleMapsScripts);

  return googleMapsScripts;
};
