import { fetchPageAssets } from '../../ducks/hostedAssets.duck';
export const ASSET_NAME = 'landing-page-origin';

export const loadData = (params, search) => dispatch => {
  const pageAsset = { landingPageOrigin: `content/pages/${ASSET_NAME}.json` };
  return dispatch(fetchPageAssets(pageAsset, true));
};
