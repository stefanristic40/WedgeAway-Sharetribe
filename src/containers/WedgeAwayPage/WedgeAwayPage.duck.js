import { fetchPageAssets } from '../../ducks/hostedAssets.duck';
export const ASSET_NAME = 'wedgeaway-page';

export const loadData = (params, search) => dispatch => {
  const pageAsset = { landingPage: `content/pages/${ASSET_NAME}.json` };
  return dispatch(fetchPageAssets(pageAsset, true));
};
